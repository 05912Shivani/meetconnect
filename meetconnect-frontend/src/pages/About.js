import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../styles/About.css"; // Ensure you create a separate CSS file

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
      name: "Jane Doe",
      role: "Co-Founder & CEO",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_Jf63icW8yavQKnsAYiR4bJAxVcIroFUhQ&s",
    },
    {
      name: "John Smith",
      role: "Co-Founder & CTO",
      image: "https://static.vecteezy.com/system/resources/thumbnails/011/100/422/small/confident-male-ceo-in-formal-outfit-has-good-business-reputation-looks-smart-at-work-isolated-over-grey-studio-backgrounf-with-copy-space-for-your-promotion-charismatic-employer-poses-indoor-free-photo.JPG",
    },
    {
      name: "Emma Wilson",
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
    <div className="about-container">
      {/* Company Information Section */}
      <section className="about-company">
        <h1>About MeetConnect</h1>
        <p>
          MeetConnect is a mock interview scheduling platform designed to help
          students and professionals practice and refine their interview skills.
          We connect users with industry experts for technical, behavioral, and
          role-specific mock interviews.
        </p>
      </section>

      {/* Our Team Section with Carousel */}
      <section className="about-team">
        <h2>Our Team</h2>
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
