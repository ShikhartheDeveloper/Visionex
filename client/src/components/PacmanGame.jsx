import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import profileService from '../features/profile/profileService';
import { toast } from 'react-toastify';

const GRID_SIZE = 15;
const CELL_SIZE = 30;

const PacmanGame = () => {
    const [pacman, setPacman] = useState({ x: 1, y: 1 });
    const [dir, setDir] = useState({ x: 0, y: 0 });
    const [dots, setDots] = useState([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const touchStartRef = useRef(null);
    const creditAwarded = useRef(false);
    const { user } = useSelector((state) => state.auth);

    const walls = [
        { x: 0, y: 0, w: 15, h: 1 }, { x: 0, y: 14, w: 15, h: 1 },
        { x: 0, y: 0, w: 1, h: 15 }, { x: 14, y: 0, w: 1, h: 15 },
        { x: 2, y: 2, w: 3, h: 2 }, { x: 10, y: 2, w: 3, h: 2 },
        { x: 2, y: 10, w: 3, h: 2 }, { x: 10, y: 10, w: 3, h: 2 },
        { x: 6, y: 4, w: 3, h: 6 }, { x: 2, y: 6, w: 2, h: 2 },
        { x: 11, y: 6, w: 2, h: 2 }
    ];

    const isWall = (x, y) => walls.some(w => x >= w.x && x < w.x + w.w && y >= w.y && y < w.y + w.h);

    useEffect(() => {
        const initialDots = [];
        for (let y = 1; y < GRID_SIZE - 1; y++) {
            for (let x = 1; x < GRID_SIZE - 1; x++) {
                if (!isWall(x, y)) initialDots.push({ x, y });
            }
        }
        setDots(initialDots);
    }, []);

    const movePacman = useCallback(() => {
        if (isGameOver || (dir.x === 0 && dir.y === 0)) return;
        setPacman(prev => {
            const nextX = prev.x + dir.x;
            const nextY = prev.y + dir.y;
            if (isWall(nextX, nextY)) return prev;
            setDots(prevDots => {
                const newDots = prevDots.filter(d => d.x !== nextX || d.y !== nextY);
                if (newDots.length < prevDots.length) setScore(s => s + 10);
                if (newDots.length === 0) {
                    setIsGameOver(true);
                    if (!creditAwarded.current && user?.token) {
                        creditAwarded.current = true;
                        profileService.addCredit(user.token).then(data => {
                            console.log('Credit awarded!', data);
                            toast.success("SYSTEM UPGRADE: +1 CREDIT SECURED", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "dark",
                            });
                        }).catch(err => {
                            console.error('Failed to award credit', err);
                            creditAwarded.current = false;
                        });
                    }
                }
                return newDots;
            });
            return { x: nextX, y: nextY };
        });
    }, [dir, isGameOver]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp': case 'w': setDir({ x: 0, y: -1 }); e.preventDefault(); break;
                case 'ArrowDown': case 's': setDir({ x: 0, y: 1 }); e.preventDefault(); break;
                case 'ArrowLeft': case 'a': setDir({ x: -1, y: 0 }); e.preventDefault(); break;
                case 'ArrowRight': case 'd': setDir({ x: 1, y: 0 }); e.preventDefault(); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Touch / Swipe controls
    const handleTouchStart = (e) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current) return;
        const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
        const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
        if (Math.abs(dx) > Math.abs(dy)) {
            setDir(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
        } else {
            setDir(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
        }
        touchStartRef.current = null;
    };

    useEffect(() => {
        const interval = setInterval(movePacman, 200);
        return () => clearInterval(interval);
    }, [movePacman]);

    const facingDeg = dir.x === 1 ? 0 : dir.x === -1 ? 180 : dir.y === 1 ? 90 : 270;

    return (
        <div
            className="flex flex-col items-center gap-4 p-6 glass-card rounded-3xl border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] relative overflow-hidden group select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

            {/* Score */}
            <div className="flex justify-between w-full font-syne font-bold text-red-500 tracking-wider text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    SCORE: {score.toString().padStart(4, '0')}
                </div>
                <div>LEVEL: 01</div>
            </div>

            {/* Game Board */}
            <div
                className="relative bg-black/80 border-2 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)] rounded-lg overflow-hidden touch-none"
                style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, maxWidth: '100%' }}
            >
                {dots.map((d, i) => (
                    <div
                        key={i}
                        className="absolute bg-orange-400 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                        style={{ width: 6, height: 6, left: d.x * CELL_SIZE + (CELL_SIZE - 6) / 2, top: d.y * CELL_SIZE + (CELL_SIZE - 6) / 2 }}
                    />
                ))}
                {walls.map((w, i) => (
                    <div
                        key={i}
                        className="absolute bg-red-900/40 border border-red-500/30"
                        style={{ left: w.x * CELL_SIZE, top: w.y * CELL_SIZE, width: w.w * CELL_SIZE, height: w.h * CELL_SIZE }}
                    />
                ))}
                <div
                    className="absolute bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] transition-all duration-200 flex items-center justify-center overflow-hidden"
                    style={{ width: CELL_SIZE - 4, height: CELL_SIZE - 4, left: pacman.x * CELL_SIZE + 2, top: pacman.y * CELL_SIZE + 2, transform: `rotate(${facingDeg}deg)` }}
                >
                    <div className="w-full h-full bg-black" style={{ clipPath: 'polygon(100% 50%, 40% 0, 40% 100%)' }}></div>
                </div>
                {isGameOver && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                        <div className="text-2xl font-syne font-bold text-red-500 mb-4 animate-bounce text-center px-4">
                            {dots.length === 0 ? 'CONQUEST COMPLETE' : 'SYSTEM FAILURE'}
                        </div>
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-colors">
                            REBOOT
                        </button>
                    </div>
                )}
            </div>

            {/* On-Screen D-Pad for Mobile */}
            <div className="flex flex-col items-center gap-1 mt-2 md:hidden">
                <button
                    onTouchStart={(e) => { e.preventDefault(); setDir({ x: 0, y: -1 }); }}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white active:bg-red-500/30 active:border-red-500/50 transition-colors"
                    aria-label="Up"
                >▲</button>
                <div className="flex gap-1">
                    <button
                        onTouchStart={(e) => { e.preventDefault(); setDir({ x: -1, y: 0 }); }}
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white active:bg-red-500/30 active:border-red-500/50 transition-colors"
                        aria-label="Left"
                    >◀</button>
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_yellow]"></div>
                    </div>
                    <button
                        onTouchStart={(e) => { e.preventDefault(); setDir({ x: 1, y: 0 }); }}
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white active:bg-red-500/30 active:border-red-500/50 transition-colors"
                        aria-label="Right"
                    >▶</button>
                </div>
                <button
                    onTouchStart={(e) => { e.preventDefault(); setDir({ x: 0, y: 1 }); }}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white active:bg-red-500/30 active:border-red-500/50 transition-colors"
                    aria-label="Down"
                >▼</button>
            </div>

            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase opacity-50 hidden md:block">
                Arrow Keys or WASD to Navigate
            </div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase opacity-50 md:hidden">
                Swipe or use D-Pad to Navigate
            </div>
        </div>
    );
};

export default PacmanGame;
