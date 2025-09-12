import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, User, Mail, Lock, Shield, ArrowLeft } from 'lucide-react'; // Import additional icons
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
      setError('Full Name is required');
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
        body: JSON.stringify({
          email: signup.email,
          username: signup.username,
          password: signup.password,
          confirm_password: signup.confirm_password
        })
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-blue-100">Join our community and start your journey</p>
        </div>

            {/* Form Content */}
            <div className="p-8">
        {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {success && showOtpVerification && (
                <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">{success}</span>
           </div>
         )}

        {!showOtpVerification ? (
          <form onSubmit={handleSignupSubmit} className="space-y-6">
                  {/* Full Name Field */}
            <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Full Name
                    </label>
              <input
                type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                value={signup.username}
                onChange={e => setSignup({ ...signup, username: e.target.value })}
                      placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>

                  {/* Email Field */}
            <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Email Address
                    </label>
              <input
                type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                value={signup.email}
                onChange={e => setSignup({ ...signup, email: e.target.value })}
                      placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
               {signup.email && !validateEmail(signup.email) && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        Please enter a valid email address
                      </p>
              )}
            </div>

                  {/* Password Field */}
            <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      Password
                    </label>
              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                  value={signup.password}
                  onChange={e => setSignup({ ...signup, password: e.target.value })}
                        placeholder="Create a strong password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                >
                  {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

                  {/* Confirm Password Field */}
            <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      Confirm Password
                    </label>
              <div className="relative">
                <input
                  type={showSignupConfirmPassword ? 'text' : 'password'}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                  value={signup.confirm_password}
                  onChange={e => setSignup({ ...signup, confirm_password: e.target.value })}
                        placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
                 <button
                   type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                   onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                 >
                   {showSignupConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
               {signup.confirm_password && signup.password !== signup.confirm_password && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        Passwords do not match
                      </p>
              )}
            </div>
        
                  {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
                    className="w-full py-3 text-base font-semibold flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <User className="h-5 w-5" />
                        Create Account
                      </>
              )}
            </Button>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleOtpVerification} className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600 text-sm">We've sent a verification code to {signup.email}</p>
                  </div>

            <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      Verification Code
                    </label>
                <input
                  type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 text-center text-lg font-mono"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                      placeholder="Enter 6-digit code"
                  required
                  disabled={isLoading}
                      maxLength={6}
                />
              </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3 text-base font-semibold flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="h-5 w-5" />
                          Verify Email
                        </>
                      )}
                    </Button>

              <Button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                variant="secondary"
                      className="w-full py-3 text-base font-medium"
              >
                      Resend Verification Code
              </Button>
            </div>
                </form>
              )}

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 