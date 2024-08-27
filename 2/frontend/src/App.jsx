import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './styles/styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/categories/:categoryName/products/:productId" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
