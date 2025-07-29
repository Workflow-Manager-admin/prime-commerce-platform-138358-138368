import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { apiGet } from "../api";

// PUBLIC_INTERFACE
function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // Example endpoint
        const data = await apiGet("/products");
        setProducts(data || []);
      } catch {
        setProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <section style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 14px" }}>
      <h2>Featured Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'18px'}}>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          )}
        </div>
      )}
      <div style={{marginTop: '28px'}}>
        <Link to="/wishlist">Go to Wishlist</Link> |&nbsp;
        <Link to="/orders">Your Orders</Link>
      </div>
    </section>
  );
}

export default HomePage;
