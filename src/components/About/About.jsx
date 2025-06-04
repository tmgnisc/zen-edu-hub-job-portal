import React, { useEffect, useRef } from 'react';
import { 
  FaGlobe, FaBuilding, FaHandshake, FaUsers, FaPhone, FaEnvelope, 
  FaGlobe as FaWebsite, FaQuoteLeft, FaChevronRight, FaCheck,
  FaHospital, FaHotel, FaLaptopCode, FaWarehouse, FaTools, FaIndustry, FaHardHat
} from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '../../assets/about 1.jpeg';
import aboutImage2 from '../../assets/about 2.jpeg';
import CEO from '../../assets/aashish.jpeg'
import Quality from '../../assets/zen quality.jpeg'

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const qualityRef = useRef(null);
  const hiringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current.querySelectorAll('.hero-animate'), {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Animate sections on scroll with staggered children
      const sections = [storyRef, valuesRef, qualityRef, hiringRef];
      
      sections.forEach(sectionRef => {
        const section = sectionRef.current;
        const children = section.querySelectorAll('.animate-item');
        
        gsap.from(children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
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
      icon: <FaBuilding className="text-4xl text-blue-500" />,
      title: 'Local Placements',
      description: 'Building strong local talent networks'
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-500" />,
      title: 'HR Consulting',
      description: 'Strategic HR solutions for business growth'
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: 'Immigration Services',
      description: 'Comprehensive support for international mobility'
    }
  ];

  const coreValues = [
    {
      number: "01",
      title: "Innovate and Improve",
      description: "Innovation opens a window for creativity and high performance. We are committed to our continuous growth & development."
    },
    {
      number: "02",
      title: "Teamwork",
      description: "We work as a team. We share knowledge, experience and leverage continuous improvement for learning."
    },
    {
      number: "03",
      title: "Integrity",
      description: "All individuals are accountable for the highest standards of ethical behaviour. We deliver recruitment services with honesty, transparency, equality and consistency."
    },
    {
      number: "04",
      title: "Transparency",
      description: "We maintain total transparency with both recruiter and employee at the time of recruitment."
    },
    {
      number: "05",
      title: "Positivity",
      description: "We strive to have a positive attitude in all that we do."
    },
    {
      number: "06",
      title: "Law",
      description: "We respect the international laws and the laws of each nation and do our business there adequately."
    }
  ];

  const qualityPolicies = [
    "No Discrimination",
    "Zero cost",
    "No child Labour",
    "Practice 100% Ethical recruitment",
    "Equal Opportunity",
    "Continuous improvement",
    "Rolling up ourselves Transparency",
    "Creativity",
    "Excellence Experiences"
  ];

  const hiringCategories = [
    {
      title: "Engineering and Construction Worker",
      icon: <FaHardHat />,
      color: "bg-orange-500"
    },
    {
      title: "Healthcare Sector",
      icon: <FaHospital />,
      color: "bg-red-500"
    },
    {
      title: "Hospitality Sector",
      icon: <FaHotel />,
      color: "bg-purple-500"
    },
    {
      title: "Information Technology Sector",
      icon: <FaLaptopCode />,
      color: "bg-blue-500"
    },
    {
      title: "Facility Management and Sales Sector",
      icon: <FaBuilding />,
      color: "bg-green-500"
    },
    {
      title: "Warehouse Worker",
      icon: <FaWarehouse />,
      color: "bg-yellow-500"
    },
    {
      title: "Manufacturing Sectors",
      icon: <FaIndustry />,
      color: "bg-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div ref={heroRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 hero-animate">
              <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-600 font-medium text-sm">ABOUT US</div>
              <h1 className="text-[40px] font-bold text-gray-900 leading-tight">
                About <span className="text-blue-600">ZEN Career Hub</span>
              </h1>
              <div className="w-20 h-1 bg-blue-500"></div>
              <p className="text-[20px] text-gray-600 leading-relaxed">
                Zen Career Hub HR is a Dubai-based company with a regional office in Nepal and a branch in the United Kingdom. We specialize in international recruitment, providing both blue- and white-collar workforce solutions across diverse sectors such as construction, security, cleaning, hospitality, retail (supermarkets), manufacturing, and warehousing. Our talent sourcing network spans Nepal, India, Bangladesh, Philipines and Sri Lanka, catering to the manpower needs of companies across the UAE and GCC
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                {services.map((service, index) => (
                  <div key={index} className="inline-flex items-center bg-blue-50 rounded-full px-4 py-1.5">
                    {React.cloneElement(service.icon, { className: "text-sm text-blue-600 mr-2" })}
                    <span className="text-sm font-medium text-gray-700">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hero-animate">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[300px]">
                <img 
                  src={aboutImage || "/placeholder.svg"}
                  alt="ZEN Career Hub Team" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white text-xl font-bold">Building Global Careers Since 2010</h2>
                  <p className="text-blue-100">Connecting talent with opportunity worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div ref={storyRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-item">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[350px] w-full">
                <img
                  src={aboutImage2}
                  alt="Office 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-6 animate-item">
              <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-600 font-medium text-sm">OUR STORY</div>
              <h2 className="text-[28px] font-medium text-gray-900 leading-[33.6px]">Building bridges between <span className="text-blue-600">talent and opportunity</span></h2>
              <div className="w-20 h-1 bg-blue-500"></div>
              <p className="text-[19px] leading-[19.2px] text-gray-900">
                With our office in Dubai, we connect skilled professionals with global opportunities 
                and help businesses build high-performing teams.
              </p>
              <p className="text-[19px] leading-[19.2px] text-gray-900">
                Rooted in integrity and driven by results, we offer end-to-end workforce solutions tailored 
                to your needs—whether you're a company seeking top talent or an individual pursuing a career abroad. 
                At ZEN, we don't just fill roles—we build futures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div ref={valuesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 animate-item">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-600 font-medium text-sm mb-4">OUR PRINCIPLES</div>
            <h2 className="text-[28px] font-medium text-gray-900 leading-[33.6px]">Core Values</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mt-4"></div>
            <p className="text-[19px] leading-[19.2px] text-gray-900 max-w-3xl mx-auto mt-6">
              Our core values define who we are and guide how we conduct business. They are the foundation of our company culture and shape our interactions with clients, candidates, and each other.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="group animate-item">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:translate-y-[-5px]">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mr-4 group-hover:bg-blue-700 transition-colors">
                      {value.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-[19px] leading-[19.2px] text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-600 rounded-3xl overflow-hidden animate-item">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <FaQuoteLeft className="text-4xl text-blue-400 mb-6" />
                <p className="text-xl text-white leading-relaxed italic">
                  "At ZEN Career Hub, our values aren't just words on a page—they're the principles that guide every decision we make and every interaction we have."
                </p>
                <div className="mt-8">
                  <p className="text-blue-200 font-medium">Aashish Khokhali</p>
                  <p className="text-blue-300">CEO, ZEN Career Hub</p>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <img 
                  src={CEO} 
                  alt="Our Team" 
                  className="w-full h-full object-cover object-top rounded-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Policy Section */}
      <div ref={qualityRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-item">
              <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-600 font-medium text-sm mb-4">OUR COMMITMENT</div>
              <h2 className="text-[28px] font-medium text-gray-900 leading-[33.6px]">Quality Policy</h2>
              <div className="w-20 h-1 bg-blue-500 mt-4"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {qualityPolicies.map((policy, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-blue-600 text-xs" />
                    </div>
                    <p className="text-[19px] leading-[19.2px] text-gray-900">{policy}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                <p className="text-lg text-gray-800">
                  At ZEN Career Hub HR Consultancies, we are dedicated to bridging the gap between talent and opportunity, fostering growth for individuals and organizations alike.
                </p>
              </div>
            </div>
            
            <div className="relative animate-item">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent rounded-3xl transform -rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-blue-100 to-transparent rounded-3xl transform rotate-3"></div>
              <div className="relative z-10 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-1">
                <img 
                  src={Quality}
                  alt="Quality Policy" 
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Categories Section */}
      <div ref={hiringRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12 animate-item">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-blue-600 font-medium text-sm mb-4">OUR EXPERTISE</div>
            <h2 className="text-[28px] font-medium text-gray-900 leading-[33.6px]">Hiring Categories</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mt-4"></div>
            <p className="text-[19px] leading-[19.2px] text-gray-900 max-w-3xl mx-auto mt-6">
              We specialize in recruiting top talent across a diverse range of industries, connecting skilled professionals with opportunities worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hiringCategories.map((category, index) => (
              <div key={index} className="animate-item">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:translate-y-[-5px]">
                  <div className={`w-16 h-16 rounded-xl ${category.color} text-white flex items-center justify-center mb-6`}>
                    {React.cloneElement(category.icon, { className: "text-2xl" })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-3xl p-8 md:p-12 animate-item">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for specialized talent?</h3>
                <p className="text-[19px] leading-[19.2px] text-gray-600 mb-6">
                  Our recruitment experts can help you find the perfect candidates for your specific industry needs. Contact us today to discuss your requirements.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                  Contact our team <FaChevronRight className="ml-2" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <FaUsers className="text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Skilled Workers</h4>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <FaBuilding className="text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Corporate Roles</h4>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <FaGlobe className="text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">International</h4>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <FaHandshake className="text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Executive</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;