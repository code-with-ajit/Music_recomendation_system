import React, { useState, useRef, useEffect } from 'react';
import { Search, Music, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ onSearch }) => {
    const [song, setSong] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);

    const fetchSuggestions = async (value) => {
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch("https://music-recomendation-system.onrender.com/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: value }),
            });

            const data = await response.json();
            setSuggestions(data.suggestions || []);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSong(value);
        fetchSuggestions(value);
    };

    const handleSelect = (selectedSong) => {
        setSong(selectedSong);
        setSuggestions([]);
        setIsFocused(false);
        onSearch(selectedSong);
    };

    const handleSearchClick = () => {
        if (song.trim() !== "") {
            setSuggestions([]);
            setIsFocused(false);
            onSearch(song);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && song.trim() !== "") {
            handleSearchClick();
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
                />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                        className="inline-block mb-6"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                            <Music className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight">
                        Discover Music
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        with AI Intelligence
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mt-4">
                        Find your next favorite song powered by machine learning
                    </p>
                </motion.div>

                {/* Enhanced Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-2xl mx-auto"
                    ref={searchRef}
                >
                    <div className={`relative transition-all duration-300 ${isFocused || song ? 'scale-105' : ''}`}>
                        {/* Glow Effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-0 transition-opacity duration-300 ${isFocused || song ? 'opacity-50' : ''}`}></div>

                        {/* Search Input Container */}
                        <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full shadow-2xl overflow-hidden">
                            <div className="flex items-center">
                                <div className="pl-6 pr-4">
                                    <Search className="w-6 h-6 text-gray-400" />
                                </div>

                                <input
                                    type="text"
                                    value={song}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    onFocus={() => setIsFocused(true)}
                                    placeholder="Search for a song, artist, or album..."
                                    className="flex-1 bg-transparent py-5 pr-6 text-white text-lg placeholder-gray-400 focus:outline-none"
                                />

                                {song && (
                                    <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        onClick={handleSearchClick}
                                        className="mr-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-110"
                                    >
                                        <Search className="w-5 h-5 text-white" />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Autocomplete Dropdown */}
                    <AnimatePresence>
                        {suggestions.length > 0 && (isFocused || song) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full mt-3 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                            >
                                <div className="p-2">
                                    {suggestions.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => handleSelect(item)}
                                            className="px-4 py-3 cursor-pointer hover:bg-white/10 rounded-xl transition-all group flex items-center gap-3"
                                        >
                                            <Music className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                            <span className="text-white text-sm group-hover:text-purple-300 transition-colors">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 flex justify-center gap-2"
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                            className="w-2 h-2 rounded-full bg-purple-400"
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
