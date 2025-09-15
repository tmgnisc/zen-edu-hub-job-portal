import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  CheckCircle,
  Users,
  Briefcase,
  Award,
  ChevronRight,
  Star,
  DollarSign,
  Calendar,
  Clock,
  ChevronLeft,
} from 'lucide-react';

import team1 from '../assets/aashish.jpeg';
import team2 from '../assets/our team 2.jpeg';
import team3 from '../assets/roshan kc.jpg';
import team4 from '../assets/teammem.jpeg';

import { getJobs, getCategoriesWithCount } from '../api/apiService';
import GoogleMap from '../components/GoogleMap';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

// Replace Next.js Image with regular img tag
const Image = ({ src, alt, width, height, className, fill }) => {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

// Utility function to strip HTML tags from a string (copied from JobsPage.jsx)
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
    day: 'numeric',
  });
}

// Utility function to check if job is closed
function isJobClosed(job) {
  const deadlineDate = new Date(job.deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !job.is_active || deadlineDate < today;
}

export default function HomePage() {
  // Reinstate state and effect for trending jobs
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [errorTrending, setErrorTrending] = useState(null);
  // State for job categories
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const navigate = useNavigate();

  // Search functionality state
  const [allJobs, setAllJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchTrendingJobs = async () => {
      try {
        const data = await getJobs();
        setAllJobs(data); // Store all jobs for search functionality
        // Filter only active jobs and take the first 6 for carousel
        const activeJobs = data.filter(job => !isJobClosed(job));
        setTrendingJobs(activeJobs.slice(0, 6));
      } catch (err) {
        setErrorTrending(err.message);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingJobs();
  }, []);

  // Effect to fetch job categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesWithCount();
        // Remove the filter to show all categories
        setCategories(data);
      } catch (err) {
        setErrorCategories(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const nextJob = () => {
    setCurrentJobIndex((prevIndex) => 
      prevIndex === trendingJobs.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevJob = () => {
    setCurrentJobIndex((prevIndex) => 
      prevIndex === 0 ? trendingJobs.length - 3 : prevIndex - 1
    );
  };

  const getVisibleJobs = () => {
    if (trendingJobs.length <= 3) return trendingJobs;
    return trendingJobs.slice(currentJobIndex, currentJobIndex + 3);
  };

  // Search functionality
  const handleSearch = async ({ search, location, category }) => {
    setIsSearching(true);
    setSearchTerm({ search, location, category });
    
    try {
      // Filter jobs based on search criteria
      let filtered = [...allJobs];

      if (search && search.trim()) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(job =>
          job.job_title.toLowerCase().includes(searchLower) ||
          job.company.name.toLowerCase().includes(searchLower) ||
          job.job_description.toLowerCase().includes(searchLower) ||
          job.job_category.name.toLowerCase().includes(searchLower)
        );
      }

      if (location && location.trim()) {
        const locationLower = location.toLowerCase();
        filtered = filtered.filter(job =>
          job.company.location.toLowerCase().includes(locationLower)
        );
      }

      if (category && category.trim()) {
        filtered = filtered.filter(job =>
          job.job_category.name === category
        );
      }

      // Sort: active jobs first, then closed jobs
      filtered.sort((a, b) => {
        const aIsClosed = isJobClosed(a);
        const bIsClosed = isJobClosed(b);
        
        if (aIsClosed && !bIsClosed) return 1;
        if (!aIsClosed && bIsClosed) return -1;
        return 0;
      });

      setSearchResults(filtered);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchTerm(null);
    setShowSearchResults(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Search */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div>
                <h1 className="text-[40px] font-bold text-gray-900 leading-tight">
                  Empowering <span className="text-blue-600">Global Talent</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">Bridging Opportunities</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-lg">
                ZEN Career Hub is a premier human capital solutions provider headquartered in Dubai, connecting
                skilled professionals with global opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs">
                  <Button to="/jobs" variant="primary">Explore Jobs</Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1653669486884-48b9938fe446?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                  alt="ZEN Career Hub"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Job</h2>
            <p className="text-lg text-gray-600">Search through thousands of opportunities</p>
          </div>
          <SearchBar 
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searchResults={searchResults}
            isSearching={isSearching}
            searchTerm={searchTerm}
          />
        </div>
      </section>

      {/* Search Results */}
      {showSearchResults && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
            <SearchResults 
              jobs={searchResults}
              loading={isSearching}
              error={null}
            />
          </div>
        </section>
      )}

      {/* Featured Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">Featured Jobs</h2>
            <Link to="/jobs" className="text-blue-600 hover:underline flex items-center font-medium">
              See All Jobs <ChevronRight className="ml-1 w-5 h-5"/>
            </Link>
          </div>

          {loadingTrending && <p className="text-center">Loading featured jobs...</p>}
          {errorTrending && <p className="text-center text-red-500">Error loading featured jobs: {errorTrending}</p>}
          {!loadingTrending && !errorTrending && trendingJobs.length === 0 && (
            <p className="text-center text-gray-600 text-lg">No active jobs available at the moment.</p>
          )}
          {!loadingTrending && !errorTrending && trendingJobs.length > 0 && (
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <div className="flex gap-6 transition-transform duration-300 ease-in-out">
                  {getVisibleJobs().map((job) => (
                <div 
                  key={job.id} 
                      className="bg-white rounded-lg p-6 border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors min-w-[calc(33.333%-1rem)] flex-shrink-0 relative"
                  onClick={() => handleJobClick(job.id)}
                >
                  {/* New / Hot badges */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      {job.is_new_job && (
                        <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">Published {formatDate(job.created_at)}</div>
                  </div>
                  {/* Hot badge top-right mimic closed position in JobsPage not applicable here due to layout; keep inline above */}
                  {job.is_hot_job && (
                    <span className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Hot</span>
                  )}
                  {/* Job Title and Company */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.job_title}</h3>
                    <p className="text-gray-600 text-sm font-medium">{job.company.name}</p>
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{stripHtml(job.job_description)}</p>

                      {/* Job Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500"/>
                      <span>{job.company.location}</span>
                    </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2 text-blue-500"/>
                          <span>
                            {job.job_type === 'full_time' ? 'Full Time' : 
                             job.job_type === 'part_time' ? 'Part Time' : 
                             job.job_type ? job.job_type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : 'Not Specified'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-blue-500"/>
                          <span>Published: {formatDate(job.created_at)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500"/>
                          <span>Deadline: {formatDate(job.deadline)}</span>
                    </div>
                  </div>

                  {/* Salary and Apply Button */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                          <span className="text-lg font-bold text-gray-800">
                        {job.salary_range}
                          </span>
                         <span className="text-gray-600 text-sm ml-1">/mo</span>
                    </div>
                        <Button
                      onClick={(e) => {
                            e.stopPropagation();
                         handleJobClick(job.id);
                      }}
                          variant="secondary"
                          className="transition-colors duration-200"
                    >
                          Apply Now
                        </Button>
                      </div>
                  </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {trendingJobs.length > 3 && (
                <>
                  <button
                    onClick={prevJob}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextJob}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {trendingJobs.length > 3 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: Math.ceil(trendingJobs.length / 3) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentJobIndex(i * 3)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentJobIndex === i * 3 ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section with Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Image
                    src="https://images.unsplash.com/photo-1653669486775-75ddc200933c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
                    alt="Team"
                    width={600}
                    height={800}
                    className="rounded-lg h-80 object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1653669486789-72a1124a0a26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
                    alt="Team"
                    width={600}
                    height={800}
                    className="rounded-lg h-80 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1653669486803-72a1124a0a27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
                    alt="Team"
                    width={600}
                    height={800}
                    className="rounded-lg h-80 object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1653669486817-72a1124a0a28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
                    alt="Team"
                    width={600}
                    height={800}
                    className="rounded-lg h-80 object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">About ZEN Career Hub</h2>
                <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                <p className="text-[19px] leading-[19.2px] text-gray-900 mb-6">
                  We are a premier human capital solutions provider headquartered in Dubai, connecting skilled professionals with global opportunities.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our extensive network spans multiple countries, providing access to diverse talent pools and comprehensive HR solutions tailored to meet the unique needs of modern businesses and professionals.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Companies Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-gray-600">Successful Placements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Countries Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">Our Vision & Mission</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">V</span>
                </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-[19px] leading-[19.2px] text-gray-600 mb-4">
                  To be a globally recognized HR consultancy that empowers individuals and organizations through
                  innovative and ethical talent solutions.
                </p>
              <div className="mt-6">
                  <Image
                    src="https://images.unsplash.com/photo-1653669486884-48b9938fe446?w=800&auto=format&fit=crop&q=60"
                    alt="Vision Image"
                    width={800}
                    height={320}
                  className="rounded-lg w-full h-80 object-cover"
                  />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600">M</span>
                </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <ul className="space-y-4 text-gray-600 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-base leading-relaxed text-gray-900">
                      To provide seamless recruitment and immigration services that facilitate career growth and
                      organizational success.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-base leading-relaxed text-gray-900">
                      To uphold the highest standards of integrity, transparency, and professionalism in all our
                      engagements.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-base leading-relaxed text-gray-900">
                      To foster long-term partnerships by understanding and addressing the unique needs of our clients
                      and candidates.
                    </p>
                  </li>
                </ul>
              <div className="mt-6">
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60"
                    alt="Mission Image"
                    width={800}
                    height={320}
                  className="rounded-lg w-full h-80 object-cover"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">Job Categories</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-[19px] leading-[19.2px] text-gray-900 max-w-3xl mx-auto mb-10">
              Explore job opportunities by category.
            </p>
          </div>

          {loadingCategories && <p className="text-center">Loading categories...</p>}
          {errorCategories && <p className="text-center text-red-500">Error loading categories: {errorCategories}</p>}
          {!loadingCategories && !errorCategories && categories.length === 0 && (
            <p className="text-center text-gray-600 text-lg">No job categories available at the moment with active jobs.</p>
          )}
          {!loadingCategories && !errorCategories && categories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map(category => (
                <div key={category.id} className="bg-blue-50 rounded-lg p-6 text-center border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.job_count} Jobs Available</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">Our Services</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-[19px] leading-[19.2px] text-gray-900 max-w-3xl mx-auto mb-10">
              Comprehensive HR solutions tailored to meet the diverse needs of modern businesses and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Talent Acquisition</h3>
              <p className="text-base leading-relaxed text-gray-600">
                We connect employers with qualified candidates across various industries, ensuring a perfect fit for roles in the Gulf region and beyond.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Global Network</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our extensive network spans multiple countries, providing access to diverse talent pools and comprehensive HR solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Proven Results</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our track record of successful placements and satisfied clients speaks to our effectiveness and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium mb-2 leading-[33.6px] text-gray-900">Why Choose ZEN Career Hub?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Strategic Location</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Situated in Dubai, a global business hub, we are ideally positioned to serve a diverse clientele.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Global Network</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our partnership with Zen Edu Hub in Nepal and connections across South Asia expand our talent pool.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Customized Solutions</h3>
              <p className="text-base leading-relaxed text-gray-600">
                We tailor our services to meet the specific needs of each client, ensuring optimal outcomes.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Ethical Practices</h3>
              <p className="text-base leading-relaxed text-gray-600">
                We adhere to the highest ethical standards, ensuring transparency and integrity in all our operations.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Experienced Leadership</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our leadership team brings a wealth of experience and insight into the HR and recruitment industry.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Proven Results</h3>
              <p className="text-base leading-relaxed text-gray-600">
                Our track record of successful placements and satisfied clients speaks to our effectiveness and
                reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
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

      {/* Our Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">Our Team</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-[19px] leading-[19.2px] text-gray-900 max-w-3xl mx-auto mb-10">
              Meet the dedicated professionals behind ZEN Career Hub.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={team4} alt="Binod Timalsina" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Binod Timalsina</h3>
              <p className="text-blue-600 font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">Leading ZEN Career Hub with vision and expertise in international recruitment.</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={team2} alt="Aashish Timalsina" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aashish Timalsina</h3>
              <p className="text-blue-600 font-medium mb-2">Managing Director</p>
              <p className="text-gray-600 text-sm">Overseeing operations and strategic growth across all regions.</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={team3} alt="Roshan KC" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Roshan KC</h3>
              <p className="text-blue-600 font-medium mb-2">Operations Manager</p>
              <p className="text-gray-600 text-sm">Ensuring smooth operations and exceptional client service delivery.</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={team1} alt="Team Member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dedicated Team</h3>
              <p className="text-blue-600 font-medium mb-2">HR Professionals</p>
              <p className="text-gray-600 text-sm">Our experienced team of HR professionals committed to excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact and Map Section - Added */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Map Column */}
            <div>
              <GoogleMap />
            </div>
            {/* Contact Info Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-[28px] font-medium text-gray-900 mb-2 leading-[33.6px]">Get in Touch</h2>
                <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                <p className="text-[19px] leading-[19.2px] text-gray-900 mb-6">
                  Ready to start your journey with ZEN Career Hub? Contact us today.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+971-42807200</p>
                    <p className="text-gray-600">+971-526513813</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@zencareerhub.ae</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">Office 402, Sultan Building<br />Port Saeed, Deira, Dubai</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/contact">
                  <Button to="/contact" variant="primary" className="w-full md:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
} 