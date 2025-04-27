import React from 'react'
import kirana from "../assets/kiranaStore.jpg"
import { useNavigate } from 'react-router-dom';
const Card = (props) => {
    let {id, name, description, rating, image } = props;

    const navigate = useNavigate();
    // console.log("Props",props);
    const handleClick = () => {
        navigate(`/products/${id}`);
    }
    return (
        <div className='my-3'>
            <div className="card h-100 shadow">
                <img src={image != null ? image : kirana} className="card-img-top" alt={name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                    <h5 className="text-start fw-bold">{name}</h5>
                    <p className="text-start">{description}...</p>
                    <p className="text-start fw-bold"><strong>Rating: </strong>{rating}⭐</p>
                    <button className="btn btn-primary" onClick={handleClick}>Visit Shop</button>
                </div>
            </div>
        </div>
    )
}

export default Card

