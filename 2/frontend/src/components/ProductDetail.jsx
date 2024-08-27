import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { categoryName, productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:5173/categories/${categoryName}/products/${productId}`);
            setProduct(response.data);
        };

        fetchProduct();
    }, [categoryName, productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h1>{product.productName}</h1>
            <p>Company: {product.company}</p>
            <p>Category: {categoryName}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
            {/* Include a random image */}
        </div>
    );
}

export default ProductDetail;
