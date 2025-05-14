import React, { useEffect } from 'react';
import { FaSearch, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import googleLogo from '../../assets/google.png';
import twitterLogo from '../../assets/twitter.png';
import amazonLogo from '../../assets/amazon.png';
import figmaLogo from '../../assets/figma.png';
import linkedinLogo from '../../assets/linkedin.png';
import microsoftLogo from '../../assets/microsoft.png';
import bagIcon from '../../assets/bag.png';

gsap.registerPlugin(ScrollTrigger);

const floatingPositions = [
  { top: '10%', left: '3%' },    // left top
  { top: '25%', left: '5%' },    // left mid
  { top: '65%', left: '7%' },    // left bottom
  { top: '15%', right: '3%' },   // right top
  { top: '35%', right: '6%' },   // right mid
  { top: '70%', right: '8%' },   // right bottom
];

const Header = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text animation
      gsap.from(".header-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
      });

      // Search bar animation
      gsap.from(".search-container", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
        clearProps: "all"
      });

      // Companies logo animation (main row)
      gsap.from(".company-logo-row .company-logo", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });

      // Floating background logos
      gsap.utils.toArray('.floating-logo').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-30, 30)',
          x: 'random(-30, 30)',
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const companies = [
    { name: 'Google', logo: googleLogo },
    { name: 'Twitter', logo: twitterLogo },
    { name: 'Amazon', logo: amazonLogo },
    { name: 'Figma', logo: figmaLogo },
    { name: 'LinkedIn', logo: linkedinLogo },
    { name: 'Microsoft', logo: microsoftLogo },
  ];

  return (
    <header className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden" id="home">
      {/* Floating background logos */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {companies.map((company, i) => (
          <img
            key={company.name}
            src={company.logo}
            alt={company.name}
            className="floating-logo opacity-60 absolute h-16 w-16 object-contain"
            style={floatingPositions[i]}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="company-logo-row flex flex-wrap justify-center gap-8 mb-8">
          {companies.map((company) => (
            <img
              key={company.name}
              src={company.logo}
              alt={company.name}
              className="company-logo h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="header-text text-xl font-semibold mb-4 inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-full">
            <img src={bagIcon} alt="bag" className="h-6 mr-2" />
            No.1 Job Hunt Website
          </h2>
          <h1 className="header-text text-4xl md:text-5xl font-bold mb-4">
            Search, Apply &<br />
            Get Your <span className="text-blue-600">Dream Job</span>
          </h1>
          <p className="header-text text-gray-600 max-w-2xl mx-auto">
            Your future starts here. Discover countless opportunities, take action
            by applying to jobs that match your skills and aspirations, and
            transform your career.
          </p>
        </div>

        <div className="search-container max-w-3xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
            <div className="flex-1 flex items-center px-4">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                className="w-full py-3 focus:outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <select className="px-4 py-3 border-l border-gray-200 focus:outline-none text-gray-800">
                <option>All Categories</option>
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <FaSearch className="mr-2" />
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/jobs" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
            Browse Jobs
          </Link>
          <Link to="/about" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-center border border-blue-600">
            About Us
          </Link>
          <a
            href="#"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-semibold"
          >
            <span className="mr-2 bg-white p-2 rounded-full">
              <FaPlay className="text-blue-600" />
            </span>
            How It Works?
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;