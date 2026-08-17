import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Camera,
  Package,
  BookOpen,
  Image as ImageIcon,
  Quote,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { path: '/admin/categories', icon: Briefcase, label: 'Categories' },
    { path: '/admin/portfolios', icon: ImageIcon, label: 'Portfolio' },
    { label: 'Services', path: '/admin/services', icon: Camera },
    { label: 'Packages', path: '/admin/packages', icon: Package },
    { label: 'Stories', path: '/admin/stories', icon: BookOpen },
    { label: 'Testimonials', path: '/admin/testimonials', icon: Quote },
    { label: 'Site Config', path: '/admin/config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#181816] border-b border-stone-800 text-stone-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-amber-500" />
          <span className="font-serif font-bold text-amber-400">FOOTBEE ADMIN</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-[#181816] text-stone-200 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-stone-800/80 hidden md:flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold tracking-tight text-stone-100 text-sm">
                  FOOTBEE <span className="text-amber-500">STUDIO</span>
                </h2>
                <p className="text-[9px] font-mono tracking-widest text-stone-400 uppercase">
                  Management Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-stone-800 space-y-3 bg-[#141413]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-white text-xs font-mono transition"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-stone-200 truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] font-mono text-stone-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#FDFBF7] p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
