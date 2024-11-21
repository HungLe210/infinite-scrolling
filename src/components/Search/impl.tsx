import { useState } from 'react';
import { useSearchProducts } from '../../hooks/useSearch';
import { useLastObserver } from '../../hooks/useLastObserver';
import { ProductCard } from '../ProductCard';



export function Search() {
    const [query, setQuery] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);

    const { products, loading, error, hasMore } = useSearchProducts(query, pageNumber);
    const { lastProductRef } = useLastObserver(hasMore, loading, () => setPageNumber(prev => prev + 1));
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setPageNumber(1);
    };

    return (
        <div>
            <input type='text' onChange={handleSearch} placeholder="Product's Name" />
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
    );
}
