import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Music2, Play } from "lucide-react";

const MusicPlayer = ({ song, onNext }) => {
    const [expanded, setExpanded] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const prevSongIdRef = useRef(null);

    // ✅ Detect NEW song selection
    useEffect(() => {
        if (song) {
            const currentSongId = song.youtube_video_id || `${song.title}-${song.artist}`;
            const prevSongId = prevSongIdRef.current;

            if (currentSongId !== prevSongId) {
                setExpanded(true);
                setFullscreen(false);
                prevSongIdRef.current = currentSongId;
            }
        } else {
            setExpanded(false);
            setFullscreen(false);
            prevSongIdRef.current = null;
        }
    }, [song]);

    if (!song) return null;

    return (
        <>
            {/* MINI PLAYER */}
            <AnimatePresence>
                {!expanded && !fullscreen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-24 right-6 z-40"
                    >
                        <div
                            onClick={() => setExpanded(true)}
                            className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-xl flex items-center gap-3"
                        >
                            {song.image ? (
                                <img src={song.image} className="w-12 h-12 rounded-lg object-cover" />
                            ) : (
                                <Music2 className="text-white" />
                            )}

                            <div>
                                <p className="text-white text-sm font-semibold">{song.title}</p>
                                <p className="text-gray-200 text-xs">{song.artist}</p>
                            </div>

                            <Play className="text-white" size={18} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXPANDED PLAYER */}
            <AnimatePresence>
                {(expanded || fullscreen) && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`fixed ${
                            fullscreen
                                ? "top-20 right-6 bottom-6 w-[500px]"
                                : "top-24 right-6 w-[420px]"
                        } z-50`}
                    >
                        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-6 rounded-3xl shadow-2xl">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-300 text-sm">Now Playing</span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFullscreen(!fullscreen)}
                                        className="p-2 bg-white/10 rounded-lg"
                                    >
                                        {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setExpanded(false);
                                            setFullscreen(false);
                                        }}
                                        className="p-2 bg-red-500/20 rounded-lg"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* SONG INFO */}
                            <div className="text-center mb-5">
                                {song.image ? (
                                    <img
                                        src={song.image}
                                        className="w-36 h-36 mx-auto rounded-2xl object-cover mb-3"
                                    />
                                ) : (
                                    <div className="w-36 h-36 mx-auto bg-purple-500 rounded-2xl flex items-center justify-center">
                                        <Music2 size={40} className="text-white" />
                                    </div>
                                )}

                                <h3 className="text-white text-lg font-bold">{song.title}</h3>
                                <p className="text-gray-300 text-sm">{song.artist}</p>
                            </div>

                            {/* ✅ YOUTUBE PLAYER (FIXED) */}
                            <div className={`${fullscreen ? "h-full" : ""}`}>
                                {song.youtube_video_id ? (
                                    <iframe
                                        key={song.youtube_video_id}  // 🔥 forces reload
                                        width="100%"
                                        height={fullscreen ? "100%" : "250"}
                                        src={`https://www.youtube.com/embed/${song.youtube_video_id}?autoplay=1&mute=0`}
                                        title="YouTube player"
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="rounded-xl"
                                    />
                                ) : (
                                    <div className="h-[250px] flex items-center justify-center text-gray-400">
                                        Searching video...
                                    </div>
                                )}
                            </div>

                            {/* NEXT BUTTON */}
                            {onNext && (
                                <button
                                    onClick={onNext}
                                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded-xl text-white"
                                >
                                    Next Recommendation
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayer;
