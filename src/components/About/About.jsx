import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, Briefcase, Award, Users, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

const services = [
  {
    title: 'Overseas Hiring Solutions',
    image: 'https://images.unsplash.com/photo-1698047681452-08eba22d0c64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcnNlYXMlMjBoaXJpbmd8ZW58MHx8MHx8fDA%3D',
    description: 'We connect employers with qualified candidates across various industries, ensuring a perfect fit for roles in the Gulf region and beyond.'
  },
  {
    title: 'Local & International Placements',
    image: 'https://images.unsplash.com/photo-1565688527174-775059ac429c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3ZlcnNlYXMlMjBoaXJpbmd8ZW58MHx8MHx8fDA%3D',
    description: 'Our extensive network enables us to place professionals in positions that align with their skills and career aspirations, both within the UAE and internationally.'
  },
  {
    title: 'Immigration Services',
    image: 'https://images.unsplash.com/photo-1565688335719-d0297c355556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG92ZXJzZWFzJTIwaGlyaW5nfGVufDB8fDB8fDB',
    description: 'We offer comprehensive immigration support, including visa processing and legal compliance, to facilitate smooth transitions for expatriates.'
  },
  {
    title: 'Talent Acquisition & Executive Search',
    image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXhlY3V0aXZlJTIwc2VhcmNofGVufDB8fDB8fHww',
    description: 'Our dedicated team specializes in sourcing and placing top-tier executives and specialized professionals to drive organizational growth.'
  },
  {
    title: 'HR Consultancy Services',
    image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uc3VsdGFudHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'We provide strategic HR consulting, including policy development, performance management, and organizational structuring, to optimize workforce efficiency.'
  },
  {
    title: 'Training & Development',
    image: 'https://plus.unsplash.com/premium_photo-1705267936187-aceda1a6c1a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmclMjBhbmQlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Our tailored training programs enhance employee skills and performance, contributing to overall organizational success.'
  }
];

// Core values data
const coreValues = [
  {
    number: '01',
    title: 'Innovate and Improve',
    description: 'Innovation opens a window for creativity and high performance. We are committed to our continuous growth & development.'
  },
  {
    number: '02',
    title: 'Teamwork',
    description: 'We work as a team. We share knowledge, experience and leverage continuous improvement for learning.'
  },
  {
    number: '03',
    title: 'Transparency',
    description: 'We maintain total transparency with both recruiter and employee at the time of recruitment.'
  },
  {
    number: '04',
    title: 'Integrity',
    description: 'All individuals are accountable for the highest standards of ethical behaviour. We deliver recruitment services with honesty, transparency, equality and consistency.'
  },
  {
    number: '05',
    title: 'Positivity',
    description: 'We strive to have a positive attitude in all that we do.'
  },
  {
    number: '06',
    title: 'Lawful',
    description: 'We respect the international laws and the laws of each nation and do our business there adequately.'
  },
];

const About = () => {
  const cardsRef = useRef([]);
  const carouselRef = useRef(null);
  const [centerIndex, setCenterIndex] = React.useState(2); // Start with the 3rd image centered

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out', delay: 0.2 }
      );
    }
    // Only auto-scroll the normal image carousel
    if (carouselRef.current) {
      let pos = 0;
      const scroll = () => {
        if (!carouselRef.current) return;
        pos += 1;
        if (pos > carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          pos = 0;
        }
        carouselRef.current.scrollTo({ left: pos, behavior: 'smooth' });
        requestAnimationFrame(scroll);
      };
      scroll();
    }
    // Coverflow auto-scroll
    let current = 2;
    const total = 6;
    const interval = setInterval(() => {
      current = (current + 1) % total;
      setCenterIndex(current);
      // Set CSS vars for each card
      if (carouselRef.current) {
        Array.from(carouselRef.current.children).forEach((el, idx) => {
          el.style.setProperty('--i', idx);
          el.style.setProperty('--center', current);
        });
      }
    }, 2200);
    // Initial set
    if (carouselRef.current) {
      Array.from(carouselRef.current.children).forEach((el, idx) => {
        el.style.setProperty('--i', idx);
        el.style.setProperty('--center', current);
      });
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] mt-20 bg-[url('https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_960_720.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center px-4 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Empowering Global Talent, Bridging Opportunities
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow">
            Connecting skilled professionals with global opportunities and helping businesses build high-performing teams.
          </p>
          <Link to="/register">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Short Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 text-center">
          <p className="font-bold text-2xl md:text-3xl mb-6 text-blue-800">Zen Career Hub HR Consultancy is a dynamic entity under the Zen Group of Companies, based in Dubai with regional offices in Nepal and the UK.</p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We are a leading provider of international recruitment and workforce solutions, specializing in both blue- and white-collar placements across sectors including construction, security, cleaning, hospitality, retail, manufacturing, and warehousing. Our talent network spans Nepal, India, Bangladesh, the Philippines, and Sri Lanka, serving clients throughout the UAE and GCC.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-12">VISION</h2>
              <p className="text-lg text-blue-100">
                To be a globally recognized HR consultancy that empowers individuals and organizations through innovative and ethical talent solutions.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-12">MISSION</h2>
              <ul className="list-disc pl-5 space-y-3 text-lg text-blue-100">
                <li>To provide seamless recruitment and immigration services that facilitate career growth and organizational success.</li>
                <li>To uphold the highest standards of integrity, transparency, and professionalism in all our engagements.</li>
                <li>To foster long-term partnerships by understanding and addressing the unique needs of our clients and candidates.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ZEN Career Hub? Section */}
      <section className="py-20 bg-white text-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium mb-2 leading-[33.6px] text-blue-800">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Strategic Location</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Situated in Dubai, a global business hub, we are ideally positioned to serve a diverse clientele.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Global Network</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our extensive network spans multiple countries, providing access to diverse talent pools.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Comprehensive Services</h3>
              <p className="text-base leading-relaxed text-gray-600">
                From recruitment to immigration support, we offer end-to-end HR solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Proven Track Record</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Years of successful placements and satisfied clients demonstrate our reliability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Expert Team</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our experienced professionals understand the complexities of international recruitment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Quality Assurance</h3>
              <p className="text-base leading-relaxed text-gray-600">
                We maintain strict quality standards throughout our recruitment process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium mb-2 leading-[33.6px] text-blue-800">Our Services</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Comprehensive HR solutions tailored to meet the diverse needs of modern businesses and professionals.
            </p>
          </div>

          <div ref={carouselRef} className="overflow-x-hidden w-full">
            <div className="flex gap-8 min-w-[700px] md:min-w-[1100px] lg:min-w-[1400px] xl:min-w-[1800px]">
              {services.map((service, idx) => (
                <div
                  key={service.title}
                  ref={el => (cardsRef.current[idx] = el)}
                  className="flex-shrink-0 w-80 bg-blue-50 rounded-2xl shadow-lg p-6 group hover:shadow-2xl transition-all duration-300 relative"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6 h-48">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium mb-2 leading-[33.6px] text-blue-800">Our Core Values</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              The principles that guide our actions and define our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={value.number} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{value.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section: Based in the UAE */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-20 h-20 text-white"><circle cx="32" cy="32" r="31" stroke="white" strokeWidth="2" fill="none"/><path d="M32 44c6-7.5 12-15.5 12-20A12 12 0 1 0 20 24c0 4.5 6 12.5 12 20z" stroke="white" strokeWidth="2" fill="none"/><circle cx="32" cy="24" r="4" stroke="white" strokeWidth="2" fill="none"/></svg>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Based in the UAE</h2>
            <p className="text-lg text-blue-100">Our Head offices are in the United Arab Emirates with offices in various locations across the world.</p>
          </div>
        </div>
      </section>

      {/* Country Image Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Global Presence</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">We serve clients and candidates across the globe.</p>
          </div>
          <div className="relative w-full flex justify-center items-center overflow-x-hidden" style={{ perspective: '1200px', height: '380px' }}>
            <div ref={carouselRef} className="flex items-center w-full h-full justify-center">
              {[
                { src: 'https://www.nathanhr.com/_ipx/_/images/eor/kenya.webp'},
                { src: 'https://www.nathanhr.com/_ipx/_/images/eor/canada.webp'  },
                { src: 'https://www.nathanhr.com/_ipx/_/images/eor/usa.webp' },
                { src: 'https://www.nathanhr.com/_ipx/_/images/eor/egypt.webp',  },
                { src: 'https://www.nathanhr.com/_ipx/_/images/eor/uk.webp' },
                { src: 'https://www.nathanhr.com/_ipx/_/images/eor/uae.webp'  },
              ].map((country, idx) => (
                <div
                  key={country.label}
                  className="relative flex flex-col items-center justify-end mx-[-32px] transition-transform duration-700"
                  style={{
                    width: '300px',
                    height: '380px',
                    transform: `translateX(calc((var(--i,0) - var(--center,2)) * 180px)) scale(${idx === centerIndex ? 1 : 0.88}) rotateY(${idx === centerIndex ? 0 : (idx < centerIndex ? 15 : -15)}deg)`,
                    zIndex: idx === centerIndex ? 2 : 1,
                    boxShadow: idx === centerIndex ? '0 8px 32px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.10)'
                  }}
                  data-idx={idx}
                >
                  <div className="rounded-2xl overflow-hidden w-full h-full bg-white flex items-end">
                    <img
                      src={country.src}
                      alt={country.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-6 left-0 right-0 text-center text-white font-bold text-xl drop-shadow-lg bg-gradient-to-t from-black/60 to-transparent py-2">
                      {country.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;