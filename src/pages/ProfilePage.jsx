import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaFileUpload, FaEdit, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Preloader Component
const Preloader = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-gray-700 font-medium">Saving your profile...</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [existingResume, setExistingResume] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone_number: '',
    nationality: '',
    current_location: '',
    preferred_job_location: '',
    highest_qualification: '',
    years_of_experience: '',
  });

  // Fetch profile data from API
  const fetchProfile = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return;
  
    setLoading(true);
    try {
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          ...data,
        }));
        if (data.profile_picture) setProfileImage(data.profile_picture);
        if (data.resume) setExistingResume(data.resume);
      } else {
        console.error('Failed to fetch profile:', data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Prefill form fields from sessionStorage user object for instant display
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        full_name: user.full_name || '',
        phone_number: user.phone_number || '',
        nationality: user.nationality || '',
        current_location: user.current_location || '',
        preferred_job_location: user.preferred_job_location || '',
        highest_qualification: user.highest_qualification || '',
        years_of_experience: user.years_of_experience || '',
      }));
      if (user.profile_picture) setProfileImage(user.profile_picture);
    }
    // Always fetch latest data from API
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed for resume upload.");
        return;
      }
      setResumeFile(file);
    }
  };

  // Validation functions
  const validateForm = () => {
    const errors = {};
    
    if (!formData.full_name?.trim()) {
      errors.full_name = 'Full name is required';
    }
    
    if (!formData.phone_number?.trim()) {
      errors.phone_number = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number';
    }
    
    if (!formData.nationality?.trim()) {
      errors.nationality = 'Nationality is required';
    }
    
    if (!formData.current_location?.trim()) {
      errors.current_location = 'Current location is required';
    }
    
    if (!formData.preferred_job_location?.trim()) {
      errors.preferred_job_location = 'Preferred job location is required';
    }
    
    if (!formData.highest_qualification?.trim()) {
      errors.highest_qualification = 'Highest qualification is required';
    }
    
    if (!formData.years_of_experience) {
      errors.years_of_experience = 'Years of experience is required';
    }

    // Validate file sizes if files are selected
    if (profileImageFile && profileImageFile.size > 5 * 1024 * 1024) {
      errors.profileImage = 'Profile image must be less than 5MB';
    }

    if (resumeFile && resumeFile.size > 10 * 1024 * 1024) {
      errors.resume = 'Resume must be less than 10MB';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) return;

    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
  
    setLoading(true);
    setFormErrors({});
  
    const form = new FormData();
    form.append('full_name', formData.full_name);
    form.append('phone_number', formData.phone_number);
    form.append('nationality', formData.nationality);
    form.append('current_location', formData.current_location);
    form.append('preferred_job_location', formData.preferred_job_location);
    form.append('highest_qualification', formData.highest_qualification);
    form.append('years_of_experience', formData.years_of_experience);
    form.append('email', formData.email);
  
    if (profileImageFile) {
      form.append('profile_picture', profileImageFile);
    }
  
    if (resumeFile) {
      form.append('resume', resumeFile);
    }
  
    try {
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: form
      });
  
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response, likely HTML error page.', jsonError);
        const textResponse = await response.text();
        console.error('Raw response text:', textResponse);
        toast.error('Server returned an unexpected response.');
        setLoading(false);
        return;
      }
      
      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update the user data in sessionStorage
        const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        const updatedUser = {
          ...currentUser,
          ...data,
          profile_picture: data.profile_picture || currentUser.profile_picture
        };
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Dispatch profile update event
        window.dispatchEvent(new Event('profileUpdated'));
        
        toast.success('Profile updated successfully');
        setIsEditing(false);
        fetchProfile();
      } else {
        // Handle different types of errors
        if (response.status === 400) {
          // Handle validation errors
          if (data.errors) {
            const errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = Array.isArray(data.errors[key]) 
                ? data.errors[key][0] 
                : data.errors[key];
            });
            setFormErrors(errors);
            toast.error('Please fix the errors in the form');
          } else {
            toast.error(data.message || 'Invalid data provided');
          }
        } else if (response.status === 401) {
          toast.error('Your session has expired. Please login again.');
          navigate('/login');
        } else if (response.status === 413) {
          toast.error('File size too large. Please upload smaller files.');
        } else if (response.status === 415) {
          toast.error('Invalid file type. Please upload supported file formats.');
        } else if (response.status >= 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(data.message || 'Failed to update profile');
        }
      }
    } catch (err) {
      console.error('Update error:', err);
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const jobCategories = [
    'IT & Software',
    'Sales & Marketing',
    'Engineering',
    'Healthcare',
    'Customer Service',
    'Education',
    'Finance',
    'Construction',
    'Others'
  ];

  const experienceLevels = [
    'Fresher',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  // Update the input fields to show error messages
  const renderInputField = (name, label, type = 'text', icon) => (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={!isEditing}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
          formErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        required
      />
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  // Update the select fields to show error messages
  const renderSelectField = (name, label, options, icon) => (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={!isEditing}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
          formErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <ToastContainer position="top-right" autoClose={3000} />
      {loading && <Preloader />}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaUser className="text-6xl text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <FaEdit />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center space-x-2"
              >
                {isEditing ? (
                  <>
                    <FaSave />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <FaEdit />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {renderInputField('full_name', 'Full Name', 'text', <FaUser className="text-blue-600" />)}
                {renderInputField('email', 'Email', 'email', <FaEnvelope className="text-blue-600" />)}
                {renderInputField('phone_number', 'Phone Number', 'tel', <FaPhone className="text-blue-600" />)}
                {renderInputField('nationality', 'Nationality', 'text', <FaGlobe className="text-blue-600" />)}
                {renderInputField('current_location', 'Current Location', 'text', <FaMapMarkerAlt className="text-blue-600" />)}
                {renderInputField('preferred_job_location', 'Preferred Job Location', 'text', <FaMapMarkerAlt className="text-blue-600" />)}
                {renderSelectField('jobCategory', 'Job Category', jobCategories, <FaBriefcase className="text-blue-600" />)}
                {renderInputField('highest_qualification', 'Highest Qualification', 'text', <FaGraduationCap className="text-blue-600" />)}
                {renderSelectField('years_of_experience', 'Years of Experience', experienceLevels, <FaBriefcase className="text-blue-600" />)}

                {/* Resume Upload with error handling */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaFileUpload className="text-blue-600" />
                    <span>Resume</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    {existingResume ? (
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Current Resume:</span>
                        <a 
                          href={existingResume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          View Resume
                        </a>
                        <span className="text-gray-500">|</span>
                        <a 
                          href={existingResume} 
                          download
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          Download Resume
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500">No resume uploaded</span>
                    )}
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeChange}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          {existingResume ? 'Update Resume' : 'Upload Resume'}
                        </label>
                        {resumeFile && (
                          <span className="text-gray-500">
                            New file: {resumeFile.name}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  {formErrors.resume && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 