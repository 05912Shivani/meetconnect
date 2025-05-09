import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const [user, setUser] = useState({ // State to store current user data
    name: "",
    email: "",
    contact: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false);// State to toggle edit mode
  const [updatedUser, setUpdatedUser] = useState({ ...user });// Temp state for editing the form

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://meet-connect-backend.onrender.com/api/auth/profile", {
          credentials: "include", // Include cookies for session auth
        });
        const data = await response.json();

        if (data.dob) {
          data.dob = new Date(data.dob).toISOString().split("T")[0];
        }

        if (response.ok) {
          setUser(data);
          setUpdatedUser(data);
        } else {
          console.error("Error fetching profile:", data.message);// Log error if request fails
        }
      } catch (error) {
        console.error("Error fetching profile:", error);// Catch and log fetch errors
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });// Update corresponding field in form state
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("https://meet-connect-backend.onrender.com/api/auth/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        if (updatedData.user.dob) {
          updatedData.user.dob = new Date(updatedData.user.dob).toISOString().split("T")[0];
        }
        setUser(updatedData.user);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");// Log error if response not ok
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>

      {/* Profile Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-800">{user.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email:</label>
        <p className="text-gray-800">{user.email}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Contact:</label>
        {isEditing ? (
          <input
            type="text"
            name="contact"
            value={updatedUser.contact}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-800">{user.contact}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Date of Birth:</label>
        {isEditing ? (
          <input
            type="date"
            name="dob"
            value={updatedUser.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-800">{user.dob}</p>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
