import React, { useEffect, useRef } from 'react';

const PingPongHero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const paddleWidth = 10;
        const paddleHeight = 80;
        const ballSize = 8;
        const paddleSpeed = 4;
        const initialBallSpeed = 5;

        // State
        const state = {
            p1: { y: canvas.height / 2 - paddleHeight / 2, score: 0 },
            p2: { y: canvas.height / 2 - paddleHeight / 2, score: 0 },
            ball: {
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: initialBallSpeed,
                vy: initialBallSpeed * (Math.random() > 0.5 ? 1 : -1)
            }
        };

        const resize = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        const drawMatch = () => {
            // Background with a very subtle fade for trails
            ctx.fillStyle = 'rgba(10, 10, 15, 0.4)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Center line
            ctx.setLineDash([5, 10]);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.stroke();

            // Ball glow
            const ballGlow = ctx.createRadialGradient(
                state.ball.x, state.ball.y, 0,
                state.ball.x, state.ball.y, ballSize * 3
            );
            ballGlow.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
            ballGlow.addColorStop(1, 'transparent');

            // Ball
            ctx.fillStyle = ballGlow;
            ctx.beginPath();
            ctx.arc(state.ball.x, state.ball.y, ballSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ef4444'; // Red-500
            ctx.beginPath();
            ctx.arc(state.ball.x, state.ball.y, ballSize / 2, 0, Math.PI * 2);
            ctx.fill();

            // Paddles
            ctx.fillStyle = '#ef4444';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ef4444';
            // P1
            ctx.fillRect(20, state.p1.y, paddleWidth, paddleHeight);
            // P2
            ctx.fillRect(canvas.width - 20 - paddleWidth, state.p2.y, paddleWidth, paddleHeight);
            ctx.shadowBlur = 0;
        };

        const updateMatch = () => {
            // Ball movement
            state.ball.x += state.ball.vx;
            state.ball.y += state.ball.vy;

            // Bounce top/bottom
            if (state.ball.y <= 0 || state.ball.y >= canvas.height) {
                state.ball.vy *= -1;
            }

            // AI Logic (Smooth following)
            const p1Target = state.ball.y - paddleHeight / 2;
            const p2Target = state.ball.y - paddleHeight / 2;

            if (state.ball.vx < 0) { // Ball moving left
                if (state.p1.y < p1Target) state.p1.y += paddleSpeed;
                if (state.p1.y > p1Target) state.p1.y -= paddleSpeed;
            } else { // Ball moving right
                if (state.p2.y < p2Target) state.p2.y += paddleSpeed;
                if (state.p2.y > p2Target) state.p2.y -= paddleSpeed;
            }

            // Paddle bounds
            state.p1.y = Math.max(0, Math.min(canvas.height - paddleHeight, state.p1.y));
            state.p2.y = Math.max(0, Math.min(canvas.height - paddleHeight, state.p2.y));

            // Collision Detection
            // P1
            if (state.ball.x <= 20 + paddleWidth && 
                state.ball.y >= state.p1.y && 
                state.ball.y <= state.p1.y + paddleHeight) {
                state.ball.vx *= -1.1; // Speed up slightly on hits
                state.ball.vx = Math.min(state.ball.vx, 15); // Cap speed
                state.ball.x = 20 + paddleWidth + 1; // Unstick
            }

            // P2
            if (state.ball.x >= canvas.width - 20 - paddleWidth && 
                state.ball.y >= state.p2.y && 
                state.ball.y <= state.p2.y + paddleHeight) {
                state.ball.vx *= -1.1;
                state.ball.vx = Math.max(state.ball.vx, -15);
                state.ball.x = canvas.width - 20 - paddleWidth - 1;
            }

            // Score / Reset
            if (state.ball.x < 0 || state.ball.x > canvas.width) {
                state.ball.x = canvas.width / 2;
                state.ball.y = canvas.height / 2;
                state.ball.vx = initialBallSpeed * (state.ball.vx > 0 ? -1 : 1);
                state.ball.vy = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1);
            }
        };

        const loop = () => {
            updateMatch();
            drawMatch();
            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('resize', resize);
        resize();
        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="w-full h-full block bg-[#0a0a0f]"
            style={{ opacity: 0.6 }} // Subtle background effect
        />
    );
};

export default PingPongHero;
