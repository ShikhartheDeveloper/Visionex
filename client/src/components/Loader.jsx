export default function Loader() {
    return (
        <div className="flex-1 flex flex-col relative overflow-hidden h-screen w-screen bg-[#0a0a0f]">
            <div className="absolute inset-0 cyber-grid opacity-20"></div>
            <div className="scanline"></div>
            
            <main className="flex-1 flex items-center justify-center relative z-10">
                <div className="flex flex-col items-center gap-8">
                    {/* Pacman Loader Container */}
                    <div className="relative w-48 h-12 flex items-center">
                        {/* Pacman Character */}
                        <div className="absolute left-0 w-12 h-12 bg-orange-500 rounded-full animate-[pacman-eat_0.3s_infinite] shadow-[0_0_20px_rgba(249,115,22,0.5)] z-20"></div>
                        
                        {/* Dots to eat */}
                        <div className="flex gap-8 pl-16 animate-[pacman-dots_1.5s_linear_infinite]">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="font-syne text-sm font-bold tracking-[0.2em] text-red-500 animate-pulse">
                        LOADING SYSTEM...
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes pacman-dots {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-40px); }
                }
            `}</style>
        </div>
    );
}
