import React, { useState, useEffect } from 'react';
import ShopBg from '../assets/shop-BG.jpg';
import ToastMessage from '../component/Toast';


const DeleteShopPage = () => {
    const [selectedShop, setSelectedShop] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [remarks, setRemarks] = useState('');
    const [shops, setShops] = useState([]);


    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Shop deleted successfully!");
    const [header, setHeader] = useState("Shop Deleted ✅");
    const [background, setBackground] = useState("success");
    useEffect(() => {
        fetch("http://localhost:8080/api/shops")
            .then((response) => response.json())
            .then((data) => {
                setShops(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/shops/${selectedShop}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shopName: selectedShop,
                    adminPassword,
                    remarks,
                }),
            });

            if (response.ok) {
                // alert('✅ Shop deleted successfully');
                // setToastMessage("✅ Shop deleted successfully");
                setShowToast(true);
                setShops((prevShops) => prevShops.filter(shop => shop.id !== selectedShop));
                setSelectedShop('');
                setAdminPassword('');
                setRemarks('');
            } else {
                const errorData = await response.json();
                setToastMessage(`❌ Deletion failed: ${errorData.message || 'Check your credentials or input'}`);
                setHeader("Deletion Failed ❌");
                setBackground("danger");
                setShowToast(true);
                // alert(`❌ Deletion failed: ${errorData.message || 'Check your credentials or input'}`);
            }
        } catch (error) {
            setToastMessage("❌ Something went wrong while deleting the shop.");
            setHeader("Error ❌");
            setBackground("danger");
            setShowToast(true);
            console.error('Error deleting shop:', error);
            // alert('❌ Something went wrong while deleting the shop.');
        }
    };



    return (

        <div className="delete-shop-wrapper d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${ShopBg})` }}>
            <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '500px', width: '100%', opacity: 0.95 }}>
                <h3 className="mb-4 text-center text-danger fw-bold">Delete Shop</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Select Shop</label>
                        <select
                            className="form-select"
                            value={selectedShop}
                            onChange={(e) => setSelectedShop(e.target.value)}
                            required
                        >
                            <option value="">-- Choose a shop --</option>
                            {shops.map((shop, index) => (
                                <option key={index} value={shop.id}>{shop.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Remarks</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-danger w-100 fw-semibold">Delete Shop</button>
                </form>
                <ToastMessage
                    setShow={setShowToast}
                    show={showToast}
                    header={header}
                    message={toastMessage}
                    background={background}
                />
            </div>

            <style>{`
                .delete-shop-wrapper {
                    min-height: 100vh;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    padding: 2rem;
                }

                .card {
                    background-color: #fff;
                    border: none;
                }

                .form-label {
                    font-weight: 500;
                }

                .btn-danger {
                    transition: background-color 0.3s ease;
                }

                .btn-danger:hover {
                    background-color: #c82333;
                }
            `}</style>
        </div>
    );
};

export default DeleteShopPage;
