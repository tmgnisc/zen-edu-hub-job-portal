import React from 'react';
import Button from '../components/Button';
import logo1 from '../assets/clientimages/png-removebg-preview.png';
import logo2 from '../assets/clientimages/png (1).png';
import logo3 from '../assets/clientimages/png (2).png';
import logo4 from '../assets/clientimages/png__4_-removebg-preview.png';
import logo5 from '../assets/clientimages/png (5).png';
import logo6 from '../assets/clientimages/png (6).png';
import logo7 from '../assets/clientimages/download-removebg-preview.png';

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientsPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
    {/* Hero Section */}
    <header className="bg-[#283588] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Clients</h1>
        <p className="max-w-2xl mx-auto text-blue-100 md:text-lg">
          We are proud to partner with leading organizations across the globe. Here are some of the companies we work with:
        </p>
      </div>
    </header>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 mt-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-center mb-20">
        {clientLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center w-40 h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-[#283588] rounded-xl shadow hover:shadow-lg transition-all"
          >
            <img
              src={logo}
              alt={`Client ${idx + 1}`}
              className="max-h-32 lg:max-h-36 xl:max-h-40 max-w-full object-contain"
              style={{
                filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'
              }}
            />
          </div>
        ))}
      </div>
    </div>
    {/* CTA Section (LandingPage style) */}
    <section className="py-12 bg-gradient-to-br from-blue-900 to-blue-500 text-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-[28px] font-medium mb-2 leading-[33.6px]">Want to Become a Client?</h2>
            <p className="text-base leading-relaxed text-blue-100 mb-10">
              Join our growing network of satisfied clients. Contact us today to discover how ZEN Career Hub can help your organization thrive.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Button to="/contact" variant="secondary">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ClientsPage; 