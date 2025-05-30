import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-60 bg-gray-900 text-white p-4 flex flex-col space-y-4">
      <h1 className="text-xl font-bold mb-6">FAQ Bot Admin</h1>
      <Link to="/dashboard" className={`p-2 rounded ${isActive('/dashboard') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Dashboard</Link>
      <Link to="/faq" className={`p-2 rounded ${isActive('/faq') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Manage FAQs</Link>
      <Link to="/activity" className={`p-2 rounded ${isActive('/activity') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Activity</Link>
      <Link to="/suggested" className={`p-2 rounded ${isActive('/suggested') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Suggestions</Link>
      <Link to="/settings" className={`p-2 rounded ${isActive('/settings') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Settings</Link>
    </div>
  );
};

export default Sidebar;
