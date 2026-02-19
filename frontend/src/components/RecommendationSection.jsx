import React from 'react';
import { motion } from 'framer-motion';
import { Play, Music, ExternalLink, Sparkles } from 'lucide-react';

const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const RecommendationSection = ({ matchedSong, recommendations, loading, onSelectSong }) => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        AI Recommendations
                    </h2>
                    <Sparkles className="w-6 h-6 text-pink-400" />
                </div>
                <p className="text-gray-400 text-lg">
                    Discover similar songs powered by machine learning
                </p>
            </motion.div>

            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
                    />
                    <p className="text-gray-400 text-lg">Finding your perfect matches...</p>
                </motion.div>
            ) : recommendations.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Search for a song to get started</p>
                </motion.div>
            ) : (
                <>
                    {/* Matched Song Card */}
                    {matchedSong && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => onSelectSong(matchedSong)}
                            className="mb-12 group cursor-pointer"
                        >
                            <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-purple-500/50 p-6 rounded-3xl shadow-2xl hover:border-purple-400 transition-all duration-300 hover:shadow-purple-500/30 overflow-hidden">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="px-3 py-1 bg-purple-500/30 rounded-full border border-purple-400/50">
                                            <span className="text-purple-300 text-sm font-semibold">✨ Matched Song</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {matchedSong.image ? (
                                            <motion.img
                                                src={matchedSong.image}
                                                alt={matchedSong.title}
                                                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-500/30 shadow-xl group-hover:ring-purple-400/50 transition-all"
                                                whileHover={{ scale: 1.05 }}
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                                                <Music className="w-12 h-12 text-white" />
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                                                {matchedSong.title}
                                            </h3>
                                            <p className="text-gray-300 text-lg mb-2">
                                                {matchedSong.artist}
                                            </p>
                                            <p className="text-gray-400 text-sm mb-3">
                                                {matchedSong.album}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>Popularity: <span className="text-purple-400">{matchedSong.popularity}</span></span>
                                                <span>•</span>
                                                <span>{formatDuration(matchedSong.duration_ms)}</span>
                                            </div>
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all"
                                        >
                                            <Play className="w-6 h-6 text-white ml-1" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Recommendations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((song, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8 }}
                                onClick={() => onSelectSong(song)}
                                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 p-5 rounded-2xl cursor-pointer overflow-hidden hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                                
                                {/* Glow on Hover */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>

                                <div className="relative z-10">
                                    {/* Album Art */}
                                    <div className="relative mb-4 overflow-hidden rounded-xl">
                                        {song.image ? (
                                            <motion.img
                                                src={song.image}
                                                alt={song.title}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                <Music className="w-16 h-16 text-white" />
                                            </div>
                                        )}
                                        
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl"
                                            >
                                                <Play className="w-8 h-8 text-purple-600 ml-1" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Song Info */}
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors line-clamp-1">
                                        {song.title}
                                    </h3>

                                    <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                                        {song.artist}
                                    </p>

                                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                                        {song.album}
                                    </p>

                                    {/* Stats and Actions */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-3">
                                            {song.preview_url && (
                                                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                                                    Preview
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-500">
                                                {song.popularity} ♥
                                            </span>
                                        </div>

                                        {song.spotify_url && (
                                            <a
                                                href={song.spotify_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-green-400 transition-all"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default RecommendationSection;
