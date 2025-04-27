import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Pagination from '../component/Pagination';

const MyOrdersPage = () => {
    const { prodId } = useParams();
    const { userEmail } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`http://localhost:8080/api/getorder/${userEmail}`);
            const data = await res.json();
            setOrders(data);
        };

        const fetchAllProducts = async () => {
            const res = await fetch(`http://localhost:8080/api/products`);
            const data = await res.json();
            setProducts(data);
        }
        if (userEmail) {
            fetchOrders();
            fetchAllProducts();
        }
    }, [userEmail, prodId]);

    const getProductImage = (productId) => {
        if (!products || products.length === 0) return 'https://via.placeholder.com/100x100?text=Loading...';
        const product = products.find(p => p.id === productId);
        return product?.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';
    };
    const flattenedItems = orders.flatMap(order =>
        order.items.map(item => ({
            ...item,
            orderId: order.id,
            totalAmount: order.totalAmount,
            userEmail: order.userEmail,
            timestamp: order.timestamp
        }))
    );

    const paginatedItems = flattenedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // console.log("User Email: ", userEmail)
    // console.log("Orders: ", orders);
    return (
        <>
            <Navbar />
            <div className="container mt-4 d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: '900px' }}>
                    <h2 className="text-center mb-4 fw-bold">Your Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-center">No orders found.</p>
                    ) : (
                        <div className="list-group">
                            {paginatedItems.map((item, index) => (
                                <div key={index} className="list-group-item list-group-item-action mb-3 shadow-sm rounded">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                        <div className="d-flex align-items-center gap-3 w-100">
                                            <img
                                                src={getProductImage(item.productId)}
                                                alt={item.name}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                className="rounded"
                                            />
                                            <div>
                                                <h5 className="mb-1">{item.name}</h5>
                                                <p className="mb-1">Qty: {item.quantity}</p>
                                                <p className="mb-1">Price: ₹{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="text-end w-100">
                                            <p className="mb-1 text-muted small">
                                                Ordered on: {new Date(item.timestamp).toLocaleString()}
                                            </p>
                                            <h6 className="mb-1">Total: ₹{item.totalAmount}</h6>
                                            <span className="badge bg-info">Status: Processing</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(flattenedItems.length / itemsPerPage)}
            onPageChange={setCurrentPage}
        />
        </>
    );
};

export default MyOrdersPage;
