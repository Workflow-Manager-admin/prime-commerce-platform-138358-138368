import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1), 0
  );

  return (
    <section style={{ maxWidth: 800, margin: "40px auto", background: "#fff", borderRadius: 7, padding: "32px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Cart is empty. <Link to="/">Browse Products</Link>
        </p>
      ) : (
        <>
          <table style={{ width: "100%", marginBottom: "28px" }}>
            <thead>
              <tr style={{ background: "#f8f8fa" }}>
                <th align="left">Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th style={{width:40}}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      style={{ width: 38 }}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQty(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: "#bbb", color: "white", border: "none", borderRadius: 5, padding: "4px 8px" }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: <span style={{ color: "var(--primary)" }}>${total.toFixed(2)}</span></h4>
          <div style={{margin:"18px 0"}}>
            <button onClick={() => clearCart()} style={{ background: "#eee", color: "#232F3E", border: "none", borderRadius: 6, padding: "7px 18px", marginRight:14 }}>
              Clear Cart
            </button>
            <button onClick={() => navigate("/checkout")} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 6, padding: "7px 20px" }}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
