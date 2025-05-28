import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../../api/apiService';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';

// Utility function to strip HTML tags from a string
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();

        const filteredJobs = data.filter(job => {
          const deadlineDate = new Date(job.deadline);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          return job.is_active && deadlineDate >= today;
        });

        setJobs(filteredJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>Loading jobs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" id="job">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-primary">Latest & Top</span> Job Openings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover Exciting New Opportunities and High-Demand Positions Available
            Now in Top Industries and Companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-blue-100"
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-blue-600">{job.job_title}</h4>
                  <h5 className="font-semibold text-slate-900 text-sm flex items-center">{job.company.name} {/** Assuming there's a verified status in the API, add a checkmark icon */}{/* {job.company.is_verified && <CheckCircle className="w-4 h-4 ml-1 text-blue-500" />} */}</h5>
                </div>
                <img
                  src={job.company.company_logo}
                  alt={job.company.name}
                  className="h-16 w-16 object-contain ml-4 rounded-full"
                />
              </div>
              <p className="text-slate-600 mb-4 line-clamp-3 text-sm">{stripHtml(job.job_description)}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-4">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-blue-500"/>{job.company.location}</span>
                <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-blue-500"/>{job.job_type}</span>
              </div>
               <div className="flex items-center text-green-600 text-lg font-bold mb-6">
                   <DollarSign className="w-5 h-5 mr-1 text-green-600"/>{job.salary_range}
                   <span className="text-sm font-normal text-slate-600 ml-1">/Monthly</span>
                </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from navigating
                  navigate(`/jobs/${job.id}`);
                }}
                className="w-full text-center border border-blue-600 text-blue-600 bg-white py-2 px-4 rounded-md hover:bg-blue-700 hover:text-white transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;