import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('Laptop');
    const [page, setPage] = useState(1);
    const [n, setN] = useState(10);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`http://localhost:5173/categories/${categoryName}/products`, {
                params: { n, page, minPrice, maxPrice, sort, order }
            });
            setProducts(response.data.products);
        };

        fetchProducts();
    }, [categoryName, page, n, minPrice, maxPrice, sort, order]);

    return (
        <div className="product-list">
            <h1>Top {n} Products in {categoryName}</h1>
            <div className="filters">
                {/* Add filter inputs for category, price range, etc. */}
            </div>
            <div className="products">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => navigate(`/categories/${categoryName}/products/${product.id}`)}
                    />
                ))}
            </div>
            <div className="pagination">
                {/* Pagination controls */}
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default ProductList;
