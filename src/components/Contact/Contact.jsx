import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            Get in touch with our team for any inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                  <div>
                    <p className="text-gray-600">
                      Office 402, Sultan Group Investments Building<br />
                      Al Ittihad Road, Opposite The Emirates Group<br />
                      Al Khabaisi, Dubai, UAE
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-blue-600 text-xl" />
                  <a href="tel:+971566214420" className="text-gray-600 hover:text-blue-600">
                    +971 56 621 4420
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-blue-600 text-xl" />
                  <a href="mailto:info@zencareerhub.ae" className="text-gray-600 hover:text-blue-600">
                    info@zencareerhub.ae
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <FaGlobe className="text-blue-600 text-xl" />
                  <a href="https://zencareerhub.ae" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                    zencareerhub.ae
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-delay">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 