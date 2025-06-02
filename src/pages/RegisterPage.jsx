import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react'; // Import eye icons
import Button from '../components/Button'; // Import the reusable Button component

const RegisterPage = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    role: 'job_seeker',
    job_category_id: '1' // Assuming a default category
  });
  const [otp, setOtp] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State for password
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    // Simplified email regex: requires @ symbol with characters before and after
    const emailRegex = /^\S+@\S+$/;
    return emailRegex.test(email);
  };

  // Re-enable password validation with special characters allowed (or adjust as needed)
  const validatePassword = (password) => {
    // Temporarily disable password validation
    return true;
  };

  const validateSignupForm = () => {
    if (!signup.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!validateEmail(signup.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (signup.password !== signup.confirm_password) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!validateSignupForm()) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('Registration payload:', signup); // Log the payload
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signup)
      });

      const data = await response.json();
      console.log('Registration response:', data); // Log the response

      if (response.ok) {
        setSuccess('Registration successful! Please enter the OTP sent to your email.');
        setShowOtpVerification(true);
        toast.success('Registration successful! Please check your email for OTP.');
      } else {
        // Handle specific error cases
        if (data.message?.includes('email already exists')) {
          setError('This email is already registered. Please use a different email or try logging in.');
        } else if (data.message?.includes('username already exists')) {
          setError('This username is already taken. Please choose a different username.');
        } else {
          setError(data.message || 'Registration failed. Please try again.');
        }
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err); // Log any errors
      setError('Network error. Please check your internet connection.');
      toast.error('Network error. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!otp.trim()) {
      setError('Please enter the OTP');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signup.email,
          otp: otp
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        sessionStorage.setItem('token', data.token);
        
        // Store complete user data including id and role
        const userData = {
          ...data.user,
          email: signup.email,
          isLoggedIn: true,
          id: data.user.id || data.user.applicant_id, // Ensure we have the correct ID
          role: signup.role // Store the role from signup
        };
        sessionStorage.setItem('user', JSON.stringify(userData));
        
        toast.success('OTP verification successful!');
        window.location.href = '/';
      } else {
        if (data.message?.includes('Invalid OTP')) {
          setError('Invalid OTP. Please check and try again.');
        } else if (data.message?.includes('OTP expired')) {
          setError('OTP has expired. Please request a new one.');
        } else {
          setError(data.message || 'OTP verification failed');
        }
        toast.error(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('Network error. Please check your internet connection.');
      toast.error('Network error. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      console.log('Sending resend OTP request with data:', { email: signup.email });
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/resend-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signup.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP has been resent to your email');
        toast.success('OTP has been resent to your email');
      } else {
        setError(data.message || 'Failed to resend OTP');
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('An error occurred while resending OTP');
      toast.error('An error occurred while resending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          {/* Replace with your logo or app name */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {success && showOtpVerification && (
           <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-4 text-center">
             {success}
           </div>
         )}

        {!showOtpVerification ? (
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={signup.username}
                onChange={e => setSignup({ ...signup, username: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={signup.email}
                onChange={e => setSignup({ ...signup, email: e.target.value })}
                required
                disabled={isLoading}
              />
               {signup.email && !validateEmail(signup.email) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={signup.password}
                  onChange={e => setSignup({ ...signup, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                >
                  {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showSignupConfirmPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={signup.confirm_password}
                  onChange={e => setSignup({ ...signup, confirm_password: e.target.value })}
                  required
                  disabled={isLoading}
                />
                 <button
                   type="button"
                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                   onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                 >
                   {showSignupConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
               {signup.confirm_password && signup.password !== signup.confirm_password && (
                 <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
              )}
            </div>
        
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sign up
                </span>
              ) : (
                'Sign up'
              )}
            </Button>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleOtpVerification} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Enter the OTP sent to your email"
                />
              </div>
            </div>
            <div className="text-right">
              <Button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                variant="secondary"
                className="w-full flex items-center justify-center mt-4"
              >
                Resend OTP
              </Button>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verify OTP
                </span>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 