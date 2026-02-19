import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiBarChart2, 
  FiMap, 
  FiDollarSign, 
  FiCpu,
  FiLogOut 
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: FiBarChart2 },
    { path: '/trips', name: 'Trips', icon: FiMap },
    { path: '/expenses', name: 'Expenses', icon: FiDollarSign },
    { path: '/ai-recommendations', name: 'AI Recommendations', icon: FiCpu },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <FiHome size={20} />
          <span>Home</span>
        </NavLink>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;