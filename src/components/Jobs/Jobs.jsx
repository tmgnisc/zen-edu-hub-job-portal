import React, { useState, useEffect } from 'react';


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
                <span>{job.number_of_people} Positions</span>
                <span>{job.job_type}</span>
                <span>${job.salary_range}/Year</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;