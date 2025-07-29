import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

// PUBLIC_INTERFACE
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  const inWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="product-card" style={{
      background: "#fff",
      borderRadius: "7px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 2px 8px rgba(36,48,82,0.08)",
      padding: "15px",
      minHeight: "340px",
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image_url || "https://via.placeholder.com/140x180"} alt={product.name} style={{ width: "120px", height: "160px", objectFit: "contain" }} />
        <h4 style={{margin:"10px 0 0 0"}}>{product.name}</h4>
      </Link>
      <div style={{fontWeight:"bold", color:"var(--accent)", marginBottom:"5px"}}>${product.price?.toFixed(2)}</div>
      <p style={{fontSize:"0.95em",marginBottom: "auto"}}>{product.short_description || product.description}</p>
      <div style={{display:"flex", gap:"7px", marginTop:"10px"}}>
        <button onClick={() => addToCart(product)} style={{
          background:"var(--primary)", color:"white", border:"none", borderRadius:"5px", padding:"7px 15px", cursor:"pointer"
        }}>Add to Cart</button>
        <button onClick={() => addToWishlist(product)} disabled={inWishlist} style={{
          background: inWishlist ? "#bbb" : "var(--accent)", color:"white", border:"none", borderRadius:"5px", padding:"7px 13px"
        }}>{inWishlist ? "In Wishlist" : "Wishlist"}</button>
      </div>
    </div>
  );
};

export default ProductCard;
