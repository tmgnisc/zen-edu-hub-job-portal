import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import zenLogo from '../../assets/Zen Logo Main Blue 0.png';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white">
              © {new Date().getFullYear()} Zen Career Hub. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 