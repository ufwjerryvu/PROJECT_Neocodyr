
import React, { useState, useEffect } from 'react';

interface BackgroundProp {
    children: React.ReactNode;
};

const Background = ({ children }: BackgroundProp) => {
    const [stars, setStars] = useState<Array<{ width: number, height: number, top: string, left: string, delay: string, opacity: number }>>([]);

    useEffect(() => {
        setStars([...Array(100)].map(() => ({
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            delay: Math.random() * 3 + 's',
            opacity: Math.random() * 0.7 + 0.3
        })));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.2),transparent_50%)]"></div>

            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            width: star.width + 'px',
                            height: star.height + 'px',
                            top: star.top,
                            left: star.left,
                            animationDelay: star.delay,
                            opacity: star.opacity
                        }}
                    ></div>
                ))}
            </div>

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

export default Background;