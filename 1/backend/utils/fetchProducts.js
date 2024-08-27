import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzM2Mzk3LCJpYXQiOjE3MjQ3MzYwOTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjllZjBjNDI3LWZlOGUtNGRmMi1hYzgxLTBlYTQxMjY5YTgxNiIsInN1YiI6ImJzYW1hbEBnaXRhbS5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiOWVmMGM0MjctZmU4ZS00ZGYyLWFjODEtMGVhNDEyNjlhODE2IiwiY2xpZW50U2VjcmV0IjoiWkVndGR6aVJ3TWF2SXJoaSIsIm93bmVyTmFtZSI6IkJob29taWsgQXJ5YW4gU2FtYWwiLCJvd25lckVtYWlsIjoiYnNhbWFsQGdpdGFtLmluIiwicm9sbE5vIjoiVlUyMUNTRU4wNDAwMDM1In0.Ew9xfUNrJXgw-nW7CdGiUl_aSLOl6jVIamNDWKdmzHE";
const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const fetchProducts = async (category, minPrice = 0, maxPrice = Infinity, sort = 'price', order = 'asc') => {
    try {
        let allProducts = [];

        for (let company of companies) {
            const response = await axios.get(
                `http://20.244.56.144/test/companies/${company}/categories/${category}/products`,
                {
                    params: { minPrice, maxPrice },
                    headers: {
                        'Authorization': `Bearer ${BEARER_TOKEN}`
                    }
                }
            );
            const products = response.data.map(product => ({
                id: uuidv4(),
                ...product,
                company
            }));
            allProducts = allProducts.concat(products);
        }

        allProducts.sort((a, b) => {
            const orderFactor = order === 'asc' ? 1 : -1;
            if (sort === 'price') return orderFactor * (a.price - b.price);
            if (sort === 'rating') return orderFactor * (b.rating - a.rating);
            if (sort === 'discount') return orderFactor * (b.discount - a.discount);
            if (sort === 'company') return orderFactor * (a.company.localeCompare(b.company));
        });

        return allProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export default fetchProducts;
