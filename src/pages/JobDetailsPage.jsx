import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import API service functions
import { getJobDetails, applyForJob, getApplicationHistory } from '../api/apiService';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState('');
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationHistory, setApplicationHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const navigate = useNavigate();

  // Get applicant_id from sessionStorage user (if available)
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const applicant_id = user.id || user.applicant_id || '';

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Use getJobDetails function
        const data = await getJobDetails(id);
        setJob(data);
        // Log the job details to check requirements
        console.log('Fetched job details:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Fetch application history and check if user has applied for this job
  useEffect(() => {
    const fetchApplicationHistory = async () => {
      const token = sessionStorage.getItem('token');
      if (!token || !applicant_id || !job) {
        setHistoryLoading(false);
        return;
      }

      try {
        // Use getApplicationHistory function
        const data = await getApplicationHistory();

        setApplicationHistory(data);
        // Check if the current job ID exists in the user's application history
        const applied = data.some(app => app.job.id === job.id);
        setHasApplied(applied);
      } catch (error) {
        console.error('Error fetching application history:', error);
        // Optionally show a toast error for fetching history
      } finally {
        setHistoryLoading(false);
      }
    };

    // Fetch history only when job details and applicant_id are available
    if (job && applicant_id) {
      fetchApplicationHistory();
    }

  }, [job, applicant_id]); // Depend on job and applicant_id

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };
  const handleCoverLetterChange = (e) => {
    setCoverLetterFile(e.target.files[0]);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplyError('');
    setApplySuccess('');
    
    // Validate required files based on job requirements
    if (job.resume_required && !resumeFile) {
      setApplyError('Resume is required for this position.');
      return;
    }
    if (job.cover_letter_required && !coverLetterFile) {
      setApplyError('Cover letter is required for this position.');
      return;
    }

    // Log values before making the API call
    console.log('Applicant ID:', applicant_id);
    console.log('Auth Token:', sessionStorage.getItem('token')); // Log directly from sessionStorage to be sure
    console.log('Resume File:', resumeFile);
    console.log('Cover Letter File:', coverLetterFile);

    setApplyLoading(true);
    try {
      const formData = new FormData();
      if (job.resume_required) {
        formData.append('resume', resumeFile);
      }
      if (job.cover_letter_required) {
        formData.append('cover_letter', coverLetterFile);
      }
      formData.append('applicant_id', applicant_id);
      formData.append('job_id', job.id);

      // Use applyForJob function
      await applyForJob(job.id, formData);

      setApplySuccess('Application submitted successfully!');
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
      setHasApplied(true);
    } catch (err) {
      setApplyError('An error occurred while applying.');
      toast.error('An error occurred while applying.');
    } finally {
      setApplyLoading(false);
    }
  };

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
      <ToastContainer position="top-right" autoClose={3000} />
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
              <div><span className="font-semibold">Offered Salary:</span> AED {job.salary_range}/Month</div>
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
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: job.job_description }} />
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
            <button
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold ${hasApplied ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={() => {
                if (!applicant_id) {
                  navigate('/login');
                } else {
                  setShowApplyModal(true);
                }
              }}
              disabled={hasApplied}
            >
              {hasApplied ? 'Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowApplyModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Apply for {job.job_title}</h2>
            <form onSubmit={handleApplySubmit} className="space-y-4">
              {job.resume_required && (
                <div>
                  <label className="block font-medium mb-1">Resume (PDF only)</label>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleResumeChange} 
                    required={job.resume_required}
                    className="w-full" 
                  />
                </div>
              )}
              {job.cover_letter_required && (
                <div>
                  <label className="block font-medium mb-1">Cover Letter (PDF only)</label>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleCoverLetterChange} 
                    required={job.cover_letter_required}
                    className="w-full" 
                  />
                </div>
              )}
              {/* Hidden fields for applicant_id and job_id */}
              <input type="hidden" name="applicant_id" value={applicant_id} />
              <input type="hidden" name="job_id" value={job.id} />
              {applyError && <div className="text-red-600 text-sm">{applyError}</div>}
              {applySuccess && <div className="text-green-600 text-sm">{applySuccess}</div>}
              <button
                type="submit"
                disabled={applyLoading}
                className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold w-full flex items-center justify-center ${applyLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {applyLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage; 