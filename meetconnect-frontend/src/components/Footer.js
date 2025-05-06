import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false); 

  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12 relative z-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        {/*  Tagline */}
        <div>
          <h2 className="text-lg font-semibold mb-2">MeetConnect</h2>
          <p className="text-sm">
          Connecting aspiring professionals with mock interviewers —elevate your career with confidence.<br></br>
            Bridging the gap between preparation and opportunity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/about" className="hover:underline">About Us</Link>
            </li>
            <li>
              <button onClick={() => setShowTerms(true)} className="hover:underline">
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">📧 meetconnect.support@gmail.com</p>
          <p className="text-sm">🔗 <a href="https://www.linkedin.com/in/shivanisharma3/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn Profile</a></p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-xs text-gray-500">
        © 2025 MeetConnect. All rights reserved.
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 p-6 rounded-lg max-w-lg w-full shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li>Mock interviews are for learning purposes only.</li>
              <li>All user data is securely stored and never shared.</li>
              <li>Please maintain professional conduct during sessions.</li>
              <li>MeetConnect is not responsible for job guarantees.</li>
            </ul>
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
