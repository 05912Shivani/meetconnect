import React from "react";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, Star } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate("/schedule-interview"); //  Update with your actual route
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Banner />

      <div className="max-w-5xl mx-auto px-6 py-10 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          Ace Your Next Interview with Confidence
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Your gateway to mastering interviews. Schedule mock sessions with experts and get real-time feedback.
        </p>

        <div className="flex justify-center gap-6 mb-10">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={handleScheduleClick}
          >
            Schedule Interview
          </button>
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <CalendarDays className="mx-auto text-blue-500 mb-4" size={40} />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Flexible Scheduling</h3>
            <p className="text-sm text-gray-600">
              Book interviews at your convenience with top mentors.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Users className="mx-auto text-blue-500 mb-4" size={40} />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Industry Experts</h3>
            <p className="text-sm text-gray-600">
              Get interviewed by professionals from top tech companies.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
            <Star className="mx-auto text-blue-500 mb-4" size={40} />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Boost Confidence</h3>
            <p className="text-sm text-gray-600">
              Practice regularly and walk into your real interview with confidence.
            </p>
          </div>
        </div>

        {/* Tip/Quote Section */}
        <div className="mt-12 bg-blue-100 rounded-lg p-6 max-w-3xl mx-auto">
          <h4 className="text-xl font-semibold text-blue-800 mb-2">🎯 Interview Tip of the Day</h4>
          <p className="text-gray-700 italic">
            "Practice like you’ve never won. Perform like you’ve never lost." – Unknown
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
