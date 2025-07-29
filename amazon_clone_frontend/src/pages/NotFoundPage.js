import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
const NotFoundPage = () => (
  <div style={{ margin: "88px auto", textAlign: "center" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/">Return home</Link>
  </div>
);

export default NotFoundPage;
