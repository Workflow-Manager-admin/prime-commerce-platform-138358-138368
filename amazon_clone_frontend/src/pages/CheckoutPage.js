import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function CheckoutPage() {
  const { cart } = useCart();
  if (cart.length === 0) {
    return <section style={{ maxWidth: 800, margin: "38px auto" }}>
      <p>Cart is empty. <Link to="/">Browse products</Link></p>
    </section>;
  }
  // Checkout form and order summary
  return (
    <section style={{ maxWidth: 650, margin: "38px auto", background: "#fff", borderRadius: 7, padding: "32px" }}>
      <h2>Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name} x{item.quantity} - ${item.price * item.quantity}</li>
        ))}
      </ul>
      <div style={{margin: "18px 0"}}>
        {/* TODO: Implement checkout/payment form & order submit */}
        <button style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 6, padding: "7px 20px" }}>
          Place Order
        </button>
      </div>
    </section>
  );
}

export default CheckoutPage;
