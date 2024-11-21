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
            <strong>Image url: </strong>{product.images[0]} < br />
            <img src={product.images[0]} width={200} height={200} alt="" loading='lazy' />
        </div>
    )
}
