import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaFileUpload, FaEdit, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    nationality: '',
    currentLocation: '',
    preferredJobLocation: '',
    jobCategory: '',
    highestQualification: '',
    yearsOfExperience: '',
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setFormData(prevData => ({
        ...prevData,
        email: parsedData.email,
        fullName: parsedData.name || '',
      }));
    } else {
      navigate('/login');
    }
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
      setResumeFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data to localStorage
    const updatedUserData = {
      ...JSON.parse(localStorage.getItem('user')),
      ...formData,
      profileImage,
    };
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    setIsEditing(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
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
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaUser className="text-blue-600" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaEnvelope className="text-blue-600" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaPhone className="text-blue-600" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaGlobe className="text-blue-600" />
                    <span>Nationality</span>
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Current Location */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>Current Location</span>
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Preferred Job Location */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>Preferred Job Location</span>
                  </label>
                  <input
                    type="text"
                    name="preferredJobLocation"
                    value={formData.preferredJobLocation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Job Category */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaBriefcase className="text-blue-600" />
                    <span>Job Category</span>
                  </label>
                  <select
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  >
                    <option value="">Select Job Category</option>
                    {jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Highest Qualification */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaGraduationCap className="text-blue-600" />
                    <span>Highest Qualification</span>
                  </label>
                  <input
                    type="text"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                {/* Years of Experience */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaBriefcase className="text-blue-600" />
                    <span>Years of Experience</span>
                  </label>
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  >
                    <option value="">Select Experience</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-700 font-medium flex items-center space-x-2">
                    <FaFileUpload className="text-blue-600" />
                    <span>Upload Resume</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      disabled={!isEditing}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        !isEditing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Choose File
                    </label>
                    <span className="text-gray-500">
                      {resumeFile ? resumeFile.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Save Changes
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