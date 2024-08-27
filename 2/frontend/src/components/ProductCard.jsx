import React from 'react';

function ProductCard({ product, onClick }) {
    return (
        <div className="product-card" onClick={onClick}>
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
        </div>
    );
}

export default ProductCard;
