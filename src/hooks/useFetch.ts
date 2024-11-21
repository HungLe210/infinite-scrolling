import axios from "axios"
import { useEffect, useState } from "react"
import { Product } from "../components/ProductCard/types"

export default function useFetch() {
    const [products, setProducts] = useState<Product[]>([]) // Product List State
    const [loading, setLoading] = useState<boolean>(false) // Loading State
    const [error, setError] = useState<string | null>(null) // Error State
    const [query, setQuery] = useState<string>('')
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [pageNumber, setPageNumber] = useState<number>(1)
    useEffect(() => {
        fetchProduct();
    }, [query, pageNumber]);

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("https://dummyjson.com/products")
            console.log(response);

            const products: Product[] = response.data.products.map((product: any) => ({
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                images: product.images
            }))
            console.log(products);
            setProducts(products);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { products, loading, error }
}
