import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import zenLogo from '../../assets/Zen Logo Main Blue 0.png';

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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <nav className={`${scrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-none'} fixed w-full z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={zenLogo} 
                alt="Zen Career Hub" 
                className="h-16 w-auto"
              />
              <span className="text-2xl font-bold text-gray-800">
                Zen <span className="text-blue-600">Career Hub</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">Jobs</Link>
            <a href="#service" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#client" className="text-gray-700 hover:text-blue-600 transition-colors">Client</a>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FaUserCircle className="text-2xl" />
                  <span>{user.name}</span>
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
              <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/jobs" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Jobs</Link>
            <a href="#service" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#client" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Client</a>
            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block">
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