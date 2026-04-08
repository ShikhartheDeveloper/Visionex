import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PacmanGame from '../components/PacmanGame';
import { Gamepad2, Info } from 'lucide-react';

const Arcade = () => {
    return (
        <>
            <Sidebar />
            <div className="flex-1 flex flex-col relative overflow-hidden h-screen">
                <Navbar />
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">
                    <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
                    <div className="scanline opacity-10"></div>
                    
                    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
                        <div className="flex flex-col items-center text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-4">
                                <Gamepad2 className="w-3 h-3" /> System Arcade v1.0
                            </div>
                            <h1 className="text-4xl md:text-6xl font-syne font-extrabold text-white mb-4 tracking-tight">
                                PAC-MAN <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">OVERLOAD</span>
                            </h1>
                            <p className="text-gray-400 max-w-lg">
                                Secure the grid. Consume the neon data points. Evade the system errors.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <PacmanGame />
                        </div>

                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-card p-6 rounded-2xl border-white/5 relative group">
                                <div className="hud-bracket-tl opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                                        <Info className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Controls</h3>
                                        <ul className="text-sm text-gray-400 space-y-2">
                                            <li className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-white/10 rounded border border-white/10 text-[10px] text-white font-mono">ARROW KEYS</span>
                                                to move Pac-Man
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-white/10 rounded border border-white/10 text-[10px] text-white font-mono">SPACE</span>
                                                to pause (comming soon)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl border-white/5 relative group">
                                <div className="hud-bracket-tl opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                                        <Gamepad2 className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Mission</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Navigate through the encrypted sectors and collect all neon data fragments to advance to the next level.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Arcade;
