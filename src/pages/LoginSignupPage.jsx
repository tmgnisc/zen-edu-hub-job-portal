import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
  const illustrationRef = useRef(null);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          email: login.email,
          isLoggedIn: true
        }));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          email: signup.email,
          isLoggedIn: true
        }));
        navigate('/');
      } else {
        setError(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('An error occurred during OTP verification');
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');

    try {
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
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('An error occurred while resending OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12">
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

            {tab === 'login' ? (
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
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02]">
                  Login
                </button>
              </form>
            ) : showOtpVerification ? (
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
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02]">
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="w-full text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Resend OTP
                </button>
              </form>
            ) : (
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
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02]">
                  Register
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