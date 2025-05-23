import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">Our Information</h3>
      
      <div className="space-y-5">
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <MapPin className="text-blue-600 h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Office Address</h4>
            <p className="text-gray-600 leading-relaxed">
              Office 402, Sultan Group Investments Building<br />
              Al Ittihad Road, Opposite The Emirates Group<br />
              Al Khabaisi, Dubai, UAE
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <Phone className="text-blue-600 h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Phone Number</h4>
            <a 
              href="tel:+971566214420" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg inline-block"
            >
              +971 56 621 4420
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <Mail className="text-blue-600 h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Email Address</h4>
            <a 
              href="mailto:info@zencareerhub.ae" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg inline-block"
            >
              info@zencareerhub.ae
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <Clock className="text-blue-600 h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Working Hours</h4>
            <p className="text-gray-600 leading-relaxed">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 2:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 