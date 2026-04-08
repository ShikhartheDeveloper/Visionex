import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { loginUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }




  const handleLogin = (e) => {
    e.preventDefault();

    // Register User
    dispatch(loginUser(formData))
  };


  useEffect(() => {
    if (user && isSuccess) {
      if (user.isAdmin) {
        navigate("/admin/dashboard")
      } else {
        navigate("/auth/feed")
      }
    }

    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }

  }, [user, isError, message])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="h-full w-full bg-[#0a0a0f] overflow-y-auto relative flex flex-col items-center py-20 px-4">
      {/* Cyber Grid & Background elements */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none"></div>
      <div className="scanline opacity-10"></div>
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] animate-blob"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

      <div className="glass-card border border-white/10 p-8 md:p-10 rounded-3xl w-full max-w-md relative z-10 shadow-2xl shadow-black my-auto group">
        <div className="hud-bracket-tl opacity-50"></div>
        <div className="hud-bracket-br opacity-50"></div>
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="text-red-500 w-8 h-8 group-hover:animate-pulse" />
            <span className="font-syne font-bold text-2xl text-white tracking-wide">Visionex</span>
          </Link>
        </div>

        <h2 className="text-2xl text-white font-bold text-center mb-2">Welcome back</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Please enter your details to sign in.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              name='email'
              value={email}
              onChange={handleChange}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-red-400 hover:text-red-300 transition-colors">Forgot password?</a>
            </div>
            <input
              name='password'
              value={password}
              onChange={handleChange}
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-red-600/25"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Don't have an account? <Link to="/register" className="text-red-400 hover:text-red-300 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
