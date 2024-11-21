import { Product } from './types'

type ProductCardProps = {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    //console.log("Single Product: ", product);
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <strong>Name:</strong> {product.title} <br />
            <strong>Description:</strong> {product.description} <br />
            <strong>Category:</strong> {product.category}<br />
            <strong>Price: </strong>{product.price}< br />
            <strong>Images: </strong>

            {Array.isArray(product.images) && product.images.length > 0 ? (
                <div>
                    {/* Lặp qua từng phần tử của mảng images và hiển thị URL và img */}
                    {product.images.map((imageUrl, index) => (
                        <div key={index}>
                            <p>Image URL: {imageUrl}</p>
                            <img src={imageUrl} width={200} height={200} alt={`Product Image ${index}`} loading='lazy' />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No images available</p>
            )}
        </div>
    )
}
