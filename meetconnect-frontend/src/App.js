import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScheduleInterview from "./pages/ScheduleInterview";
import MyInterviews from "./pages/MyInterviews";
import PracticeResource from "./pages/PracticeResource";
import MyProfile from "./pages/MyProfile";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />
        <Route path="/my-interviews" element={<MyInterviews />} />
        <Route path="/practice-resource" element={<PracticeResource />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


