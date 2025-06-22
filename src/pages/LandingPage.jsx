import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Button';
import { getJobs, getCategoriesWithCount } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, ChevronDown, Search, User, FileText, Building2, GraduationCap, Code2, LineChart, Rocket, Target, Megaphone, PenTool, DollarSign, Cog, Headphones, Users, Home, Wrench, Calendar, Star } from 'lucide-react';
import { FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import gsap from 'gsap';

// Utility to strip HTML tags
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// Utility function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Utility function to check if job is closed
function isJobClosed(job) {
  const deadlineDate = new Date(job.deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !job.is_active || deadlineDate < today;
}

const cardBackgroundColors = [
  'bg-green-100',
  'bg-blue-100',
  'bg-purple-100',
  'bg-yellow-100',
];

const categoriesData = [
  { name: 'Marketing', icon: Megaphone, bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { name: 'Design', icon: PenTool, bgColor: 'bg-green-50', textColor: 'text-green-700' },
  { name: 'Sales', icon: DollarSign, bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
  { name: 'Engineering', icon: Cog, bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
  { name: 'Customer Service', icon: Headphones, bgColor: 'bg-red-50', textColor: 'text-red-700' },
  { name: 'Human Resources', icon: Users, bgColor: 'bg-indigo-50', textColor: 'text-indigo-700' },
  { name: 'Real Estate', icon: Home, bgColor: 'bg-pink-50', textColor: 'text-pink-700' },
  { name: 'Construction', icon: Wrench, bgColor: 'bg-gray-50', textColor: 'text-gray-700' },
];

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const stepsRef = useRef([]);
  const teamRef = useRef([]);
  const categoriesRef = useRef(null);
  const trendingRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const fetchTrendingJobs = async () => {
      try {
        const data = await getJobs();
        const activeJobs = data.filter(job => {
          const deadlineDate = new Date(job.deadline);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return job.is_active && deadlineDate >= today;
        });
        setTrendingJobs(activeJobs.slice(0, 3));
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrendingJobs();
  }, []);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const data = await getJobs();
        const featured = data.filter(job => job.featured === true);
        setFeaturedJobs(featured.slice(0, 6)); // Show max 6 featured jobs
      } finally {
        setLoadingFeatured(false);
      }
    };
    fetchFeaturedJobs();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesWithCount();
        setCategories(data);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Hero animation - simplified without background animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
    }

    // Steps cards animation
    if (stepsRef.current) {
      gsap.fromTo(stepsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out', delay: 0.3 }
      );
    }
    // Team cards animation
    if (teamRef.current) {
      gsap.fromTo(teamRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out', delay: 0.3 }
      );
    }
    // Categories section animation
    if (categoriesRef.current) {
      gsap.fromTo(categoriesRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 });
    }
    // Featured jobs section animation
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.6 });
    }
    // Trending jobs section animation
    if (trendingRef.current) {
      gsap.fromTo(trendingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.7 });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (search.trim()) {
      queryParams.append('search', search.trim());
    }
    if (location.trim()) {
      queryParams.append('location', location.trim());
    }
    if (category) {
      queryParams.append('category', category);
    }
    navigate(`/jobs?${queryParams.toString()}`);
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      {/* Hero Section with Search */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center">
        {/* Simple background without animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6] via-white to-[#fdfaf6]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
            We find the best jobs for you
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Search your career opportunity through 12,800 jobs
          </p>
          <form onSubmit={handleSearch} className="bg-white rounded-full shadow-lg p-2.5 flex flex-col lg:flex-row items-center w-full mx-auto gap-2 lg:gap-0">
            <div className="flex items-center flex-1 pl-4 pr-2 w-full lg:w-auto">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Job title, keywords..."
                className="w-full focus:outline-none bg-transparent text-gray-700"
              />
            </div>
            
            <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

            <div className="relative flex items-center flex-1 px-4 w-full lg:w-auto">
              <MapPin className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="City or postcode"
                className="w-full focus:outline-none bg-transparent text-gray-700"
              />
              <ChevronDown className="text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

            <div className="relative flex items-center flex-1 px-4 w-full lg:w-auto">
              <Briefcase className="text-gray-400 mr-3" size={20} />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full focus:outline-none bg-transparent text-gray-700 appearance-none pr-4"
              >
                <option value="">All Categories</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
              </select>
              <ChevronDown className="text-gray-400 pointer-events-none absolute right-4" size={16} />
            </div>

            <Button type="submit" variant="primary" className="rounded-full !px-6 !py-3 !text-base w-full lg:w-auto">Find Jobs</Button>
          </form>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section ref={featuredRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="text-yellow-500 w-8 h-8 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Featured Jobs</h2>
              <Star className="text-yellow-500 w-8 h-8 ml-3" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked featured opportunities from top companies
            </p>
          </div>

          {loadingFeatured ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Loading featured jobs...</p>
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No featured jobs available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => {
                const isClosed = isJobClosed(job);
                return (
                  <div 
                    key={job.id} 
                    className={`${cardBackgroundColors[index % cardBackgroundColors.length]} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer relative ${isClosed ? 'opacity-75' : ''}`}
                    onClick={() => handleJobClick(job.id)}
                  >
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </div>

                    {/* Status Badge */}
                    {isClosed && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Closed
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{job.job_title}</h3>
                        <p className="font-semibold text-gray-700 text-sm mb-2">{job.company.name}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                          <span>{job.company.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{stripHtml(job.job_description)}</p>
                    
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1 text-blue-500" />
                        {job.job_schedule === 'full_time' ? 'Full Time' : 
                         job.job_schedule === 'part_time' ? 'Part Time' : 
                         job.job_schedule ? job.job_schedule.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : 'Not Specified'}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                        {formatDate(job.deadline)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-gray-800">
                          {job.salary_range}
                        </span>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isClosed) {
                            handleJobClick(job.id);
                          }
                        }}
                        variant={isClosed ? "disabled" : "secondary"}
                        className={`transition-colors duration-200 ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isClosed}
                      >
                        {isClosed ? 'Closed' : 'Apply Now'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {featuredJobs.length > 0 && (
            <div className="text-center mt-8">
              <Link to="/jobs">
                <Button variant="primary" className="px-8 py-3">
                  View All Jobs
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <h2 className="text-4xl font-extrabold text-center mb-4">
            Get Hired in <span className="text-[#283588]">4</span> <span className="text-[#6c3be4]">Quick Easy Steps</span>
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Follow Our Simple, Step-by-Step Guide to Quickly Land Your Dream Job and Start Your New Career Journey.
          </p>
          <div className="relative flex justify-center">
            {/* Dotted line background (SVG) */}
            <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-32 pointer-events-none" viewBox="0 0 1200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 80 Q300 0 600 80 T1200 80" stroke="#6c3be4" strokeWidth="6" strokeDasharray="16 16" fill="none" />
            </svg>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full relative z-10">
              {/* Step 1 */}
              <div ref={el => stepsRef.current[0] = el} className="bg-white rounded-2xl shadow-lg p-8 text-left flex flex-col items-start">
                <div className="bg-orange-100 text-orange-500 rounded-full p-3 mb-4">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create an Account</h3>
                <p className="text-gray-700">Sign up with just a few clicks to unlock exclusive access to a world of job opportunities and landing your dream job. It's quick, easy, and completely free.</p>
              </div>
              {/* Step 2 */}
              <div ref={el => stepsRef.current[1] = el} className="bg-white rounded-2xl shadow-lg p-8 text-left flex flex-col items-start">
                <div className="bg-purple-100 text-purple-500 rounded-full p-3 mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Search Job</h3>
                <p className="text-gray-700">Dive into our job database tailored to match your skills and preferences. With our advanced search filters, finding the perfect job has never been easier.</p>
              </div>
              {/* Step 3 */}
              <div ref={el => stepsRef.current[2] = el} className="bg-white rounded-2xl shadow-lg p-8 text-left flex flex-col items-start">
                <div className="bg-cyan-100 text-cyan-500 rounded-full p-3 mb-4">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload CV/Resume</h3>
                <p className="text-gray-700">Showcase your experience by uploading your CV or resume. Let employers know why you're the perfect candidate for their job openings.</p>
              </div>
              {/* Step 4 */}
              <div ref={el => stepsRef.current[3] = el} className="bg-white rounded-2xl shadow-lg p-8 text-left flex flex-col items-start">
                <div className="bg-yellow-100 text-yellow-500 rounded-full p-3 mb-4">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Get Job</h3>
                <p className="text-gray-700">Take the final step towards your new career. Get ready to embark on your professional journey and secure the job you've been dreaming of.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#283588] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-[28px] font-medium mb-2 leading-[33.6px]">Ready to Transform Your Hiring Process?</h2>
              <p className="text-base leading-relaxed text-blue-100 mb-10">
                Partner with ZEN Career Hub for all your recruitment and HR needs. Let us help you find the perfect
                talent for your organization.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link to="/contact">
                <Button to="/contact" variant="secondary">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-16 bg-[#f5f7fd]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#283588] mb-2">Browse by Category</h2>
            <p className="text-lg text-[#283588]">Explore job opportunities by category.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesData.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className={`${category.bgColor} rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                  <Icon className={`text-3xl ${category.textColor} mx-auto mb-3`} />
                  <h3 className={`text-lg font-semibold ${category.textColor}`}>{category.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
} 