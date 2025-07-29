import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const Navbar = ({ toggleTheme, theme }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <nav className="navbar" style={{
      background: "var(--secondary)",
      color: "var(--button-text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.7rem 1.5rem"
    }}>
      <div className="navbar-logo">
        <Link to="/" style={{ color: "var(--primary)", fontWeight: "bold", letterSpacing: "1px", fontSize: "1.35rem", textDecoration: "none" }}>
          <span style={{ color: "var(--accent)" }}>Prime</span>Shop
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search products..." aria-label="Search" style={{
          padding: "7px 13px", borderRadius: "6px 0 0 6px", border: "1px solid var(--border-color)", outline: "none"
        }} />
        <button style={{
          borderRadius: "0 6px 6px 0", border: "none", background: "var(--primary)", color: "white", padding: "6.5px 16px"
        }}>Search</button>
      </div>
      <div className="navbar-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/wishlist" aria-label="Wishlist" style={{ color: "white", position: "relative" }}>
          ♥ Wishlist
          {wishlist.length > 0 && <span style={{
            position: "absolute", top: "-5px", right: "-13px", background: "var(--primary)", color: "white", borderRadius: "50%", padding: "2px 7px", fontSize: "11px"
          }}>{wishlist.length}</span>}
        </Link>
        <Link to="/cart" aria-label="Cart" style={{ color: "white", position: "relative" }}>
          🛒 Cart
          {cart.length > 0 && <span style={{
            position: "absolute", top: "-5px", right: "-13px", background: "var(--primary)", color: "white", borderRadius: "50%", padding: "2px 7px", fontSize: "11px"
          }}>{cart.length}</span>}
        </Link>
        {user ? (
          <>
            <Link to="/orders" style={{ color: "white" }}>Orders</Link>
            <Link to="/account" style={{ color: "white" }}>Account</Link>
            <button onClick={() => { logout(); navigate('/'); }} style={{
              background: "var(--primary)",
              color: "var(--button-text)",
              border: "none", borderRadius: "6px", padding: "4px 14px"
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white" }}>Login</Link>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </>
        )}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          style={{
            marginLeft: "8px",
            background: theme === "light" ? "var(--accent)" : "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "4px 14px",
            cursor: "pointer"
          }}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
