import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// PUBLIC_INTERFACE
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <section style={{maxWidth:400, margin:"48px auto", background:"#fff", borderRadius:7, padding:32 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Email"
          style={{display:"block", margin:"1em 0", width:"100%", padding:"9px"}}
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          required
          placeholder="Password"
          style={{display:"block", margin:"1em 0", width:"100%", padding:"9px"}}
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && <div style={{color: "red", marginBottom:8}}>{error}</div>}
        <button type="submit" style={{background:"var(--primary)", color:"white", border:"none", borderRadius:5, padding:"9px 25px"}} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{marginTop:18}}>
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      </form>
    </section>
  );
}
export default LoginPage;
