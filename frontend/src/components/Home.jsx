import React, { useState } from 'react';
import Hero from './Hero';
import RecommendationSection from './RecommendationSection';
import MusicPlayer from './MusicPlayer';
import { motion } from 'framer-motion';

const Home = () => {
    const [matchedSong, setMatchedSong] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const fetchRecommendations = async (song) => {
        try {
            setLoading(true);

            const response = await fetch("https://music-recomendation-system.onrender.com/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ song }),
            });

            const data = await response.json();

            setMatchedSong(data.matched_song);
            setRecommendations(data.recommendations);

            if (data.matched_song) {
                setCurrentSong(data.matched_song);
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSongSelect = (selectedSong) => {
        // Set the selected song - MusicPlayer will auto-expand
        setCurrentSong(selectedSong);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
        >
            {/* Hero Section */}
            <Hero onSearch={fetchRecommendations} />

            {/* Recommendations Section */}
            <div className="relative z-10 pb-20">
                <RecommendationSection
                    matchedSong={matchedSong}
                    recommendations={recommendations}
                    loading={loading}
                    onSelectSong={handleSongSelect}
                />
            </div>

            {/* Music Player - Positioned in corner */}
            <MusicPlayer song={currentSong} />
        </motion.div>
    );
};

export default Home;
