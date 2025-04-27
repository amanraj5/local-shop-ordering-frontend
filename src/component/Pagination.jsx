// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                </li>
                {pageNumbers.map(num => (
                    <li key={num} className={`page-item ${num === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(num)}>{num}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
