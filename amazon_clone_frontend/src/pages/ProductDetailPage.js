import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../api";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

// PUBLIC_INTERFACE
function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    apiGet(`/products/${id}`)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  const inWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <section style={{ maxWidth: 900, margin: "38px auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <div style={{ display: "flex", gap: 30, minHeight: 300 }}>
        <img src={product.image_url || "https://via.placeholder.com/240x320"} alt={product.name} style={{ width: 240, height: 300, objectFit: "contain", background:'#eee', borderRadius:6 }} />
        <div>
          <h2>{product.name}</h2>
          <div style={{color:'var(--accent)', fontWeight:'bold', fontSize:'1.3em',margin:'7px 0'}}>${product.price?.toFixed(2)}</div>
          <div><strong>Category:</strong> {product.category}</div>
          <div style={{margin:'8px 0'}}>{product.description}</div>
          <div style={{margin: "18px 0"}}>
            <button onClick={() => addToCart(product)} style={{
              background:"var(--primary)", color:"white", border:"none", borderRadius:"6px", padding:"9px 22px", marginRight:"13px"
            }}>Add to Cart</button>
            <button onClick={() => addToWishlist(product)} disabled={inWishlist} style={{
              background: inWishlist ? "#bbb" : "var(--accent)", color:"white", border: "none", borderRadius:"6px", padding:"9px 18px"
            }}>{inWishlist ? "In Wishlist" : "Wishlist"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDetailPage;
