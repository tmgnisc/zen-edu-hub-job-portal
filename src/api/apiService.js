import { API_BASE_URL } from './config';

// Helper function to get the auth token from session storage
const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API request failed with status ${response.status}`);
  }
  return response.json();
};

// Fetch all jobs
export const getJobs = async () => {
  const response = await fetch(`${API_BASE_URL}/jobs/`);
  return handleResponse(response);
};

// Fetch job details by ID
export const getJobDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}/`);
  return handleResponse(response);
};

// Apply for a job
export const applyForJob = async (jobId, formData) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication token not found.');
  }
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      // Note: Content-Type is typically not set manually for FormData
    },
    body: formData,
  });
  return handleResponse(response);
};

// Fetch job application history for the logged-in user
export const getApplicationHistory = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication token not found.');
  }
  const response = await fetch(`${API_BASE_URL}/applications/history/`, {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json', // Content-Type is needed for GET with auth
    },
  });
  return handleResponse(response);
};

// Fetch job categories with job counts
export const getCategoriesWithCount = async () => {
  const response = await fetch(`${API_BASE_URL}/job-categories/count/`);
  return handleResponse(response);
};
