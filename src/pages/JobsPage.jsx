import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// Import Lucide Icons
import { MapPin, Briefcase } from 'lucide-react';
import Button from '../components/Button';

// Import the getJobs function from your apiService
import { getJobs } from '../api/apiService';

// Define a few background colors to cycle through for visual variety (Copied from HomePage.jsx)
const cardBackgroundColors = [
  'bg-green-100', // Similar to the first card in the image
  'bg-blue-100',  // Similar to the second and third cards
  'bg-purple-100',
  'bg-yellow-100',
];

// Utility function to strip HTML tags from a string
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  // State for filtering and search
  const [allActiveJobs, setAllActiveJobs] = useState([]); // Store all active/non-expired jobs
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Use the getJobs function from apiService
        const data = await getJobs();

        // Filter jobs: keep only active jobs with a deadline in the future or today
        const filteredJobs = data.filter(job => {
          const deadlineDate = new Date(job.deadline);
          const today = new Date();
          // Set time to midnight for accurate date comparison
          today.setHours(0, 0, 0, 0);
          
          return job.is_active && deadlineDate >= today;
        });

        // Store all active/non-expired jobs and set the initial jobs to display
        setAllActiveJobs(filteredJobs);
        setJobs(filteredJobs); // Initially display all active/non-expired jobs

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Effect to filter jobs based on search and filter criteria
  useEffect(() => {
    const filterJobs = () => {
      let filtered = allActiveJobs;

      // Filter by search term (case-insensitive)
      if (searchTerm) {
        filtered = filtered.filter(job =>
          job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.job_description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory !== 'All Categories') {
        filtered = filtered.filter(job => job.job_category.name === selectedCategory);
      }

      // Filter by location (assuming job.company.location contains the location string)
      if (selectedLocation !== 'All Locations') {
         filtered = filtered.filter(job => job.company.location.includes(selectedLocation));
      }

      setJobs(filtered);
      setPage(1); // Reset to the first page after filtering
    };

    filterJobs();

  }, [allActiveJobs, searchTerm, selectedCategory, selectedLocation]); // Rerun when filters or initial jobs change

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
        </div>
        {/* Job Openings List */}
        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {displayedJobs.map((job, index) => (
            <div 
              key={job.id} 
              className={`${cardBackgroundColors[index % cardBackgroundColors.length]} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-100 cursor-pointer`}
              onClick={() => handleJobClick(job.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-blue-600">{job.job_title}</h4>
                  <h5 className="font-semibold text-slate-900 text-sm flex items-center">{job.company.name} {/** Assuming there's a verified status in the API, add a checkmark icon */}{/* {job.company.is_verified && <CheckCircle className="w-4 h-4 ml-1 text-blue-500" />} */}</h5>
                </div>
                {/* Company Logo (Hidden for now) */}
                {/* 
                <img 
                  src={job.company.company_logo} 
                  alt={job.company.name} 
                  className="h-16 w-16 object-contain ml-4 rounded-md"
                />
                 */}
              </div>
              <p className="text-slate-600 mb-4 line-clamp-3 text-sm">{stripHtml(job.job_description)}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-4">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-blue-500"/>{job.company.location}</span>
                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-blue-500"/>{job.job_type === 'full_time' ? 'Full Time' : job.job_type === 'part_time' ? 'Part Time' : job.job_type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</span>
              </div>
               <div className="flex justify-between items-center mt-4">
                 <div>
                    <span className="text-xl font-bold text-gray-800 flex items-baseline">
                      {job.salary_range}
                       <span className="text-gray-600 text-sm ml-1">/mo</span>
                    </span>
                 </div>
                 <Button
                   onClick={(e) => {
                      e.stopPropagation();
                      handleJobClick(job.id);
                   }}
                   variant="secondary"
                   className="transition-colors duration-200 shadow-sm"
                 >
                   Apply Now
                 </Button>
               </div>
            </div>
          ))}
        </div>
        )}
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