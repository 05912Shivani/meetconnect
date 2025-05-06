import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { UserCircle } from "lucide-react"; // Import User Icon

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
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <nav>
        <ul className="flex space-x-6">
          <li><Link className={linkClass} to="/">Dashboard</Link></li>
          <li><Link className={linkClass} to="/schedule-interview">Schedule Interview</Link></li>
          <li><Link className={linkClass} to="/my-interviews">My Interviews</Link></li>
          <li><Link className={linkClass} to="/practice-resource">Practice Resource</Link></li>
          <li><Link className={linkClass} to="/about">About</Link></li>
        </ul>
      </nav>

      <div className="relative">
        {!user ? (
          <>
            <Link className={`${linkClass} ml-4`} to="/signup">Signup</Link>
            <Link className={`${linkClass} ml-4`} to="/login">Login</Link>
          </>
        ) : (
          <>
            {/* User Icon - Toggle Dropdown on Click */}
            <UserCircle 
              size={35} 
              color="white" 
              className="cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-40 text-center z-10">
                <Link to="/my-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

// Tailwind class for the links
const linkClass = "text-white text-lg hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300";

export default Header;
