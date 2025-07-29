import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <section style={{ maxWidth: 1100, margin: "38px auto" }}>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>
          Your wishlist is empty. <Link to="/">Browse Products</Link>
        </p>
      ) : (
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '18px' }}>
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default WishlistPage;
