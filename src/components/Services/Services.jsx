import React from 'react';

const services = [
  {
    title: "Overseas Hiring Solutions",
    description: "We connect employers with qualified candidates across various industries, ensuring a perfect fit for roles in the Gulf region and beyond.",
    image: "https://placehold.co/600x400/1e40af/ffffff?text=Overseas+Hiring",
    icon: "🌍"
  },
  {
    title: "Local & International Placements",
    description: "Our extensive network enables us to place professionals in positions that align with their skills and career aspirations, both within the UAE and internationally.",
    image: "https://placehold.co/600x400/1e3a8a/ffffff?text=International+Placements",
    icon: "💼"
  },
  {
    title: "Immigration Services",
    description: "We offer comprehensive immigration support, including visa processing and legal compliance, to facilitate smooth transitions for expatriates.",
    image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Immigration+Services",
    icon: "📄"
  },
  {
    title: "Talent Acquisition & Executive Search",
    description: "Our dedicated team specializes in sourcing and placing top-tier executives and specialized professionals to drive organizational growth.",
    image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Talent+Acquisition",
    icon: "🔍"
  },
  {
    title: "HR Consultancy Services",
    description: "We provide strategic HR consulting, including policy development, performance management, and organizational structuring, to optimize workforce efficiency.",
    image: "https://placehold.co/600x400/1e3a8a/ffffff?text=HR+Consultancy",
    icon: "📊"
  },
  {
    title: "Training & Development",
    description: "Our tailored training programs enhance employee skills and performance, contributing to overall organizational success.",
    image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Training+Development",
    icon: "🎓"
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive HR solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-5xl">{service.icon}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 