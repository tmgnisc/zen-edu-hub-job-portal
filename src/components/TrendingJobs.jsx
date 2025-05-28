import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, ChevronRight } from "lucide-react"; // Using Briefcase and DollarSign based on API data/previous cards
import { getJobs } from '../api/apiService';

// Utility function to strip HTML tags from a string
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// Define a few background colors to cycle through for visual variety
const cardBackgroundColors = [
  'bg-green-100', // Similar to the first card in the image
  'bg-blue-100',  // Similar to the second and third cards
  'bg-purple-100',
  'bg-yellow-100',
];

export default function TrendingJobs() {
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingJobs = async () => {
      try {
        const data = await getJobs();
        // Filter active jobs and take the first 4 for trending
        const activeJobs = data.filter(job => {
           const deadlineDate = new Date(job.deadline);
           const today = new Date();
           today.setHours(0, 0, 0, 0);
           return job.is_active && deadlineDate >= today;
        });
        setTrendingJobs(activeJobs.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingJobs();
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6 text-center">Loading trending jobs...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto p-6 text-center text-red-500">Error loading trending jobs: {error.message}</div>;
  }

  if (trendingJobs.length === 0) {
    return <div className="max-w-6xl mx-auto p-6 text-center text-gray-600 text-lg">No trending jobs available at the moment.</div>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Trending Jobs</h2>
          <Link to="/jobs" className="text-blue-600 hover:underline flex items-center font-medium">
            See All Jobs <ChevronRight className="ml-1 w-5 h-5"/>
          </Link>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingJobs.map((job, index) => (
            <div 
              key={job.id} 
              className={`${cardBackgroundColors[index % cardBackgroundColors.length]} rounded-2xl p-6 relative overflow-hidden cursor-pointer`}
              onClick={() => handleJobClick(job.id)}
            >
              {/* Company Logo, Job Title, Company Name */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.job_title}</h3>
                  <p className="text-gray-600 text-sm">{job.company.name}</p>
                </div>
                {job.company.company_logo && (
                   <img 
                     src={job.company.company_logo}
                     alt={job.company.name}
                     className="w-12 h-12 object-contain rounded-full ml-4"
                   />
                )}
              </div>

              {/* Job Description */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{stripHtml(job.job_description)}</p>

              {/* Location and Type */}
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{job.company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                   {/* Using Briefcase icon based on API data and previous card design */}
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <span>{job.job_type}</span>
                </div>
              </div>

              {/* Salary and Apply Button */}
              <div className="flex justify-between items-center">
                <div>
                   {/* Using DollarSign icon and salary_range from API */}
                  <span className="text-xl font-bold text-gray-800 flex items-center"><DollarSign className="w-5 h-5 mr-1"/>{job.salary_range}</span>
                  {/* Assuming salary_range from API might not always have /Month, adding it here */} 
                  <span className="text-gray-600 text-sm ml-1">/Month</span>
                </div>
                <button 
                  onClick={(e) => {
                     e.stopPropagation(); // Prevent card click from navigating
                     handleJobClick(job.id);
                  }}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded-full transition-colors duration-200 shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 