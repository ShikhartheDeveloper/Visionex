import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Wand2, Users, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import HeroImage from '../assets/hero-ai.png';
import CityImage from '../assets/city-ai.png';
import { MOCK_POSTS } from '../mockData';
import DetailModal from '../components/DetailModal';

const Landing = () => {

  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()


  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '', icon: null });

  const openModal = (title, content, icon) => {
    setModalData({ isOpen: true, title, content, icon });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };


  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin/dashboard")
      } else {
        navigate("/auth/feed")
      }
    }
  }, [user])


  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] flex flex-col relative selection:bg-red-500/30">
      
      {/* 2057 Overlay Elements */}
      <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] border-transparent">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
        <div className="absolute top-0 left-0 w-[1px] h-full bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
        <div className="absolute top-0 right-0 w-[1px] h-full bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
      </div>

      {/* Cyber Grid & Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="scanline opacity-20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob shadow-[0_0_100px_rgba(239,68,68,0.1)]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000 shadow-[0_0_100px_rgba(225,29,72,0.1)]"></div>
        
        {/* Floating Digital Dust */}
        <div className="absolute inset-0 z-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-sm bg-red-500/20 blur-[1px] animate-float`}
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
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
      <main className="flex-1 relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full pt-20 pb-20 gap-16">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-red-500/30 text-red-300 mb-8 max-w-full overflow-hidden">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="text-xs md:text-sm font-medium truncate">Think and Create Community</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-syne font-extrabold text-white mb-6 leading-[1.1] relative tracking-tighter">
            <span className="relative inline-block hover:animate-glitch cursor-default transition-all duration-300">
              Render
            </span>
            <br className="" />
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent block mt-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">Your Vision.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed font-medium">
            Type a thought. Watch it become art. Let the world react. Join the most advanced AI generation collective.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-red-600/25 flex items-center justify-center gap-2">
              Dream out loud <Wand2 className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
              Explore Feed
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex-1 relative perspective-1000 hidden lg:block">
          <div className="glass-image-container animate-float-parallax animate-glow-pulse group">
            <img 
              src={HeroImage} 
              alt="AI Dreamscape" 
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-110 translate-y-4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <div className="text-[10px] font-mono text-red-400 mb-1 tracking-[0.2em] uppercase">Status: Synthetic</div>
              <h3 className="text-lg font-syne font-bold text-white uppercase tracking-wider">Cybernetic Muse v2.5</h3>
            </div>
          </div>
          
          {/* Decorative HUD Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-red-500/20 rounded-full animate-ping opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-red-600/5 rounded-full blur-3xl"></div>
        </div>
      </main>

      {/* Visual Reality Showcase */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-syne font-bold text-white mb-6 uppercase tracking-tighter">
                Neural <span className="text-red-500">Architecture</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium">
                Our models process billions of parameters to synthesize high-fidelity visuals from your simple thoughts within milliseconds.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-4xl font-syne font-extrabold text-white/10 uppercase tracking-widest leading-none">Intelligence<br />Collective</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="glass-image-container rounded-3xl group overflow-hidden brightness-90 hover:brightness-100 transition-all duration-700">
                <img 
                  src={CityImage} 
                  alt="Futuristic City" 
                  className="w-full h-[500px] object-cover transition-transform duration-[20s] linear-infinite group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="hud-bracket-tl m-6"></div>
                <div className="hud-bracket-br m-6 border-red-500"></div>
             </div>

             <div className="space-y-12">
                {[
                  { title: "Quantum Resolution", desc: "Native 8K generation with hyper-realistic texture synthesis.", value: "98.4%" },
                  { title: "Neural Latency", desc: "Sub-second processing time for complex multi-subject prompts.", value: "0.4s" },
                  { title: "Diffusion Core", desc: "Proprietary model architecture optimized for 2057 aesthetics.", value: "v4.0" }
                ].map((stat, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-500/20 group-hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-xl font-syne font-bold text-white uppercase tracking-wide">{stat.title}</h4>
                       <span className="text-red-500 font-mono font-bold text-lg">{stat.value}</span>
                    </div>
                    <p className="text-gray-500 group-hover:text-gray-400 transition-colors">{stat.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>


      {/* Features */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/5 py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={HeroImage} alt="" className="w-full h-full object-cover blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Wand2, 
                title: "Generate Instantly", 
                desc: "You think in words. We dream in pixels.",
                color: "red",
                detail: "Our proprietary neural engine processes your natural language prompts through billions of parameters to synthesize high-fidelity visual assets in under a second. Optimized for 2057 aesthetics and deep textures."
              },
              { 
                icon: Users, 
                title: "Vibrant Community", 
                desc: "Find creators who inspire you. Become the one who inspires others.",
                color: "orange",
                detail: "Connect with the Global Intelligence Collective. Remix existing visions, follow technical architects, and build your reputation within the most advanced AI art ecosystem in existence."
              },
              { 
                icon: ImageIcon, 
                title: "Curate Collections", 
                desc: "Public for the world. Private for your soul. Always yours.",
                color: "rose",
                detail: "Every piece of art you generate is stored in your personal, encrypted vault. Organize your creations into public showcases or private archives with full control over your digital legacy."
              }
            ].map((feature, i) => (
              <button 
                key={i}
                onClick={() => openModal(feature.title, feature.detail, feature.icon)}
                className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group relative text-left cursor-pointer overflow-hidden text-white"
              >
                <div className="hud-bracket-tl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="hud-bracket-br opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-600/20 flex items-center justify-center mb-6 border border-${feature.color}-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-syne font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium mb-4">{feature.desc}</p>
                <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   [ Click to View Protocol ]
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Synthetics - Marquee Showcase */}
      <section className="relative z-10 py-24 mb-20 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-red-600/5 blur-3xl opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
           <div>
              <div className="text-[10px] font-mono text-red-500 mb-2 tracking-[0.3em] uppercase">Real-time Generation</div>
              <h2 className="text-3xl font-syne font-bold text-white uppercase tracking-tight">Trending Synthetics</h2>
           </div>
           <Link to="/login" className="text-xs font-mono text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest">
             /view-live-stream
           </Link>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee gap-6 py-4">
            {[...MOCK_POSTS, ...MOCK_POSTS].slice(0, 16).map((post, idx) => (
              <div key={idx} className="w-[300px] h-[400px] shrink-0 glass-image-container group">
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-xs font-medium line-clamp-2 mb-2 italic">"{post.prompt}"</p>
                    <div className="flex items-center gap-2">
                      <img src={post.creator.avatar} className="w-5 h-5 rounded-full border border-white/10" alt="" />
                      <span className="text-[10px] text-gray-400 font-mono">@{post.creator.username}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System OS Interface / Protocol */}
      <section className="relative z-10 py-32 bg-[#0d0d12]/50">
        <div className="absolute inset-0 opacity-10 pointer-events-none grayscale brightness-50">
          <img src={CityImage} alt="" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-6 rounded-2xl border-red-500/20 neon-border-glow">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                       <span className="text-[10px] font-mono text-white tracking-widest">SYSTEM STATUS: NOMINAL</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">2057.04.11</span>
                 </div>
                 <div className="space-y-3">
                    <div className="terminal-line"><span>> UPLINK ESTABLISHED</span><span className="text-green-500">INIT</span></div>
                    <div className="terminal-line"><span>> NEURAL CORE ACTIVE</span><span className="text-green-500">ONLINE</span></div>
                    <div className="terminal-line"><span>> DIFFUSION SYNC</span><span className="text-yellow-500">STABLE</span></div>
                    <div className="terminal-line"><span>> PROTOCOL v2.5.0</span><span className="text-red-500">SECURE</span></div>
                 </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-red-600/20 to-transparent rounded-3xl border border-white/5">
                 <h3 className="text-2xl font-syne font-bold text-white mb-4">Join the Collective.</h3>
                 <p className="text-gray-400 text-sm mb-6 leading-relaxed">Become part of the most exclusive AI art community in the sector. Your vision defines the protocol.</p>
                 <Link to="/register" className="text-red-400 font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                    Initiate protocol // [REG]
                 </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: Sparkles, title: "Synthesis", text: "Convert complex thoughts into multi-dimensional visual assets instantly." },
                    { icon: Users, title: "Neural Link", text: "Connect with architects across the globe and remix their visions." },
                    { icon: Wand2, title: "Iteration", text: "Refine and evolve your creations with advanced AI upscaling tools." },
                    { icon: ImageIcon, title: "Archiving", text: "Secure your high-resolution synthetics in your personal encrypted vault." }
                  ].map((f, i) => (
                    <div key={i} className="glass-card p-10 rounded-3xl border-white/5 group hover:border-red-500/30 transition-all">
                       <f.icon className="w-10 h-10 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
                       <h4 className="text-xl font-syne font-bold text-white mb-4 uppercase tracking-wider">{f.title}</h4>
                       <p className="text-gray-500 leading-relaxed text-sm">{f.text}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="text-red-500 w-8 h-8" />
                <span className="font-syne font-bold text-2xl text-white tracking-tighter">
                  Visionex
                </span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed text-sm italic font-medium">
                The future is not televised. It is synthetically rendered. Build the visual vocabulary of the next generation.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-syne font-bold mb-6 uppercase text-xs tracking-widest">Sector</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/auth/feed" className="hover:text-red-400 transition-colors">Neural Feed</Link></li>
                <li><Link to="/auth/explore" className="hover:text-red-400 transition-colors">Global Explore</Link></li>
                <li><button onClick={() => openModal('Synthesis Lab', 'Access the core synthesis engine where neurons meet pixels. Current version 2.5 supports multi-modal generation and temporal synthesis.', Wand2)} className="hover:text-red-400 transition-colors cursor-pointer text-left">Synthesis Lab</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-syne font-bold mb-6 uppercase text-xs tracking-widest">Core</h5>
              <ul className="space-y-4 text-sm text-gray-500 text-left">
                <li><button onClick={() => openModal('Security Protocol', 'All generation data is encrypted via end-to-end neural sharding. Your prompts and private assets are accessible only via your biometric-authenticated session.', ImageIcon)} className="hover:text-red-400 transition-colors cursor-pointer text-left">Security Protocol</button></li>
                <li><button onClick={() => openModal('API Uplink', 'Developer uplink is currently in restricted beta. Our REST and Websocket APIs allow architects to integrate Visionex neural synthesis directly into third-party OS environments.', Wand2)} className="hover:text-red-400 transition-colors cursor-pointer text-left">API Uplink</button></li>
                <li><button onClick={() => openModal('Terms of Existence', 'By entering the collective, you agree to respect the synthetic boundaries and ensure all generated content remains within the sector safety guidelines.', Users)} className="hover:text-red-400 transition-colors cursor-pointer text-left">Terms of Existence</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              © 2057 VISIONEX CORP. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-mono text-gray-500">GLOBAL NETWORK: OK</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-gray-500">CORE ENGINE: PEAK</span>
               </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Portal Interface Modal */}
      <DetailModal 
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
        icon={modalData.icon}
      />
    </div>
  );
};

export default Landing;

