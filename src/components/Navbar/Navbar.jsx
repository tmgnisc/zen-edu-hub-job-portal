import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import zenLogo from '../../assets/logo.png';
import Button from '../Button';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Check for user in localStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for profile updates
    const handleProfileUpdate = () => {
      const updatedUser = sessionStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
        console.log('Navbar: profileUpdated event received, user state updated.', JSON.parse(updatedUser));
      }
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
    setShowProfileMenu(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${scrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-none'} fixed w-full z-[1000] transition-all duration-300`}>
      <div className="container mx-auto">
        <div className="flex justify-between h-20 items-center px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={zenLogo}
                alt="Zen Career Hub"
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Centered Navigation Links (Hidden on mobile) */}
          <div className="flex-grow hidden lg:flex justify-center items-center space-x-6 xl:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:underline py-2 pb-0.5 leading-6 text-sm xl:text-base"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:underline py-2 pb-0.5 leading-6 text-sm xl:text-base"
            >
              About
            </Link>
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:underline py-2 pb-0.5 leading-6 text-sm xl:text-base"
            >
              Jobs
            </Link>
            <Link
              to="/clients"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:underline py-2 pb-0.5 leading-6 text-sm xl:text-base"
            >
              Our Clients
            </Link>
            <Link
              to="/team"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:underline py-2 pb-0.5 leading-6 text-sm xl:text-base"
            >
              Our Team
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors hover:underline py-2 pb-0.5 leading-6 text-sm xl:text-base"
            >
              Contact
            </Link>
          </div>

          {/* Right section: Action Button/Profile (Hidden on mobile) and Hamburger (only on mobile) */}
          <div className="flex items-center space-x-4">
            {/* Desktop Profile/Logout or Register button (hidden on mobile) */}
            {user ? (
              // Profile/Logout dropdown
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-600"
                      key={user.profile_picture}
                    />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                  <span className="text-sm xl:text-base">
                    {user.full_name || user.name || user.email}
                  </span>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/job-history"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Job History
                    </Link>
                    <Link
                      to="/change-password"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login and Register buttons
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                <Button
                  to="/login"
                  variant="secondary"
                  className="text-sm xl:text-base"
                >
                  Login
                </Button>
                <Button
                  to="/register"
                  variant="primary"
                  className="text-sm xl:text-base"
                >
                  Register
                </Button>
              </div>
            )}

            {/* Mobile menu toggle button (hidden on desktop) */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FaBars className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
              onClick={handleMenuClick}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
              onClick={handleMenuClick}
            >
              About
            </Link>
            <Link
              to="/jobs"
              className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
              onClick={handleMenuClick}
            >
              Jobs
            </Link>
            <Link
              to="/clients"
              className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
              onClick={handleMenuClick}
            >
              Our Clients
            </Link>
            <Link
              to="/team"
              className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
              onClick={handleMenuClick}
            >
              Our Team
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
              onClick={handleMenuClick}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
                  onClick={handleMenuClick}
                >
                  Profile
                </Link>
                <Link
                  to="/job-history"
                  className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
                  onClick={handleMenuClick}
                >
                  Job History
                </Link>
                <Link
                  to="/change-password"
                  className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
                  onClick={handleMenuClick}
                >
                  Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login and Register links inside mobile menu */}
                <Link
                  to="/login"
                  className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
                  onClick={handleMenuClick}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 pb-0.5 text-gray-700 hover:text-blue-600 transition-colors hover:underline leading-6"
                  onClick={handleMenuClick}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;