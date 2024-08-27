import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5173',
});

export const fetchProducts = (categoryName, params) => {
    return API.get(`/categories/${categoryName}/products`, { params });
};

export const fetchProductDetails = (categoryName, productId) => {
    return API.get(`/categories/${categoryName}/products/${productId}`);
};
