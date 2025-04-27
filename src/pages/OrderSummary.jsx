import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Order Summary</h3>
      {orderDetails ? (
        <div className="card p-4 shadow-sm">
          <p><strong>Order ID:</strong> {orderDetails._id}</p>
          <p><strong>Email:</strong> {orderDetails.userId}</p>
          <p><strong>Total Amount:</strong> ₹{orderDetails.totalAmount}</p>
          <h5 className="mt-4">Items:</h5>
          <ul>
            {orderDetails.items.map((item, idx) => (
              <li key={idx}>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderSummary;
