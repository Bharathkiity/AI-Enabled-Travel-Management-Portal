import { Link } from 'react-router-dom';
import { FiX, FiLogOut, FiUser } from 'react-icons/fi';

const MobileMenu = ({ isOpen, onClose, navLinks, user, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-primary-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-4">
          {user && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FiUser className="text-primary-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {user ? (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center space-x-2 w-full mt-6 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <div className="mt-6 space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
                onClick={onClose}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                onClick={onClose}
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;