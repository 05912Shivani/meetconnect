import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { UserCircle } from "lucide-react"; // ✅ Import User Icon

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login");
      })
      .catch(() => {
        alert("Logout failed! Please try again.");
      });
  };

  return (
    <header style={{ background: "#333", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <nav>
        <ul style={{ listStyle: "none", display: "flex", gap: "15px", padding: 0, margin: 0 }}>
          <li><Link style={linkStyle} to="/">Dashboard</Link></li>
          <li><Link style={linkStyle} to="/schedule-interview">Schedule Interview</Link></li>
          <li><Link style={linkStyle} to="/my-interviews">My Interviews</Link></li>
          <li><Link style={linkStyle} to="/practice-resource">Practice Resource</Link></li>
          <li><Link style={linkStyle} to="/about">About</Link></li>
        </ul>
      </nav>

      <div style={{ position: "relative" }}>
        {!user ? (
          <>
            <Link style={linkStyle} to="/signup">Signup</Link>
            <Link style={{ ...linkStyle, marginLeft: "10px" }} to="/login">Login</Link>
          </>
        ) : (
          <>
            {/* ✅ User Icon - Toggle Dropdown on Click */}
            <UserCircle 
              size={35} 
              color="white" 
              style={{ cursor: "pointer" }} 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            
            {/* ✅ Dropdown Menu */}
            {dropdownOpen && (
              <div style={dropdownStyle}>
                <Link to="/my-profile" style={dropdownItem} onClick={() => setDropdownOpen(false)}>My Profile</Link>
                <button style={dropdownItem} onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "16px",
  padding: "8px 12px",
  transition: "0.3s"
};

const dropdownStyle = {
  position: "absolute",
  right: 0,
  top: "40px",
  background: "white",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  borderRadius: "5px",
  width: "120px",
  textAlign: "center",
  padding: "5px 0",
  zIndex: 10
};

const dropdownItem = {
  display: "block",
  padding: "10px",
  textDecoration: "none",
  color: "#333",
  background: "white",
  border: "none",
  width: "100%",
  cursor: "pointer"
};

export default Header;
