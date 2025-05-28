import React from 'react';
import AdminBackground from '../assets/admin-background.jpg';
import { Link } from 'react-router-dom';
const AdminPage = () => {
    const tasks = [
        { label: "Add Product", link: "#" },
        { label: "Delete Product", link: "#" },
        { label: "Add Shop", link: "/addshop" },
        { label: "Delete Shop", link: "/deleteshop" },
    ];

    return (
        <div className="admin-page-wrapper d-flex flex-column justify-content-center align-items-center text-white" style={{ backgroundImage: `url(${AdminBackground})` }}>
            <div className="overlay"></div>

            <h2 className="mb-5 text-center fw-bold z-2">Admin Dashboard</h2>
            <div className="row g-4 justify-content-center z-2">
                {tasks.map((task, index) => (
                    <div className="col-6 col-md-3" key={index}>
                        <div className="card bg-warning bg-opacity-75 text-white shadow-lg border-0 h-100 task-card">
                            <div className="card-body d-flex justify-content-center align-items-center text-center">
                                <Link to={task.link} className="stretched-link text-white text-decoration-none fs-5 fw-semibold">
                                    {task.label}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .admin-page-wrapper {
                    position: relative;
                    min-height: 100vh;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    padding: 2rem;
                    z-index: 1;
                }
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 0;
                }
                .task-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-radius: 1rem;
                }
                .task-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
                }
                .z-2 {
                    z-index: 2;
                }
            `}</style>
        </div>
    );
};

export default AdminPage;
