import React, { useEffect } from 'react';
import { FaUser, FaSearch, FaFileAlt, FaBriefcase } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import stepsBg from '../../assets/steps-bg.png';

gsap.registerPlugin(ScrollTrigger);

const Steps = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from(".section-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 80%",
        },
        clearProps: "all"
      });

      // Cards animation
      gsap.from(".step-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 70%",
        },
        clearProps: "all"
      });

      // Hover animation for step cards
      const cards = document.querySelectorAll('.step-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', duration: 0.3, ease: 'power2.out' });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: <FaUser className="text-3xl" />,
      title: 'Create an Account',
      description: 'Sign up with just a few clicks to unlock exclusive access to a world of job opportunities and landing your dream job. It\'s quick, easy, and completely free.'
    },
    {
      icon: <FaSearch className="text-3xl" />,
      title: 'Search Job',
      description: 'Dive into our job database tailored to match your skills and preferences. With our advanced search filters, finding the perfect job has never been easier.'
    },
    {
      icon: <FaFileAlt className="text-3xl" />,
      title: 'Upload CV/Resume',
      description: 'Showcase your experience by uploading your CV or resume. Let employers know why you\'re the perfect candidate for their job openings.'
    },
    {
      icon: <FaBriefcase className="text-3xl" />,
      title: 'Get Job',
      description: 'Take the final step towards your new career. Get ready to embark on your professional journey and secure the job you\'ve been dreaming of.'
    }
  ];

  return (
    <section className="steps-section py-16 relative" id="about" style={{ backgroundImage: `url(${stepsBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-4xl md:text-5xl font-extrabold mb-4">
            Get Hired in 4 <span className="text-blue-600">Quick Easy Steps</span>
          </h2>
          <p className="section-title text-gray-600 max-w-2xl mx-auto">
            Follow Our Simple, Step-by-Step Guide to Quickly Land Your Dream Job
            and Start Your New Career Journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card bg-white p-8 rounded-xl shadow-lg transition-all duration-300 transform"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-blue-600">
                  {step.icon}
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-center text-black">{step.title}</h4>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;