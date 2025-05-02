import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    dob:"",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      await axios.post("http://localhost:5000/api/auth/register", userData, {
        withCredentials: true,
      });
      alert("Signup Successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed! Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="dob" name="dob" placeholder="DOB" onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
