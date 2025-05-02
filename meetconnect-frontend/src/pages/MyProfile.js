import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  // ✅ Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          credentials: "include", // Important for session-based auth
        });
        const data = await response.json();

        // ✅ Convert DOB from ISO to YYYY-MM-DD for date input
        if (data.dob) {
          data.dob = new Date(data.dob).toISOString().split("T")[0];
        }

        if (response.ok) {
          
          setUser(data);
          setUpdatedUser(data);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // ✅ Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
          // ✅ Convert DOB from ISO to YYYY-MM-DD before updating state
      if (updatedData.user.dob) {
        updatedData.user.dob = new Date(updatedData.user.dob).toISOString().split("T")[0];
      }
        setUser(updatedData.user);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-info">
        <label>Name:</label>
        {isEditing ? (
          <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
        ) : (
          <p>{user.name}</p>
        )}
      </div>

      <div className="profile-info">
        <label>Email:</label>
        <p>{user.email}</p>
      </div>

      <div className="profile-info">
        <label>Contact:</label>
        {isEditing ? (
          <input type="text" name="contact" value={updatedUser.contact} onChange={handleChange} />
        ) : (
          <p>{user.contact}</p>
        )}
      </div>

      <div className="profile-info">
        <label>Date of Birth:</label>
        {isEditing ? (
          <input type="date" name="dob" value={updatedUser.dob} onChange={handleChange} />
        ) : (
          <p>{user.dob}</p>
        )}
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdateProfile}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
