import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import { requestPasswordReset, verifyPasswordResetOtp, confirmPasswordReset } from '../api/apiService';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Verify OTP, 3: Set New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+$/;
    return emailRegex.test(email);
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      await requestPasswordReset(email);
      toast.success('OTP sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to request password reset.');
      toast.error(err.message || 'Failed to request password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await verifyPasswordResetOtp(email, otp);
      toast.success('OTP verified successfully.');
      setStep(3);
    } catch (err) {
      setError(err.message || 'Failed to verify OTP.');
      toast.error(err.message || 'Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    // Basic password strength check (optional)
    if (newPassword.length < 8) { // Example: minimum 8 characters
        setError('Password must be at least 8 characters long.');
        setIsLoading(false);
        return;
    }

    try {
      await confirmPasswordReset(email, otp, newPassword, confirmPassword);
      toast.success('Password reset successfully. You can now log in.');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
      toast.error(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h1>
          <p className="text-gray-600">
            {step === 1 && 'Enter your email address to receive an OTP.'}
            {step === 2 && 'Enter the OTP sent to your email.'}
            {step === 3 && 'Set your new password.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestReset} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              {email && !validateEmail(email) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center"
              disabled={isLoading || !email || !validateEmail(email)}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center"
              disabled={isLoading || !otp}
            >
              {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleConfirmReset} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center"
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          Remember your password? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 