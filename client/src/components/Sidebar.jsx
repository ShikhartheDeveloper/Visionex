import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, PlusSquare, User, Sparkles, Settings, LogOut, LayoutDashboard, Gamepad2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { resetProfile } from '../features/profile/profileSlice';

const Sidebar = () => {

  const { user, isSuccess } = useSelector(state => state.auth)
  
  if (!user) return null;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: user?.isAdmin ? LayoutDashboard : Home, label: user?.isAdmin ? "Dashboard" : 'Feed', path: user?.isAdmin ? "/admin/dashboard" : '/auth/feed' },
    { icon: Compass, label: 'Explore', path: '/auth/explore' },
    { icon: PlusSquare, label: 'Generate', path: '/auth/generate' },
    { icon: Gamepad2, label: 'Arcade', path: '/auth/arcade' },
    { icon: User, label: 'Profile', path: `/auth/profile/${user?.name}`, onClick: () => window.location.href = `/auth/profile/${user?.name}` },
  ];


  const handleLogout = async () => {
    await dispatch(logoutUser())
    dispatch(resetProfile())
    window.location.replace("/") // Hard redirect to clear all states and ensure Landing page is reached
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-white/10 glass-card bg-[#0a0a0f]/95 shrink-0 relative overflow-hidden group">
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"></div>
        <div className="scanline opacity-5"></div>
        
        <div className="p-6 relative z-10">
          <Link to={user?.isAdmin ? "/admin/dashboard" : "/auth/feed"} className="flex items-center gap-2 group">
            <Sparkles className="text-red-500 w-8 h-8 group-hover:animate-pulse group-hover:animate-glitch" />
            <h1 className="font-syne font-bold text-2xl bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent tracking-tighter">
              Visionex
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-6 flex flex-col gap-2 relative z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group/link ${isActive
                  ? 'bg-red-600/20 text-red-400 neon-pulse shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className={`w-5 h-5 transition-colors ${location.pathname === item.path ? 'text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'group-hover/link:text-red-400'}`} />
              <span className="font-medium tracking-tight uppercase text-xs">{item.label}</span>
              {location.pathname === item.path && (
                <>
                  <div className="absolute left-0 w-[2px] h-6 bg-red-500 rounded-r-full shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse" />
                  <div className="absolute right-3 w-1 h-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)] animate-ping" />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mb-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-red-400 cursor-pointer transition-all mt-1">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 w-full h-16 glass-card border-t border-white/10 bg-[#0a0a0f]/95 z-50 flex items-center justify-around px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-red-400' : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            <item.icon className={`w-6 h-6 ${item.label === 'Generate' ? 'text-orange-500' : ''}`} />
          </NavLink>
        ))}
        {/* Logout on Mobile */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
