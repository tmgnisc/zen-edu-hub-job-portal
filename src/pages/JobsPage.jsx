import React, { useState, useEffect } from 'react';
import { FaSearch, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jobsData from '../utils/jobData.json';
import figmaLogo from '../assets/figma.png';
import googleLogo from '../assets/google.png';
import linkedinLogo from '../assets/linkedin.png';
import amazonLogo from '../assets/amazon.png';
import microsoftLogo from '../assets/microsoft.png';
import twitterLogo from '../assets/twitter.png';

const logoMap = {
  'figma.png': figmaLogo,
  'google.png': googleLogo,
  'linkedin.png': linkedinLogo,
  'amazon.png': amazonLogo,
  'microsoft.png': microsoftLogo,
  'twitter.png': twitterLogo
};

const getLogo = (logo) => {
  return logoMap[logo] || '';
};

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://zenedu.everestwc.com/api/jobs/');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const displayedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Job Openings</h1>
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 flex flex-wrap gap-4 items-center justify-between">
          <input type="text" placeholder="Search jobs, companies, or keywords" className="flex-1 px-4 py-2 border rounded-md focus:outline-none text-gray-800" />
          <select className="px-4 py-2 border rounded-md focus:outline-none text-gray-800">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
          <select className="px-4 py-2 border rounded-md focus:outline-none text-gray-800">
            <option>All Locations</option>
            <option>USA</option>
            <option>Germany</option>
            <option>UK</option>
            <option>Remote</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
        {/* Job Openings List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {displayedJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
              onClick={() => handleJobClick(job.id)}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={job.company.company_logo} 
                  alt={job.company.name} 
                  className="h-12 w-12 object-contain mr-4" 
                />
                <div>
                  <h5 className="font-semibold">{job.company.name}</h5>
                  <h6 className="text-gray-600">{job.company.location}</h6>
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-3">{job.job_title}</h4>
              <p className="text-gray-600 mb-4">{job.job_description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{job.number_of_people} Positions</span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">{job.job_type}</span>
                <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">${job.salary_range}/Year</span>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {jobs.length > jobsPerPage && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-md font-semibold border ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} transition-colors`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage; 