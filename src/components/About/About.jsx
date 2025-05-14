import React, { useEffect } from 'react';
import { FaGlobe, FaBuilding, FaHandshake, FaUsers } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.about-section').forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <FaGlobe className="text-4xl text-blue-500" />,
      title: 'Overseas Recruitment',
      description: 'Connecting skilled professionals with global opportunities'
    },
    {
      icon: <FaBuilding className="text-4xl text-green-500" />,
      title: 'Local Placements',
      description: 'Building strong local talent networks'
    },
    {
      icon: <FaHandshake className="text-4xl text-purple-500" />,
      title: 'HR Consulting',
      description: 'Strategic HR solutions for business growth'
    },
    {
      icon: <FaUsers className="text-4xl text-orange-500" />,
      title: 'Immigration Services',
      description: 'Comprehensive support for international mobility'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="about-section relative overflow-hidden rounded-3xl mb-16">
          <div className="absolute inset-0">
            <img 
              src="https://placehold.co/1920x600/2563eb/ffffff?text=ZEN+Career+Hub" 
              alt="Office" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
          </div>
          <div className="relative z-10 text-center py-20 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-blue-300">ZEN Career Hub</span>
            </h1>
            <p className="text-gray-200 max-w-3xl mx-auto text-lg">
              A trusted name in talent solutions, specializing in overseas recruitment, local placements, 
              HR consulting, and immigration services.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="about-section grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              With our head office in Nepal and a regional office in Dubai, we connect skilled professionals 
              with global opportunities and help businesses build high-performing teams.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Rooted in integrity and driven by results, we offer end-to-end workforce solutions tailored 
              to your needs—whether you're a company seeking top talent or an individual pursuing a career abroad. 
              At ZEN, we don't just fill roles—we build futures.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://placehold.co/400x300/2563eb/ffffff?text=Office+1" 
              alt="Office 1" 
              className="rounded-xl shadow-lg"
            />
            <img 
              src="https://placehold.co/400x300/2563eb/ffffff?text=Office+2" 
              alt="Office 2" 
              className="rounded-xl shadow-lg mt-8"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="about-section mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Presence */}
        <div className="about-section bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Global Presence</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <FaBuilding className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Head Office</h3>
                    <p className="text-blue-100">Nepal</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <FaBuilding className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Regional Office</h3>
                    <p className="text-blue-100">Dubai</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-64">
              <img 
                src="https://placehold.co/600x400/2563eb/ffffff?text=Global+Map" 
                alt="Global Presence" 
                className="rounded-xl shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 