import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Image as ImageIcon, Flag, Sparkles, LogOut, ShieldCheck, Compass } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const AdminSidebar = () => {
  const { user } = useSelector(state => state.auth);
  
  if (!user) return null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, color: 'text-red-400' },
    { label: 'User Management', path: '/admin/users', icon: Users, color: 'text-orange-400' },
    { label: 'Post Management', path: '/admin/posts', icon: ImageIcon, color: 'text-rose-400' },
    { label: 'Reports', path: '/admin/reports', icon: ShieldAlert, color: 'text-red-400' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-white/10 glass-card bg-[#0a0a0f]/95 shrink-0">
      <div className="p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2 group">
          <Sparkles className="text-red-500 w-8 h-8 group-hover:animate-pulse" />
          <h1 className="font-syne font-bold text-2xl bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent flex items-center gap-2">
            Visionex <span className="text-xs font-dmsans bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">Admin</span>
          </h1>
        </Link>
      </div>

      <nav className="flex-1 px-4 mt-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                ? 'bg-red-600/20 text-red-400 border-r-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-red-400' : 'group-hover:text-red-400'}`} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mb-4 mt-auto">
        <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 transition-all">
          <ShieldCheck className="w-5 h-5 text-red-400" />
          <span className="truncate">{user?.name || "Admin"}</span>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-red-400 cursor-pointer transition-all mt-1">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
