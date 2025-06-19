import React, { useState, useEffect } from 'react';
import Card from './Card';
import Navbar from './Navbar';
import Pagination from './Pagination';

const Restaurants = (props) => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setLoading(true); // Start loading
        fetch("http://localhost:8080/api/shops")
            .then((response) => response.json())
            .then((data) => {
                setShops(data);
                setLoading(false); // Stop loading
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Stop loading on error
            });
    }, []);

    const paginatedItems = shops.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="container">
                <p className='fw-bold fs-2 text-start'>Best shops near you</p>

                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='row'>
                            {paginatedItems.map((item) =>
                                <div className='col-md-4' key={item.id}>
                                    <Card
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        description={item.description.slice(0, 60)}
                                        rating={item.rating}
                                    />
                                </div>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(shops.length / itemsPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default Restaurants;
