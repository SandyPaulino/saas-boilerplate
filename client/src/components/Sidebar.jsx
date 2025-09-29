import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">SaaS Boilerplate</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
