import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  // FAQ Toggle State
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ Data
  const faqs = [
    {
      question: "How does MeetConnect work?",
      answer:
        "MeetConnect allows users to schedule mock interviews with experts across different domains. Simply sign up, select an interview type, and book a slot.",
    },
    {
      question: "Is MeetConnect free to use?",
      answer:
        "MeetConnect offers both free and premium mock interviews. Free sessions provide basic interview practice, while premium sessions offer in-depth feedback.",
    },
    {
      question: "Can I reschedule an interview?",
      answer:
        "Yes! You can reschedule or cancel an interview up to 24 hours before the scheduled time.",
    },
  ];

  // Team Members Data
  const teamMembers = [
    {
      name: "Emma Wilson",
      role: "Co-Founder & CEO",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_Jf63icW8yavQKnsAYiR4bJAxVcIroFUhQ&s",
    },
    {
      name: "John Smith",
      role: "Co-Founder & CTO",
      image: "https://static.vecteezy.com/system/resources/thumbnails/011/100/422/small/confident-male-ceo-in-formal-outfit-has-good-business-reputation-looks-smart-at-work-isolated-over-grey-studio-backgrounf-with-copy-space-for-your-promotion-charismatic-employer-poses-indoor-free-photo.JPG",
    },
    {
      name: "Jane Doe",
      role: "Investor & Advisor",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRnmO4uXGDJ0LCXK3DIvQAlMp9ug18gl5UQ&s",
    },
  ];

  // Carousel Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Information Section */}
      <section className="about-company mb-12 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">About MeetConnect</h1>
        <p className="text-lg text-gray-600">
          MeetConnect is a mock interview scheduling platform designed to help
          students and professionals practice and refine their interview skills.
          We connect users with industry experts for technical, behavioral, and
          role-specific mock interviews.
        </p>
      </section>

      {/* Our Team Section with Carousel */}

{/* Our Team Section with Carousel */}
<section className="about-team mb-12">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Team</h2>
  <div className="flex justify-center">
    <div className="w-full max-w-lg">
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className="flex justify-center">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-72 mx-auto">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-lg text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
</section>



      {/* FAQ Section */}
      <section className="faq-section mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "bg-gray-100" : ""} mb-4 p-4 rounded-lg shadow-md cursor-pointer`}
          >
            <button
              className="faq-question w-full text-left text-lg font-semibold text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="faq-answer mt-2 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
