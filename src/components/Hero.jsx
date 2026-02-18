import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient Animation */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 opacity-80"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -5, 5, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0 opacity-60"
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        Discover Music with
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-pulse-glow">
                            AI Intelligence
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Search your favorite Hindi song and let AI recommend similar vibes.
                        Experience the future of music discovery.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative max-w-xl mx-auto group"
                >
                    <input
                        type="text"
                        placeholder="Search for a song, artist, or vibe..."
                        className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-6 pr-14 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-lg group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    />
                    <button className="absolute right-2 top-2 p-2 bg-gradient-to-r from-primary to-secondary rounded-full hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all transform hover:scale-105 active:scale-95">
                        <Search className="w-5 h-5 text-white" />
                    </button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
