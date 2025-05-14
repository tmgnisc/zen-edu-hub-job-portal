import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://zenedu.everestwc.com/api/jobs/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="text-blue-600 hover:underline">
            &larr; Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={job.company.company_logo} 
              alt={job.company.name} 
              className="h-16 w-16 object-contain rounded" 
            />
            <div>
              <h2 className="text-2xl font-bold mb-1">{job.job_title}</h2>
              <p className="text-blue-600 font-semibold">{job.company.name}</p>
              <p className="text-gray-500 text-sm">{job.company.location}</p>
            </div>
          </div>

          {/* Company Description */}
          <p className="mb-4 text-gray-700">
            <span className="font-semibold">About {job.company.name}:</span> {job.company.description}
          </p>

          {/* Info Table */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Basic Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
              <div><span className="font-semibold">Job Category:</span> {job.job_category.name}</div>
              <div><span className="font-semibold">Job Type:</span> {job.job_type}</div>
              <div><span className="font-semibold">No. of Vacancies:</span> {job.number_of_people}</div>
              <div><span className="font-semibold">Employment Type:</span> {job.job_type}</div>
              <div><span className="font-semibold">Job Location:</span> {job.company.location}</div>
              <div><span className="font-semibold">Offered Salary:</span> ${job.salary_range}/Year</div>
              <div><span className="font-semibold">Apply Before:</span> {new Date(job.deadline).toLocaleDateString()}</div>
              <div><span className="font-semibold">Total Applications:</span> {job.applicant_count}</div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Requirements</h3>
            <div className="text-gray-700">
              <p><span className="font-semibold">Resume Required:</span> {job.resume_required ? 'Yes' : 'No'}</p>
              <p><span className="font-semibold">Cover Letter Required:</span> {job.cover_letter_required ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Screening Questions */}
          {job.screening_questions && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">Screening Questions</h3>
              <p className="text-gray-700">{job.screening_questions}</p>
            </div>
          )}

          {/* Job Description */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Job Description</h3>
            <p className="text-gray-700">{job.job_description}</p>
          </div>

          {/* Recruiter Information */}
          {job.recruiters && job.recruiters.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">Recruiter Information</h3>
              <div className="text-gray-700">
                <p><span className="font-semibold">Name:</span> {job.recruiters[0].full_name || 'Not provided'}</p>
                <p><span className="font-semibold">Email:</span> {job.recruiters[0].email}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Link to="/jobs" className="text-blue-600 hover:underline">&larr; Back to Jobs</Link>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage; 