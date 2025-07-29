import React, { createContext, useState, useEffect, useContext } from "react";

// PUBLIC_INTERFACE
const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provider for authentication context.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated: Replace with your backend API integration
  useEffect(() => {
    // You may want to check session from localStorage or API here.
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    setLoading(true);
    // TODO: call API for login
    try {
      // EXAMPLE:
      // const res = await fetch('/api/login', {...})
      // setUser(response.user)
      setUser({ email, name: "Sample User" });
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message || "Login failed" };
    }
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    // TODO: Add logout API call if needed
  };

  // PUBLIC_INTERFACE
  const register = async (userData) => {
    setLoading(true);
    // TODO: call API for registration
    try {
      setUser({ email: userData.email, name: userData.name });
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message || "Registration failed" };
    }
  };

  const value = { user, setUser, loading, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
