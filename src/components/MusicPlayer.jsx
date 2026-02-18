import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(80);
    const [progress, setProgress] = useState(30);

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            className="fixed bottom-0 left-0 right-0 h-24 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 flex items-center justify-between z-50"
        >
            {/* Song Info */}
            <div className="flex items-center gap-4 w-1/4">
                <div className="w-14 h-14 rounded-lg overflow-hidden relative group">
                    <img
                        src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=200&auto=format&fit=crop"
                        alt="Album Art"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">Blinding Lights</h4>
                    <p className="text-xs text-gray-400">The Weeknd</p>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors ml-2">
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            {/* Controls & Progress */}
            <div className="flex flex-col items-center justify-center w-2/4 gap-2">
                <div className="flex items-center gap-6">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Shuffle className="w-4 h-4" />
                    </button>
                    <button className="text-gray-300 hover:text-white transition-colors">
                        <SkipBack className="w-5 h-5 fill-current" />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                        ) : (
                            <Play className="w-5 h-5 fill-current ml-1" />
                        )}
                    </button>
                    <button className="text-gray-300 hover:text-white transition-colors">
                        <SkipForward className="w-5 h-5 fill-current" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Repeat className="w-4 h-4" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md flex items-center gap-3 text-xs text-gray-400 font-mono">
                    <span>1:24</span>
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden relative cursor-pointer group">
                        <div
                            className="h-full bg-white group-hover:bg-primary transition-colors relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    <span>3:20</span>
                </div>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-end gap-3 w-1/4">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden cursor-pointer group">
                    <div
                        className="h-full bg-gray-400 group-hover:bg-primary transition-colors"
                        style={{ width: `${volume}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default MusicPlayer;
