import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-8 text-center">Contact Us</h1>
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-start">
        <div className="bg-blue-50 rounded-2xl shadow-lg p-8 flex flex-col space-y-6 border border-blue-100">
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Address:</h2>
            <p className="text-gray-700 leading-relaxed">
              Office 402, Sultan Group Investments Building<br />
              Al Ittihad Road, Opposite The Emirates Group<br />
              Al Khabaisi, Dubai, UAE
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Phone:</h2>
            <a href="tel:0566214420" className="text-blue-600 hover:underline text-lg font-medium">0566214420</a>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Email:</h2>
            <a href="mailto:info@zencareerhub.ae" className="text-blue-600 hover:underline text-lg font-medium">info@zencareerhub.ae</a>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Website:</h2>
            <a href="https://zencareerhub.ae" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg font-medium">zencareerhub.ae</a>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-blue-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4529.234445792412!2d55.330477176224164!3d25.258716377671398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cde82ccec0b%3A0x6f93373c4b07f73a!2sSultan%20Group%20Investments!5e1!3m2!1sen!2snp!4v1747912698730!5m2!1sen!2snp"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ZEN Career Hub Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
} 