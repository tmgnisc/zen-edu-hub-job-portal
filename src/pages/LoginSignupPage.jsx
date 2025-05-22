import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginIllustration from '../assets/login illustrator.avif';
import gsap from 'gsap';

const floatingIcons = [
  { icon: <FaUser className="text-blue-500 text-2xl" />, style: { top: '10%', left: '10%' } },
  { icon: <FaEnvelope className="text-yellow-500 text-xl" />, style: { top: '70%', left: '20%' } },
  { icon: <FaLock className="text-green-500 text-xl" />, style: { top: '20%', right: '12%' } },
];

const LoginSignupPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    role: 'job_seeker',
    job_category_id: '1'
  });
  const [otp, setOtp] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const illustrationRef = useRef(null);

  // State for Forgot Password flow
  const [forgotPasswordTab, setForgotPasswordTab] = useState(null); // null, 'request', 'verify_otp', 'set_password'
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    // Animate floating icons
    gsap.utils.toArray('.floating-login-icon').forEach((el, i) => {
      gsap.to(el, {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });
    });
    // Animate illustration
    if (illustrationRef.current) {
      gsap.fromTo(illustrationRef.current, { y: 0 }, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
      });
    }
  }, []);

  // Add validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
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
    if (!validatePassword(signup.password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
      return false;
    }
    if (signup.password !== signup.confirm_password) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!validateEmail(login.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login successful!');
        window.location.href = '/';
      } else {
        // Handle specific error cases
        if (data.message?.includes('Invalid credentials')) {
          setError('Invalid email or password');
        } else if (data.message?.includes('Email not verified')) {
          setError('Please verify your email before logging in');
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check your internet connection.');
      toast.error('Network error. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
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
      const response = await fetch('https://zenedu.everestwc.com/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signup)
      });

      const data = await response.json();

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
        } else if (data.message?.includes('password')) {
          setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
        } else {
          setError(data.message || 'Registration failed. Please try again.');
        }
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
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
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify({
          email: signup.email,
          isLoggedIn: true
        }));
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Illustration + Floating Icons */}
          <div className="relative flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-indigo-100/50 to-purple-100/50">
            <img ref={illustrationRef} src={loginIllustration} alt="Login Illustration" className="w-72 h-72 object-contain z-10" />
            {floatingIcons.map((item, idx) => (
              <span
                key={idx}
                className="floating-login-icon absolute z-20"
                style={item.style}
              >
                {item.icon}
              </span>
            ))}
          </div>
          {/* Form Section */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex mb-8">
              <button
                className={`flex-1 py-2 font-semibold text-lg transition-colors ${tab === 'login' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 font-semibold text-lg transition-colors ${tab === 'signup' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setTab('signup')}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-6 text-center">
                {success}
              </div>
            )}

            {/* Conditional rendering for Login, Signup, Forgot Password, or OTP Verification flow */}
            {tab === 'login' && forgotPasswordTab === null && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={login.email}
                      onChange={e => setLogin({ ...login, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={login.password}
                      onChange={e => setLogin({ ...login, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button 
                    type="button"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    onClick={() => setForgotPasswordTab('request')}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            )}

            {/* Forgot Password: Request Email */}
            {forgotPasswordTab === 'request' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setError('');
                setSuccess('');
                setIsLoading(true);
                try {
                  console.log('Sending forgot password request OTP with data:', { email: forgotPasswordEmail });
                  const response = await fetch('https://zenedu.everestwc.com/api/accounts/password/reset/request/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: forgotPasswordEmail })
                  });
                  const data = await response.json();
                  if (response.ok) {
                    setSuccess('OTP sent to your email. Please check your inbox.');
                    setForgotPasswordTab('verify_otp');
                    toast.success('OTP sent to your email. Please check your inbox.');
                  } else {
                    setError(data.message || 'Failed to send OTP request.');
                    toast.error(data.message || 'Failed to send OTP request.');
                  }
                } catch (err) {
                  setError('An error occurred while requesting OTP.');
                  toast.error('An error occurred while requesting OTP.');
                } finally {
                  setIsLoading(false);
                }
              }} className="space-y-6">
                 <p className="text-gray-600 text-center mb-4">Enter your email to receive an OTP for password reset.</p>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={forgotPasswordEmail}
                      onChange={e => setForgotPasswordEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                 <button 
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  onClick={() => setForgotPasswordTab(null)} // Option to go back to login
                >
                  Back to Login
                </button>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            )}

             {/* Forgot Password: Verify OTP */}
             {forgotPasswordTab === 'verify_otp' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setError('');
                setSuccess('');
                setIsLoading(true);
                 try {
                   console.log('Sending forgot password OTP verification with data:', { email: forgotPasswordEmail, otp: forgotPasswordOtp });
                  const response = await fetch('https://zenedu.everestwc.com/api/accounts/password/reset/verify/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: forgotPasswordEmail, otp: forgotPasswordOtp })
                  });
                  const data = await response.json();
                  if (response.ok) {
                    setSuccess('OTP verified. You can now set your new password.');
                    setForgotPasswordTab('set_password');
                     toast.success('OTP verified. Set your new password.');
                  } else {
                    setError(data.message || 'OTP verification failed.');
                    toast.error(data.message || 'OTP verification failed.');
                  }
                } catch (err) {
                  setError('An error occurred while verifying OTP.');
                  toast.error('An error occurred while verifying OTP.');
                } finally {
                  setIsLoading(false);
                }
              }} className="space-y-6">
                 <p className="text-gray-600 text-center mb-4">Enter the OTP sent to {forgotPasswordEmail}</p>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">OTP</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={forgotPasswordOtp}
                      onChange={e => setForgotPasswordOtp(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                 <button 
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  onClick={() => setForgotPasswordTab('request')} // Option to go back to request email
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </form>
             )}

             {/* Forgot Password: Set New Password */}
             {forgotPasswordTab === 'set_password' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setError('');
                setSuccess('');
                setIsLoading(true);

                if (newPassword !== confirmNewPassword) {
                  setError('Passwords do not match.');
                  setIsLoading(false);
                  toast.error('Passwords do not match.');
                  return;
                }

                 try {
                   console.log('Sending set new password request with data:', { email: forgotPasswordEmail, password: newPassword, confirm_password: confirmNewPassword, otp: forgotPasswordOtp });
                  const response = await fetch('https://zenedu.everestwc.com/api/accounts/password/reset/confirm/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: forgotPasswordEmail,
                      password: newPassword,
                      confirm_password: confirmNewPassword,
                      otp: forgotPasswordOtp,
                     })
                  });
                  const data = await response.json();
                  if (response.ok) {
                    setSuccess('Password reset successfully. Please login with your new password.');
                    setForgotPasswordTab(null); // Go back to login tab
                     toast.success('Password reset successfully.');
                  } else {
                    setError(data.message || 'Failed to reset password.');
                    toast.error(data.message || 'Failed to reset password.');
                  }
                } catch (err) {
                  setError('An error occurred while resetting password.');
                  toast.error('An error occurred while resetting password.');
                } finally {
                  setIsLoading(false);
                }
              }} className="space-y-6">
                 <p className="text-gray-600 text-center mb-4">Set your new password.</p>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                 <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={confirmNewPassword}
                      onChange={e => setConfirmNewPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  onClick={() => setForgotPasswordTab('verify_otp')} // Option to go back to verify OTP
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Setting Password...
                    </div>
                  ) : (
                    'Set New Password'
                  )}
                </button>
              </form>
             )}

            {tab === 'signup' && !showOtpVerification && (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={signup.username}
                      onChange={e => setSignup({ ...signup, username: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={signup.email}
                      onChange={e => setSignup({ ...signup, email: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={signup.password}
                      onChange={e => setSignup({ ...signup, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={signup.confirm_password}
                      onChange={e => setSignup({ ...signup, confirm_password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Registering...
                    </div>
                  ) : (
                    'Register'
                  )}
                </button>
              </form>
            )}

            {/* OTP Verification Form */}
            {tab === 'signup' && showOtpVerification && (
              <form onSubmit={handleOtpVerification} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Enter the OTP sent to your email"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage; 