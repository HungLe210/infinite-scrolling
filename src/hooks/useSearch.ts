// hooks/useSearchProducts.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../components/ProductCard/types';

export const useSearchProducts = (query: string, pageNumber: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        if (query.trim() === '') return; // Don't search if query is empty
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const limit = 20;
                const response = await axios.get("https://dummyjson.com/products/search", {
                    params: {
                        q: query,
                        limit: limit,
                        skip: (pageNumber - 1) * limit,
                    }
                });

                const newProducts: Product[] = response.data.products.map((product: any) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    images: product.images
                }));

                setProducts(prev => [...prev, ...newProducts]);
                setHasMore(newProducts.length >= limit);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query, pageNumber]);

    return { products, loading, error, hasMore };
};
