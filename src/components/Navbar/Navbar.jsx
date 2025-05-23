import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import zenLogo from '../../assets/final logo .png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  
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
<nav className={`${scrolled ? 'bg-white shadow-md' : isContactPage ? 'bg-blue-600' : 'bg-transparent shadow-none'} fixed w-full z-50 transition-all duration-300`}>

      <div className="container mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center pl-2">
            <Link to="/" className="flex items-center">
              <img 
                src={zenLogo} 
                alt="Zen Career Hub" 
                className="h-32 md:h-40 lg:h-44 w-auto object-contain"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isContactPage && !scrolled ? 'text-white' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>Home</Link>
            <Link to="/about" className={`${isContactPage && !scrolled ? 'text-white' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>About</Link>
            <Link to="/jobs" className={`${isContactPage && !scrolled ? 'text-white' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>Jobs</Link>
            <Link to="/contact" className={`${isContactPage && !scrolled ? 'text-white' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
  Contact
</Link>

           
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-600"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                  <span>{user.full_name || user.name || user.email}</span>
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
              <Link
  to="/login"
  className={`px-6 py-2 rounded-lg transition-colors text-center ${
    isContactPage && !scrolled
      ? 'bg-white text-blue-600 hover:bg-gray-100'
      : 'bg-blue-600 text-white hover:bg-blue-700'
  }`}
>
  Register
</Link>

            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={handleMenuClick}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={handleMenuClick}
            >
              About
            </Link>
            <Link 
              to="/jobs" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={handleMenuClick}
            >
              Jobs
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={handleMenuClick}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={handleMenuClick}
                >
                  Profile
                </Link>
                <Link 
                  to="/job-history" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={handleMenuClick}
                >
                  Job History
                </Link>
                <Link
                  to="/change-password"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={handleMenuClick}
                >
                  Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                onClick={handleMenuClick}
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;