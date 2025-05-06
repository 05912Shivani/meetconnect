import React from 'react';

// Banner component: Displays a welcome message on the homepage
const Banner = () => {
  return (
    // Container with blue background, white text, padding, center-aligned text, shadow, and rounded bottom corners
    <div className="bg-blue-600 text-white py-12 px-6 text-center shadow-md rounded-b-3xl">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Welcome to MeetConnect
      </h1>
      <p className="text-lg md:text-xl mb-2">
        Schedule your mock interviews with experts!
      </p>
      <p className="text-base md:text-lg text-blue-100">
        Get prepared for your interviews with our mock interview scheduling platform.
      </p>
    </div>
  );
};

export default Banner;
