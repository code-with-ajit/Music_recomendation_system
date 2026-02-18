import React from 'react';
import Hero from './Hero';
import RecommendationSection from './RecommendationSection';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <div className="relative z-10 pb-32">
                <RecommendationSection />
            </div>
        </motion.div>
    );
};

export default Home;
