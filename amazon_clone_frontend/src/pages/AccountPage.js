import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function AccountPage() {
  const { user } = useAuth();
  if (!user) return <div style={{ margin: "38px auto", textAlign: "center" }}><p><Link to="/login">Sign in</Link> to view your account.</p></div>;
  return (
    <section style={{ maxWidth: 650, margin: "38px auto", background:"#fff", borderRadius:7, padding:"32px" }}>
      <h2>Account</h2>
      <div>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
      </div>
      {/* TODO: Add address update, password change, etc. */}
    </section>
  );
}
export default AccountPage;
