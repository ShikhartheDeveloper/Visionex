import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Wand2, Users, Image as ImageIcon } from 'lucide-react';
import { useEffect } from 'react';

const Landing = () => {

  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()


  useEffect(() => {
    // if (user) {
    //   navigate("/feed")
    // }
  }, [user])


  return (
    <div className="w-full h-full bg-[#0a0a0f] overflow-y-auto flex flex-col relative">

      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob shadow-[0_0_100px_rgba(239,68,68,0.2)]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 shadow-[0_0_100px_rgba(249,115,22,0.2)]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-rose-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000 shadow-[0_0_100px_rgba(225,29,72,0.2)]"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-red-500/30 blur-[2px] animate-float`}
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 w-full p-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="text-red-500 w-8 h-8" />
          <span className="font-syne font-bold text-2xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Visionex
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Log In</Link>
          <Link to="/register" className="px-6 py-2 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-transform">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full pt-10 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-red-500/30 text-red-300 mb-8 max-w-full overflow-hidden">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="text-xs md:text-sm font-medium truncate">Think and Create Community</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-syne font-extrabold text-white mb-6 leading-[1.1]">
          Render <br className="md:hidden" />
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Your Vision.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium">
          Type a thought. Watch it become art. Let the world react.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-red-600/25 flex items-center justify-center gap-2">
            Dream out loud <Wand2 className="w-5 h-5" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
            Explore Feed
          </Link>
        </div>
      </main>

      {/* Features */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center mb-6 border border-red-500/20">
                <Wand2 className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">Generate Instantly</h3>
              <p className="text-gray-400 leading-relaxed">You think in words. We dream in pixels.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-600/20 flex items-center justify-center mb-6 border border-orange-500/20">
                <Users className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">Vibrant Community</h3>
              <p className="text-gray-400 leading-relaxed">Find creators who inspire you. Become the one who inspires others.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-rose-600/20 flex items-center justify-center mb-6 border border-rose-500/20">
                <ImageIcon className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">Curate Collections</h3>
              <p className="text-gray-400 leading-relaxed">Public for the world. Private for your soul. Always yours.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;
