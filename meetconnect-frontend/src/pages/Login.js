import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");// Local state to hold email input
  const [password, setPassword] = useState("");// Local state to hold password input
  const dispatch = useDispatch();//dispatch Redux actions
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth); // Extract loading and error from Redux auth slice

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })) // Dispatch loginUser thunk with email and password
      .unwrap() // Unwraps the promise to handle success/failure manually
      .then(() => {
        alert("Login Successful!");
        navigate("/");
      })
      .catch((err) => {
        alert(err || "Login failed! Please try again.");// Show error alert if login fails
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}// Update email state on input change
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}// Update password state on input change
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}// Disable button while loading
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
