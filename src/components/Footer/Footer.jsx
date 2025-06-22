import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaLinkedin, FaTiktok, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import zenLogo from '../../assets/Zen Logo Main Blue 0.png';

const Footer = () => {
  return (
    <footer className="bg-[#283588] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zen Career Hub</h3>
            <p className="text-gray-300 mb-4">
              Empowering global talent and bridging opportunities for professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/zen-career-hub-zch/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://www.tiktok.com/@zen.career.hub.dxb?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                <FaTiktok className="text-2xl" />
              </a>
              <a href="https://www.instagram.com/zencareerhubhr/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Headquarter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Headquarter</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-300 mt-1" />
                <span className="text-gray-300">
                  Office 402, Sultan Building<br />
                  Port Saeed, Deira, Dubai
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <span className="text-gray-300">+971-42807200</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <span className="text-gray-300">+971-526513813</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-300" />
                <span className="text-gray-300">info@zencareerhub.ae</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaGlobe className="text-gray-300" />
                <span className="text-gray-300">zencareerhub.ae</span>
              </li>
            </ul>
          </div>

          {/* Regional Office */}
          <div>
            <h3 className="text-xl font-bold mb-4">Regional Office</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-300 mt-1" />
                <span className="text-gray-300">
                  Buddhanagar, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <span className="text-gray-300">01-5920380</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <span className="text-gray-300">+977-980-2366080</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-300" />
                <span className="text-gray-300">info@zeneduhub.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaGlobe className="text-gray-300" />
                <span className="text-gray-300">zeneduhub.com</span>
              </li>
            </ul>
          </div>

          {/* Branch Office */}
          <div>
            <h3 className="text-xl font-bold mb-4">Branch Office</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-300 mt-1" />
                <span className="text-gray-300">
                  AI transformers Ltd.<br />
                  5 Pinewood, Curwen Place<br />
                  Brighton, BN1 6UQ<br />
                  United Kingdom
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-300" />
                <span className="text-gray-300">0127304904</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Zen Career Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 