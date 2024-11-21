import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Product } from './components/ProductCard/types'
import { ProductCard } from './components/ProductCard'
import useFetch from './hooks/useFetch'

function App() {

  const [products, setProducts] = useState<Product[]>([]) // Product List State
  const [loading, setLoading] = useState<boolean>(false) // Loading State
  const [error, setError] = useState<string | null>(null) // Error State
  const [query, setQuery] = useState<string>('')
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (query.trim() === '') return; // Don't search if query is empty
    console.log("Calling API with query", query, "and page", pageNumber);
    searchProduct(query, pageNumber);
  }, [query, pageNumber]);


  const searchProduct = async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const limit = 20;
      const response = await axios.get("https://dummyjson.com/products/search", {
        params: {
          q: query,
          limit: limit,
          skip: (page - 1) * limit,
        }
      });

      const newProducts: Product[] = response.data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        images: product.images
      }))
      console.log(`Call api ${page}: ${products}`);
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(newProducts.length >= limit)
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
    setHasMore(true);
    setProducts([]);
  };


  const lastProductRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    if (observer.current)
      observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setPageNumber(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      }
    );
    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }

    return () => {
      if (observer.current && lastProductRef.current) {
        observer.current.unobserve(lastProductRef.current);
      }
    };
  }, [hasMore, loading]);
  return (
    <div>
      <input type='text' onChange={handleSearch} placeholder="Product's Name"></input>
      <h1>List Product</h1>
      {products.map((product, index) => (
        <div key={index} ref={products.length === index + 1 ? lastProductRef : null}>
          <ProductCard product={product} />
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!hasMore && <p>No more products to load.</p>}
    </div>
  )
}

export default App

