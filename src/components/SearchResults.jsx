import React from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Clock, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const SearchResults = ({ jobs, loading, error }) => {
  const navigate = useNavigate();

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApplyClick = (e, jobId, isClosed) => {
    e.stopPropagation();
    if (isClosed) {
      return;
    }
    // Navigate to job details page for application
    navigate(`/jobs/${jobId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading jobs: {error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or browse all available jobs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => {
        const isClosed = isJobClosed(job);
        const description = stripHtml(job.job_description);
        const shortDescription = description.length > 150 
          ? description.substring(0, 150) + '...' 
          : description;

        return (
          <div
            key={job.id}
            className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${
              isClosed ? 'border-gray-300 opacity-75' : 'border-blue-500'
            }`}
            onClick={() => handleJobClick(job.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {job.job_title}
                    </h3>
                    {isClosed && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        Closed
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-blue-600 font-medium mb-2">
                    {job.company.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{job.company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      <span>{job.job_category.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Published {formatDate(job.created_at)}</span>
                    </div>
                    {job.deadline && (
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Deadline: {formatDate(job.deadline)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {job.is_new_job && (
                      <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        New
                      </span>
                    )}
                    {job.is_hot_job && (
                      <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Hot
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleApplyClick(e, job.id, isClosed)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      isClosed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isClosed ? 'Closed' : 'Apply Now'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobClick(job.id);
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {shortDescription}
              </p>

              {/* Job Requirements/Highlights */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{job.requirements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Salary Information */}
              {job.salary && (
                <div className="flex items-center gap-1 text-green-600 font-medium">
                  <DollarSign size={16} />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;

