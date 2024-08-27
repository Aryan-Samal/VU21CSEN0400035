import express from 'express';
import cors from 'cors';
import fetchProducts from 'utils/fetchProducts.js'; // Use .js extension for local imports

const app = express();
const port = 5173;

app.use(cors());

app.get('/categories/:categoryName/products', async (req, res) => {
    const { categoryName } = req.params;
    const { n = 10, page = 1, minPrice = 0, maxPrice = Infinity, sort = 'price', order = 'asc' } = req.query;

    try {
        const products = await fetchProducts(categoryName, minPrice, maxPrice, sort, order);
        const paginatedProducts = products.slice((page - 1) * n, page * n);
        res.json({ products: paginatedProducts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
