import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaFileUpload, FaEdit, FaSave, FaVenusMars, FaRing, FaIdCard, FaLanguage, FaPassport, FaBuilding, FaHistory, FaClock, FaDollarSign, FaCertificate } from 'react-icons/fa';
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
    username: '',
    full_name: '',
    phone_number: '',
    nationality: '',
    current_location: '',
    preferred_job_location: '',
    highest_qualification: '',
    years_of_experience: '',
    expected_salary: '',
    currency: '',
    certificate: '',
    gender: '',
    marital_status: '',
    driving_license: '',
    languages: '',
    visa_status: '',
    passport_expiry_date: '',
    education_details: '',
    preferred_designation: '',
    past_employment_details: '',
    availability_to_join: '',
    linkedin_url: '',
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
      // Create a new object with all fields to avoid missing keys
      const allFields = {
        email: '', username: '', full_name: '', phone_number: '', nationality: '', current_location: '',
        preferred_job_location: '', highest_qualification: '', years_of_experience: '',
        expected_salary: '', currency: '', certificate: '', gender: '', marital_status: '',
        driving_license: '', languages: '', visa_status: '', passport_expiry_date: '',
        education_details: '', preferred_designation: '', past_employment_details: '',
        availability_to_join: '',
        linkedin_url: '',
        ...user // Spread user data to override defaults
      };
      setFormData(allFields);
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

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
  
    setLoading(true);
    setFormErrors({});
    
    // Debug: Log current form data structure
    console.log('Current form data:', formData);
  
    const form = new FormData();
    
    // Only append fields that have values and are not null/undefined
    Object.keys(formData).forEach(key => {
      let value = formData[key];
      
      // Skip null, undefined, or empty string values for most fields
      if (value === null || value === undefined || value === '') {
        return; // Skip this field entirely
      }
      
      // Skip fields that might not be expected by the API
      if (key === 'id' || key === 'user' || key === 'created_at' || key === 'updated_at') {
        return; // Skip these fields as they're managed by the server
      }
      
      // Handle passport_expiry_date: Only append if it's a valid date
      if (key === 'passport_expiry_date') {
        if (value && value !== '') {
          form.append(key, value);
        }
      } else if (key === 'years_of_experience') {
        // Handle years of experience - ensure it's a valid selection
        if (value && value !== '' && experienceLevels.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'gender') {
        // Handle gender - ensure it's a valid selection
        if (value && value !== '' && genderOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'marital_status') {
        // Handle marital status - ensure it's a valid selection
        if (value && value !== '' && maritalStatusOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'currency') {
        // Handle currency - ensure it's a valid selection
        if (value && value !== '' && currencyOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'availability_to_join') {
        // Handle availability - ensure it's a valid selection
        if (value && value !== '' && availabilityOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'driving_license') {
        // Handle driving license - ensure it's a valid selection
        if (value && value !== '' && drivingLicenseOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'highest_qualification') {
        // Handle highest qualification - ensure it's a valid selection
        if (value && value !== '' && highestQualificationOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key === 'visa_status') {
        // Handle visa status - ensure it's a valid selection
        if (value && value !== '' && visaStatusOptions.includes(value)) {
          form.append(key, value);
        }
      } else if (key !== 'profile_picture' && key !== 'resume') {
        // For all other text fields, only append if they have content
        if (value && value.toString().trim() !== '') {
          // Ensure we're sending a string, not an object or array
          const stringValue = typeof value === 'object' ? JSON.stringify(value) : value.toString().trim();
          form.append(key, stringValue);
        }
      }
    });
  
    // Handle file uploads
    if (profileImageFile) {
      form.append('profile_picture', profileImageFile);
    }
  
    if (resumeFile) {
      form.append('resume', resumeFile);
    }
  
    // Debug: Log what we're sending
    console.log('Form data being sent:');
    const formEntries = Array.from(form.entries());
    formEntries.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    
    // Debug: Log the current form data structure
    console.log('Current formData object:', formData);
    
    // Additional validation: Check if we have any data to send
    if (formEntries.length === 0) {
      toast.error('No data to update. Please fill in at least one field.');
      setLoading(false);
      return;
    }
    
    // Debug: Log the token to ensure it's valid
    console.log('Token being used:', token ? `${token.substring(0, 20)}...` : 'No token');
    
    // Check if token exists
    if (!token) {
      toast.error('No authentication token found. Please login again.');
      navigate('/login');
      return;
    }
    
    try {
      // First, test if the endpoint is accessible
      console.log('Testing API endpoint accessibility...');
      const testResponse = await fetch('https://zenedu.everestwc.com/api/accounts/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      
      console.log('Test response status:', testResponse.status);
      
      if (testResponse.status === 401) {
        toast.error('Authentication failed. Please login again.');
        navigate('/login');
        return;
      }
      
      // Now make the actual PATCH request
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: form
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
      let data;
      let textResponse = '';
      
      // Check if response is JSON or HTML
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
          console.log('Server response:', data);
      } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError);
          setLoading(false);
          return;
        }
      } else {
        // Response is HTML (likely error page)
        textResponse = await response.text();
        console.error('Raw response text:', textResponse);
        console.error('HTML Error Response (first 1000 chars):', textResponse.substring(0, 1000));
        
        // Try to extract more information from the error response
        if (textResponse.includes('500') || textResponse.includes('Internal Server Error')) {
          toast.error('Server error (500). Please check the console for details and try again later.');
        } else {
          toast.error('Server returned an unexpected response. Please try again.');
        }
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
        console.error('Profile update failed with status:', response.status);
        console.error('Error response:', data);
        
        if (response.status === 400) {
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
          console.error('Server error details:', data);
          toast.error(`Server error (${response.status}). Please try again later.`);
        } else {
          toast.error(data.message || `Failed to update profile (${response.status})`);
        }
      }
    } catch (err) {
      console.error('Update error:', err);
      console.error('Error stack:', err.stack);
      
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error(`An unexpected error occurred: ${err.message}`);
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
    '0-1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  const genderOptions = ['male', 'female', 'other'];
  const maritalStatusOptions = ['married', 'unmarried'];
  const currencyOptions = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY', 'AED', 'SAR'];
  const availabilityOptions = ['immediate', '1_week', '2_weeks', '1_month', '2_months', '3_months'];
  const drivingLicenseOptions = ['two_wheel', 'four_wheel', 'other', 'none'];
  const highestQualificationOptions = ['high_school', 'diploma', 'associate', 'bachelor', 'master', 'doctorate', 'professional_certification'];
  const visaStatusOptions = ['tourist_visa', 'student_visa', 'work_visa', 'business_visa', 'permanent_resident', 'spouse_dependent_visa', 'transit_visa', 'refugee_asylum_visa', 'diplomatic_visa', 'investor_visa', 'na'];
  
  // Custom labels for better user experience
  const availabilityLabels = {
    'immediate': 'Immediate',
    '1_week': '1 Week Notice',
    '2_weeks': '2 Weeks Notice',
    '1_month': '1 Month Notice',
    '2_months': '2 Months Notice',
    '3_months': '3 Months Notice'
  };
  
  const drivingLicenseLabels = {
    'two_wheel': 'Two-Wheeler',
    'four_wheel': 'Four-Wheeler',
    'other': 'Other',
    'none': 'None'
  };
  
  const highestQualificationLabels = {
    'high_school': 'High School',
    'diploma': 'Diploma',
    'associate': 'Associate Degree',
    'bachelor': 'Bachelor\'s Degree',
    'master': 'Master\'s Degree',
    'doctorate': 'Doctorate/PhD',
    'professional_certification': 'Professional Certification'
  };
  
  const visaStatusLabels = {
    'tourist_visa': 'Tourist Visa',
    'student_visa': 'Student Visa',
    'work_visa': 'Work Visa / Employment Visa',
    'business_visa': 'Business Visa',
    'permanent_resident': 'Permanent Resident (PR)',
    'spouse_dependent_visa': 'Spouse/Dependent Visa',
    'transit_visa': 'Transit Visa',
    'refugee_asylum_visa': 'Refugee/Asylum Visa',
    'diplomatic_visa': 'Diplomatic Visa',
    'investor_visa': 'Investor Visa / Startup Visa',
    'na': 'N/A'
  };

  const currencyLabels = {
    'USD': 'USD - US Dollar',
    'EUR': 'EUR - Euro',
    'GBP': 'GBP - British Pound',
    'INR': 'INR - Indian Rupee',
    'AUD': 'AUD - Australian Dollar',
    'CAD': 'CAD - Canadian Dollar',
    'JPY': 'JPY - Japanese Yen',
    'CNY': 'CNY - Chinese Yuan',
    'AED': 'AED - UAE Dirham',
    'SAR': 'SAR - Saudi Riyal'
  };

  const genderLabels = {
    'male': 'Male',
    'female': 'Female',
    'other': 'Other'
  };
  
  const maritalStatusLabels = {
    'married': 'Married',
    'unmarried': 'Unmarried'
  };

  // Update the input fields to show error messages
  const renderInputField = (name, label, type = 'text', icon, readOnly = false) => (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        disabled={!isEditing || readOnly}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-600 ${
          formErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        required={!readOnly && name !== 'certificate' && name !== 'driving_license'} // Make some fields optional
      />
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  // Update the select fields to show error messages
  const renderSelectField = (name, label, options, icon, customLabels = null) => (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </label>
      <select
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        disabled={!isEditing}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-600 ${
          formErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {customLabels && customLabels[option] ? customLabels[option] : option}
          </option>
        ))}
      </select>
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  // New helper for textareas
  const renderTextareaField = (name, label, icon) => (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        disabled={!isEditing}
        rows={3}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-600 ${
          formErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <ToastContainer position="top-right" autoClose={3000} />
      {loading && <Preloader />}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
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
          <div className="pt-20 pb-8 px-4 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaUser className="text-blue-600 mr-3" />
                  Personal Information
                </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {renderInputField('full_name', 'Full Name', 'text', <FaUser className="text-blue-600" />)}
                  {renderInputField('username', 'Username', 'text', <FaUser className="text-blue-600" />, true)}
                  {renderInputField('email', 'Email', 'email', <FaEnvelope className="text-blue-600" />, true)}
                {renderInputField('phone_number', 'Phone Number', 'tel', <FaPhone className="text-blue-600" />)}
                  {renderSelectField('gender', 'Gender', genderOptions, <FaVenusMars className="text-blue-600" />, genderLabels)}
                  {renderSelectField('marital_status', 'Marital Status', maritalStatusOptions, <FaRing className="text-blue-600" />, maritalStatusLabels)}
                </div>
              </div>

              {/* Location & Nationality Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-3" />
                  Location & Nationality
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                {renderInputField('nationality', 'Nationality', 'text', <FaGlobe className="text-blue-600" />)}
                {renderInputField('current_location', 'Current Location', 'text', <FaMapMarkerAlt className="text-blue-600" />)}
                {renderInputField('preferred_job_location', 'Preferred Job Location', 'text', <FaMapMarkerAlt className="text-blue-600" />)}
                  {renderInputField('linkedin_url', 'LinkedIn URL', 'url', <FaGlobe className="text-blue-600" />)}
                </div>
              </div>

              {/* Education & Experience Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaGraduationCap className="text-blue-600 mr-3" />
                  Education & Experience
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {renderSelectField('highest_qualification', 'Highest Qualification', highestQualificationOptions, <FaGraduationCap className="text-blue-600" />, highestQualificationLabels)}
                {renderSelectField('years_of_experience', 'Years of Experience', experienceLevels, <FaBriefcase className="text-blue-600" />)}
                  {renderInputField('certificate', 'Certificate', 'text', <FaCertificate className="text-blue-600" />)}
                  {renderInputField('preferred_designation', 'Preferred Designation', 'text', <FaBuilding className="text-blue-600" />)}
                </div>
                <div className="mt-6 space-y-4">
                  {renderTextareaField('education_details', 'Education Details', <FaGraduationCap className="text-blue-600" />)}
                  {renderTextareaField('past_employment_details', 'Past Employment Details', <FaHistory className="text-blue-600" />)}
                </div>
              </div>

              {/* Salary & Availability Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaDollarSign className="text-blue-600 mr-3" />
                  Salary & Availability
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="lg:w-2/3">
                      {renderInputField('expected_salary', 'Expected Salary', 'number', <FaDollarSign className="text-blue-600" />)}
                    </div>
                    <div className="lg:w-1/3">
                      {renderSelectField('currency', 'Currency', currencyOptions, <FaDollarSign className="text-blue-600" />, currencyLabels)}
                    </div>
                  </div>
                  {renderSelectField('availability_to_join', 'Availability to Join', availabilityOptions, <FaClock className="text-blue-600" />, availabilityLabels)}
                </div>
              </div>

              {/* Documents & Legal Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaPassport className="text-blue-600 mr-3" />
                  Documents & Legal
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {renderSelectField('driving_license', 'Driving License', drivingLicenseOptions, <FaIdCard className="text-blue-600" />, drivingLicenseLabels)}
                  {renderInputField('languages', 'Languages', 'text', <FaLanguage className="text-blue-600" />)}
                  {renderSelectField('visa_status', 'Visa Status', visaStatusOptions, <FaPassport className="text-blue-600" />, visaStatusLabels)}
                  {renderInputField('passport_expiry_date', 'Passport Expiry Date', 'date', <FaPassport className="text-blue-600" />)}
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaFileUpload className="text-blue-600 mr-3" />
                  Resume Upload
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                    {existingResume ? (
                      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
                        <span className="text-gray-700">Current Resume:</span>
                        <a 
                          href={existingResume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          View Resume
                        </a>
                        <span className="text-gray-500 hidden lg:inline">|</span>
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
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {formErrors.resume && (
                          <p className="text-red-500 text-sm">{formErrors.resume}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2 ${
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
