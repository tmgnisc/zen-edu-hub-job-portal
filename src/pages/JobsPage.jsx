import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Calendar, Clock, Flame, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { getJobs } from '../api/apiService';

// Remove the background colors array - we'll use consistent white cards

// Utility function to strip HTML tags from a string
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

const JobsPage = ({ isComponent = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const jobsPerPage = isComponent ? 4 : 6; // Show fewer jobs if used as a component
  const navigate = useNavigate();

  // State for filtering and search
  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState('All Jobs');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setAllJobs(data);
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filterJobs = () => {
      let filtered = [...allJobs]; // Create a copy to avoid mutating original

      if (searchTerm) {
        filtered = filtered.filter(job =>
          job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.job_description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory !== 'All Categories') {
        filtered = filtered.filter(job => job.job_category.name === selectedCategory);
      }

      if (selectedLocation !== 'All Locations') {
        filtered = filtered.filter(job => job.company.location.includes(selectedLocation));
      }

      if (selectedStatus !== 'All Jobs') {
        if (selectedStatus === 'Active Jobs') {
          filtered = filtered.filter(job => !isJobClosed(job));
        } else if (selectedStatus === 'Closed Jobs') {
          filtered = filtered.filter(job => isJobClosed(job));
        }
      }

      // Always sort: active jobs first, then closed jobs
      filtered.sort((a, b) => {
        const aIsClosed = isJobClosed(a);
        const bIsClosed = isJobClosed(b);
        
        if (aIsClosed && !bIsClosed) return 1; // b (active) comes first
        if (!aIsClosed && bIsClosed) return -1; // a (active) comes first
        return 0; // both have same status, maintain original order
      });

      setJobs(filtered);
      setPage(1); // Reset to first page when filters change
    };

    filterJobs();
  }, [allJobs, searchTerm, selectedCategory, selectedLocation, selectedStatus]);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  // Apply pagination after sorting to ensure correct order
  const displayedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApplyClick = (e, jobId, isClosed) => {
    e.stopPropagation();
    if (!isClosed) {
      handleJobClick(jobId);
    }
  };

  if (loading) {
    return (
      <div className={`${isComponent ? 'py-16 bg-gray-50' : 'min-h-screen bg-gray-50 pt-24 pb-12'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center">
            <p>Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${isComponent ? 'py-16 bg-gray-50' : 'min-h-screen bg-gray-50 pt-24 pb-12'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isComponent ? 'py-16 bg-gray-50' : 'min-h-screen bg-gray-50 pt-24 pb-12'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
        {!isComponent && (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Job Openings</h1>
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-10 flex flex-wrap gap-4 items-center justify-between w-full">
              <input 
                type="text" 
                placeholder="Search jobs, companies, or keywords" 
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="px-4 py-2 border rounded-md focus:outline-none text-gray-800"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
              <select 
                className="px-4 py-2 border rounded-md focus:outline-none text-gray-800"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option>All Locations</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="UK">UK</option>
                <option value="Remote">Remote</option>
              </select>
              <select 
                className="px-4 py-2 border rounded-md focus:outline-none text-gray-800"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All Jobs</option>
                <option value="Active Jobs">Active Jobs</option>
                <option value="Closed Jobs">Closed Jobs</option>
              </select>
            </div>
          </>
        )}

        {isComponent && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-primary">Latest & Top</span> Job Openings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover Exciting New Opportunities and High-Demand Positions Available
              Now in Top Industries and Companies
            </p>
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
            {displayedJobs.map((job, index) => {
              const isClosed = isJobClosed(job);
              return (
                <div 
                  key={job.id} 
                  className="bg-white rounded-lg p-6 border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors shadow-sm hover:shadow-md relative"
                  onClick={() => handleJobClick(job.id)}
                >
                  {/* Status / Hot Badge (top-right) */}
                  {isClosed ? (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Closed
                    </div>
                  ) : (
                    job.is_hot_job && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Hot
                      </div>
                    )
                  )}
                  {/* New badge (top-left) */}
                  {!isClosed && job.is_new_job && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> New
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.job_title}</h3>
                    <p className="text-gray-600 text-sm font-medium">{job.company.name}</p>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{stripHtml(job.job_description)}</p>
                  
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
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        {job.salary_range}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">/mo</span>
                    </div>
                    <Button
                      onClick={(e) => handleApplyClick(e, job.id, isClosed)}
                      variant={isClosed ? "disabled" : "secondary"}
                      className="transition-colors duration-200"
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

        {/* Pagination - Only show if not used as a component */}
        {!isComponent && jobs.length > jobsPerPage && (
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