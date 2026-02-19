import { FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Trips', path: '/trips', protected: true },
    { name: 'Expenses', path: '/expenses', protected: true },
    { name: 'AI', path: '/ai-recommendations', protected: true }, // Shortened from 'AI Recommendations'
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14"> {/* Reduced height from h-16 to h-14 */}
          {/* Logo - Already Small */}
          <Link to="/" className="flex items-center space-x-1.5">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center shadow-sm transform hover:rotate-6 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TripEase
            </span>
          </Link>

          {/* Desktop Navigation - Made smaller */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white hover:text-blue-200 transition-colors duration-300 font-medium text-sm"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons - Made smaller */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-white">
                  <FiUser className="text-blue-200 text-sm" />
                  <span className="text-sm">{user.firstName}</span>
                  <span className="text-xs text-blue-200">7095134631</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-red-300 transition-colors duration-300 text-sm"
                >
                  <FiLogOut className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 transition-colors duration-300 font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-900 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {/* You can add a mobile menu button here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;