import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Product } from './components/ProductCard/types'
import { ProductCard } from './components/ProductCard'

function App() {

  const [products, setProducts] = useState<Product[]>([]) // Product List State
  const [loading, setLoading] = useState<boolean>(false) // Loading State
  const [error, setError] = useState<string | null>(null) // Error State
  const [query, setQuery] = useState<string>('')
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)

  useEffect(() => {
    fetchProduct();
  }, [query, pageNumber])

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://dummyjson.com/products", {
        params: { q: query }
      });

      const products: Product[] = response.data.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        images: product.images[0]
      }))
      console.log(products);
      setProducts(products);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  function handleSearch(e: any) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <>
      <input type='text' onChange={handleSearch} placeholder="Product's Name"></input>
      <h1>List Product</h1>
      {products.map((product, index) => (
        < ProductCard key={index} product={product} />
      ))}
    </>
  )
}

export default App
