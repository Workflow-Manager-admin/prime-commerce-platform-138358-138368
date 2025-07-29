import React, { useEffect, useState } from "react";
import { apiGet } from "../api";

// PUBLIC_INTERFACE
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // TODO: Replace with real API call
    setOrders([
      { id: 1, items: [{ name: "Item A", qty: 1 }], total: 55.2, status: "Delivered" },
      { id: 2, items: [{ name: "Item B", qty: 2 }], total: 38.0, status: "Processing" },
    ]);
  }, []);

  return (
    <section style={{ maxWidth: 900, margin: "38px auto", background: "#fff", borderRadius: 7, padding: "32px" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.items.map((i) => (
                  <span key={i.name}>{i.name} x{i.qty}; </span>
                ))}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
export default OrdersPage;
