import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApplicationHistory } from '../api/apiService';
import Button from '../components/Button';

const JobHistoryPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobHistory();
  }, []);

  const fetchJobHistory = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const data = await getApplicationHistory();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching job history:', error);
      toast.error('An error occurred while fetching job history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <FaCheckCircle className="text-green-600" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-600" />;
      case 'pending':
        return <FaSpinner className="text-yellow-600 animate-spin" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Application History</h1>
          <p className="text-gray-600">Track all your job applications and their current status</p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
            <p className="mt-2 text-gray-500">Start applying for jobs to see your history here.</p>
            <div className="mt-6">
              <Button
                onClick={() => navigate('/jobs')}
                variant="primary"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {application.job.job_title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(application.status)}
                            <span>{application.status}</span>
                          </span>
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center">
                          <FaBuilding className="mr-2" />
                          <span>{application.job.company.name}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{application.job.company.location}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2" />
                          <span>Applied on {new Date(application.applied_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate(`/jobs/${application.job.id}`)}
                      variant="ghost"
                      className="ml-4 text-sm font-medium"
                    >
                      View Job
                    </Button>
                  </div>
                  
                  {application.status === 'pending' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-700">
                        Your application is being reviewed. We'll notify you once there's an update.
                      </p>
                    </div>
                  )}
                  
                  {application.status === 'accepted' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md">
                      <p className="text-sm text-green-700">
                        Congratulations! Your application has been accepted. The company will contact you soon.
                      </p>
                    </div>
                  )}
                  
                  {application.status === 'rejected' && (
                    <div className="mt-4 p-4 bg-red-50 rounded-md">
                      <p className="text-sm text-red-700">
                        Unfortunately, your application was not selected for this position. Keep applying!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHistoryPage; 