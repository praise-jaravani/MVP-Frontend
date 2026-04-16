
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Monitor, Shield, FileText, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/formatters';

export default function Sidebar() {
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/endpoints', icon: Monitor, label: 'Endpoints' },
    { path: '/dashboard/threats', icon: Shield, label: 'Threats' },
    { path: '/dashboard/reports', icon: FileText, label: 'Reports' },
    { path: '/dashboard/pricing', icon: CreditCard, label: 'Pricing' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-navy-800 border-r border-gray-700/50 flex flex-col z-30">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="ShieldAI" className="h-8 w-8" />
          <span className="text-xl font-display font-bold text-white">ShieldAI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-navy-500 text-white'
                  : 'text-gray-400 hover:bg-navy-700 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-gray-700/50" />

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-navy-500 text-white'
                : 'text-gray-400 hover:bg-navy-700 hover:text-white'
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </nav>

      {/* User Section */}
      {user && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-shield-blue flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(user.firstName, user.lastName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
