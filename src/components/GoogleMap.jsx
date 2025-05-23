import React from 'react';

const GoogleMap = () => {
  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4529.234445792412!2d55.330477176224164!3d25.258716377671398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cde82ccec0b%3A0x6f93373c4b07f73a!2sSultan%20Group%20Investments!5e1!3m2!1sen!2snp!4v1747912698730!5m2!1sen!2snp"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="ZEN Career Hub Location"
        className="absolute inset-0"
      ></iframe>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="text-white font-medium">
          ZEN Career Hub
        </div>
        <div className="text-white/80 text-sm">
          Sultan Group Investments Building, Dubai
        </div>
      </div>
    </div>
  );
};

export default GoogleMap; 