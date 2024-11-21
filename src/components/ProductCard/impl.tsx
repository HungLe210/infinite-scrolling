import { Product } from './types'

type ProductCardProps = {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    console.log("SAN PHAM LE: ", product);
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <strong>Tên:</strong> {product.title} <br />
            <strong>Mô tả:</strong> {product.description} <br />
            <strong>Thể loại:</strong> {product.category}<br />
            <strong>Giá: </strong>{product.price}
            <strong>IMG: </strong>{product.images[0]}
            <img src={product.images[0]} width={200} height={200} alt="" />
        </div>
    )
}
