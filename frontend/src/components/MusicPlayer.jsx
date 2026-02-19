import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Music2, Play } from "lucide-react";

const MusicPlayer = ({ song, onNext }) => {
    const [expanded, setExpanded] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const prevSongIdRef = useRef(null);

    // ✅ Auto expand when a new song is selected
    useEffect(() => {
        if (song) {
            const currentSongId = song.track_id || `${song.title}-${song.artist}`;
            const prevSongId = prevSongIdRef.current;
            
            if (currentSongId !== prevSongId) {
                // New song selected - auto expand and play
                setExpanded(true);
                setFullscreen(false);
                prevSongIdRef.current = currentSongId;
            }
        } else {
            // No song - collapse
            setExpanded(false);
            setFullscreen(false);
            prevSongIdRef.current = null;
        }
    }, [song]);

    if (!song) return null;

    return (
        <>
            {/* Mini Player - Top Right Corner */}
            <AnimatePresence>
                {!expanded && !fullscreen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="fixed top-20 md:top-24 right-4 md:right-6 z-40"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setExpanded(true)}
                            className="relative cursor-pointer bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3 w-[260px] md:min-w-[280px] md:max-w-[320px] group"
                        >
                            {/* Animated Gradient Background */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                            
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-md -z-10"></div>

                            {song.image ? (
                                <img
                                    src={song.image}
                                    alt={song.title}
                                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/20"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Music2 className="w-6 h-6 text-white" />
                                </div>
                            )}

                            <div className="flex-1 overflow-hidden min-w-0">
                                <h4 className="text-white font-semibold text-sm truncate">
                                    {song.title}
                                </h4>
                                <p className="text-gray-200 text-xs truncate">
                                    {song.artist}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                <Play className="w-4 h-4 text-white opacity-70" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Player - Top Right Corner */}
            <AnimatePresence>
                {(expanded || fullscreen) && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 100, y: -20 }}
                        transition={{ duration: 0.35, type: "spring" }}
                        className={`fixed ${fullscreen 
                            ? "top-20 right-4 md:right-6 bottom-6 z-50 w-[calc(100%-2rem)] md:w-[90%] max-w-[600px]" 
                            : "top-20 md:top-24 right-4 md:right-6 z-40 w-[calc(100%-2rem)] md:w-[420px] max-w-[420px]"
                        }`}
                    >
                        <motion.div
                            className={`relative bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-pink-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-6 ${fullscreen ? "h-full flex flex-col" : ""}`}
                        >
                            {/* Animated Gradient Background */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl -z-10 animate-pulse"></div>
                            
                            {/* Glow Border */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-sm -z-10"></div>

                            {/* Header Controls */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                    <span className="text-xs text-gray-300 font-medium">Now Playing</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFullscreen(!fullscreen)}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                                    >
                                        {fullscreen ? (
                                            <Minimize2 size={16} />
                                        ) : (
                                            <Maximize2 size={16} />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setExpanded(false);
                                            setFullscreen(false);
                                        }}
                                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white transition-all hover:scale-110"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Song Info */}
                            <div className="flex flex-col items-center text-center mb-6">
                                {song.image ? (
                                    <motion.img
                                        src={song.image}
                                        alt={song.title}
                                        className="w-40 h-40 rounded-2xl object-cover shadow-2xl mb-4 ring-4 ring-white/10"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-2xl">
                                        <Music2 className="w-16 h-16 text-white" />
                                    </div>
                                )}

                                <h3 className="text-white font-bold text-xl mb-1">
                                    {song.title}
                                </h3>
                                <p className="text-gray-300 text-sm mb-2">
                                    {song.artist}
                                </p>
                                {song.album && (
                                    <p className="text-gray-400 text-xs">
                                        {song.album}
                                    </p>
                                )}
                            </div>

                            {/* YouTube Player */}
                            <div className={`${fullscreen ? "flex-1 min-h-0" : ""}`}>
                                {song.youtube_video_id ? (
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/50">
                                        <iframe
                                            width="100%"
                                            height={fullscreen ? "100%" : "250"}
                                            src={`https://www.youtube.com/embed/${song.youtube_video_id}?autoplay=1&rel=0&modestbranding=1`}
                                            title="YouTube player"
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            className="w-full rounded-2xl"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="h-[250px] rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                        <p className="text-gray-400">Video not available</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex gap-2">
                                {song.spotify_url && (
                                    <a
                                        href={song.spotify_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl hover:opacity-90 transition text-center text-sm font-medium shadow-lg"
                                    >
                                        Open in Spotify
                                    </a>
                                )}
                                {onNext && (
                                    <button
                                        onClick={onNext}
                                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-xl hover:opacity-90 transition text-sm font-medium shadow-lg"
                                    >
                                        Next Song
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fullscreen Overlay */}
            {fullscreen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setFullscreen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                />
            )}
        </>
    );
};

export default MusicPlayer;
