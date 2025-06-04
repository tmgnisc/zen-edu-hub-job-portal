import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import GoogleMap from '../components/GoogleMap';
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import Button from '../components/Button';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">Get In Touch</h1>
          <p className="max-w-2xl mx-auto text-blue-100 md:text-lg">
            We're here to help with your career needs. Reach out to us through any of the channels below.
          </p>
          
       
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-20 py-12 md:py-16 pt-20">
        {/* Contact Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 -mt-16 md:-mt-24">
          {/* Contact Form Card */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl">
            <ContactForm ButtonComponent={Button} />
          </div>
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl">
            <ContactInfo />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Visit Our Office</h2>
          <GoogleMap />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ZEN Career Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;