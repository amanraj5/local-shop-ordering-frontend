// src/component/CartPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-bold">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty cart"
              style={{ width: '200px' }}
            />
            <p className="mt-3 fs-4 text-muted">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="row justify-content-center">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card mb-4 shadow-sm p-3"
                  style={{ maxWidth: '800px' }}
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center">
                      <img
                        src={item.imageUrl}
                        className="img-fluid rounded"
                        alt={item.name}
                        style={{ height: '120px', objectFit: 'cover' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text text-muted mb-1">{item.description}</p>
                        <p className="card-text text-muted mb-1">
                          Price: ₹{item.price}
                        </p>
                        <p className="card-text">
                          Subtotal: ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-3 d-flex flex-column align-items-center">
                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                        >
                          −
                        </button>
                        <span className="mx-2 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm mt-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3 mb-3">
              <h4 className="fw-bold mb-3">Total: ₹{totalAmount.toFixed(2)}</h4>
              <button className="btn btn-lg btn-danger px-5" onClick={clearCart}>
                Clear Cart
              </button>
              <Link className="btn btn-success ms-2" to="/checkout">Checkout</Link>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
