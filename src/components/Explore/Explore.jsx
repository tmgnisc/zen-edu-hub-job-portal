import React, { useEffect, useState } from 'react';
import { FaPencilRuler, FaChartBar, FaBullhorn, FaWallet, FaCar, FaTruck, FaUserTie, FaBuilding, FaBriefcase } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCategoriesWithCount } from '../../api/apiService';

gsap.registerPlugin(ScrollTrigger);

// Array of available icon and style combinations
const categoryStyles = [
  { icon: <FaPencilRuler className="text-4xl text-orange-500" />, bg: 'bg-orange-100' },
  { icon: <FaChartBar className="text-4xl text-purple-500" />, bg: 'bg-purple-100' },
  { icon: <FaBullhorn className="text-4xl text-red-500" />, bg: 'bg-red-100' },
  { icon: <FaWallet className="text-4xl text-yellow-500" />, bg: 'bg-yellow-100' },
  { icon: <FaCar className="text-4xl text-blue-500" />, bg: 'bg-blue-100' },
  { icon: <FaTruck className="text-4xl text-green-500" />, bg: 'bg-green-100' },
  { icon: <FaUserTie className="text-4xl text-indigo-500" />, bg: 'bg-indigo-100' },
  { icon: <FaBuilding className="text-4xl text-teal-500" />, bg: 'bg-teal-500' },
  { icon: <FaBriefcase className="text-4xl text-gray-500" />, bg: 'bg-gray-100' }, // Add default/fallback icon to the list
];

const Explore = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesWithCount();

        // Take the first 8 categories and map API data to the structure needed for rendering
        const mappedCategories = data.slice(0, 8).map((category, index) => {
           // Calculate index for random style assignment (loop through styles if more than available)
           const styleIndex = index % categoryStyles.length;
           const randomStyle = categoryStyles[styleIndex];

          return {
            ...category, // Include id and name from API
            title: category.name, // Use name as title
            jobs: `${category.job_count}+`, // Format job count
            // Assign icon and background randomly from the available styles
            icon: randomStyle.icon,
            bg: randomStyle.bg,
          };
        });

        setCategories(mappedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

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

        {loading && (
          <div className="text-center">
            <p>Loading categories...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            <p>Error fetching categories: {error}</p>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
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
        )}

        {/* Display message if no categories are found after loading */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No job categories found.</p>
          </div>
        )}

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