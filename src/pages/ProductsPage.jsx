import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../component/ProductCard';
import Navbar from '../component/Navbar';

const ProductsPage = (props) => {
    const { shopId } = useParams();

    const [products, setProducts] = useState([]);
    const [shopName, setShopName] = useState("");

    // console.log("Shop ID:", shopId);
    // console.log(products);
    useEffect(() => {
        fetch(`http://localhost:8080/api/products/shops/${shopId}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log("Fetched products:", data); 
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })

        fetch(`http://localhost:8080/api/shops/${shopId}`)
            .then((response) => response.json())
            .then((data) => setShopName(data.name))
            .catch((error) => {
                console.error("Error fetching shop name:", error);
            })
    }, [shopId])

    return (
        <>
            <Navbar />
            <div className="container">
                <p className='fw-bold fs-2 text-center'>{shopName || "Shop"}</p>
                <div className='row text-end'>
                    {products.map((product) =>
                        <div key={product.id}>
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                imageUrl={product.imageUrl} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductsPage
