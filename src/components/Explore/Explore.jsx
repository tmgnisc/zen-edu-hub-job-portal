import React, { useEffect } from 'react';
import { FaPencilRuler, FaChartBar, FaBullhorn, FaWallet, FaCar, FaTruck, FaUserTie, FaBuilding } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: <FaPencilRuler className="text-4xl text-orange-500" />,
    bg: 'bg-orange-100',
    title: 'Design',
    jobs: '200+',
  },
  {
    icon: <FaChartBar className="text-4xl text-purple-500" />,
    bg: 'bg-purple-100',
    title: 'Sales',
    jobs: '350+',
  },
  {
    icon: <FaBullhorn className="text-4xl text-red-500" />,
    bg: 'bg-red-100',
    title: 'Marketing',
    jobs: '500+',
  },
  {
    icon: <FaWallet className="text-4xl text-yellow-500" />,
    bg: 'bg-yellow-100',
    title: 'Finance',
    jobs: '200+',
  },
  {
    icon: <FaCar className="text-4xl text-blue-500" />,
    bg: 'bg-blue-100',
    title: 'Automobile',
    jobs: '250+',
  },
  {
    icon: <FaTruck className="text-4xl text-green-500" />,
    bg: 'bg-green-100',
    title: 'Logistics / Delivery',
    jobs: '1k+',
  },
  {
    icon: <FaUserTie className="text-4xl text-indigo-500" />,
    bg: 'bg-indigo-100',
    title: 'Admin',
    jobs: '100+',
  },
  {
    icon: <FaBuilding className="text-4xl text-teal-500" />,
    bg: 'bg-teal-100',
    title: 'Construction',
    jobs: '500+',
  },
];

const Explore = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from(".section-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".explore-section",
          start: "top 80%",
        },
        clearProps: "all"
      });

      // Category cards animation
      gsap.from(".category-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".explore-section",
          start: "top 70%",
        },
        clearProps: "all"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="explore-section py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-4xl font-extrabold mb-4">
            <span className="text-blue-600">Countless Career Options</span> <span className="text-black">Are Waiting For<br />You To Explore</span>
          </h2>
          <p className="section-title text-gray-600 max-w-2xl mx-auto">
            Discover a World of Exciting Opportunities and Endless Possibilities, and<br />
            Find the Perfect Career Path to Shape Your Future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left"
            >
              <div className={`${category.bg} w-12 h-12 rounded-md flex items-center justify-center mb-6`}>
                {category.icon}
              </div>
              <h4 className="text-xl font-bold mb-2 text-black">{category.title}</h4>
              <p className="text-gray-600">{category.jobs} jobs openings</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Explore;