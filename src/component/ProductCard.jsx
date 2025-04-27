import React, { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Toast from './Toast';

const ProductCard = ({ id, name, description, price, imageUrl }) => {

    const { addToCart } = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);

    const handleAddToCart = () => {
        addToCart({ id, name, description, price, imageUrl });
        setShowToast(true);
    }

    return (
        <div className="card mb-4 shadow" style={{ maxWidth: "700px", margin: "auto" }}>
            <div className="row g-0">
                {/* Product Image */}
                <div className="col-md-4">
                    <img
                        src={imageUrl}
                        className="img-fluid rounded-start"
                        alt={name}
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                </div>

                {/* Product Info */}
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text text-muted">
                            {description || "No description available."}
                        </p>
                        <h6 className="card-subtitle mb-2 text-success">₹{price}</h6>
                        <button className="btn btn-primary mt-2" onClick={handleAddToCart}>Add to Cart</button>
                        <Toast message="Product added to cart!"
                            show={showToast}
                            setShow={setShowToast}
                            background="success"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
