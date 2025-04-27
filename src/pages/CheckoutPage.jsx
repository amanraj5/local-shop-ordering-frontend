import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../component/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import ToastMessage from '../component/Toast';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { userEmail, isLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState({ name: '', address: '', contact: '' });
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const [toastMessage, setToastMessage] = useState("Your order has been placed successfully!")
    const [header,setHeader] = useState("Order Placed ✅");
    const [background, setBackround] = useState("primary");

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    console.log("Email", userEmail);
    const handleInputChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePlaceOrder = async () => {
        if (!user.firstName || !user.street || !user.contact || !user.city || !user.state || !user.pincode) {
            setToastMessage("Please fill in all details");
            setHeader("Notification ❗");
            setBackround("info");
            setShowToast(true);
            return;
        }

        setLoading(true);
        const orderRequest = {
            userId: userEmail,
            items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount
        };

        if (!orderRequest.items.length) {
            setToastMessage("No items in cart to place order.");
            setHeader("Notification ❗");
            setBackround("warning");
            setShowToast(true);
            setLoading(false);
            return;
        }
        // console.log("Order Request:", orderRequest); 
        try {
            const response = await fetch('http://localhost:8080/api/placeorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderRequest)
            });

            if (!response.ok)
                throw new Error("Order failed");

            const data = await response.json();
            clearCart();
            setShowToast(true);
            // navigate('/'); // redirect home or to success page

            setTimeout(() => {
                navigate('/order-summary', { state: { orderDetails: data } });
            }, 1500);
        } catch (error) {
            console.error("Order Error:", error);
            toastMessage("Failed to place order. Please try again.");
            setHeader("Notification ❗");
            setBackround("danger");
            setShowToast(true);
            // alert("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            {!isLoggedIn ? (
                <div className="text-center mt-5">
                    <h4>Please <Link to="/login">Login</Link> to proceed with checkout.</h4>
                </div>
            ) : (
                <div className="container mt-4">
                    <h2 className="text-center">Checkout</h2>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h5 className="mb-3">Shipping Information</h5>
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-12 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="street"
                                        placeholder="Street Address"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-2 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="pincode"
                                        placeholder="PIN"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-12 mb-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="contact"
                                        placeholder="Contact Number"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h5>Your Cart</h5>
                            {cartItems.map(item => (
                                <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="d-flex justify-content-between mt-3 fw-bold">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>

                            <button className="btn btn-success w-100 mt-3" onClick={handlePlaceOrder} disabled={loading}>
                                {loading ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                    <ToastMessage
                        setShow={setShowToast}
                        show={showToast}
                        header={header}
                        message={toastMessage}
                        background={background}
                    />
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
