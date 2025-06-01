import React, { useState } from 'react';
import ShopBg from '../assets/shop-BG.jpg';

const AddShopPage = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Save file directly
        }
    };


    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("image", image); // Note: image here must be a File object

    try {
        const response = await fetch('http://localhost:8080/api/addShop', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('✅ Shop added successfully!');
            setName('');
            setRating('');
            setDescription('');
            setImage('');
        } else {
            alert('❌ Failed to add shop.');
        }
    } catch (error) {
        console.error('Error adding shop:', error);
        alert('❌ Something went wrong.');
    }
};


    return (
        <div className="add-shop-wrapper d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${ShopBg})` }}>
            <div className="card p-4 shadow-lg rounded-4" style={{ maxWidth: '500px', width: '100%', opacity: 0.95 }}>
                <h3 className="mb-4 text-center text-success fw-bold">Add New Shop</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Shop Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input type="number" step="0.1" className="form-control" value={rating} onChange={(e) => setRating(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} required />
                    </div>

                    <button type="submit" className="btn btn-success w-100 fw-semibold">Add Shop</button>
                </form>
            </div>

            <style>{`
                .add-shop-wrapper {
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

                .btn-success {
                    transition: background-color 0.3s ease;
                }

                .btn-success:hover {
                    background-color: #218838;
                }
            `}</style>
        </div>
    );
};

export default AddShopPage;
