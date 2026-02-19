import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Music, Zap, Shield, Globe, TrendingUp, Heart } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Recommendations",
            description: "Advanced machine learning algorithms analyze your music preferences to suggest perfect matches.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Music,
            title: "Vast Music Library",
            description: "Access thousands of songs across multiple genres with our comprehensive music database.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Zap,
            title: "Lightning Fast Search",
            description: "Find your favorite songs instantly with our optimized search and autocomplete features.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: TrendingUp,
            title: "Personalized Experience",
            description: "Get recommendations tailored to your listening habits and preferences.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Shield,
            title: "Secure & Private",
            description: "Your data is protected with industry-standard security measures and privacy controls.",
            color: "from-red-500 to-rose-500"
        },
        {
            icon: Globe,
            title: "Cross-Platform",
            description: "Access your music recommendations from any device, anywhere, anytime.",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            Features
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Discover what makes our AI Music Recommender special
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-purple-400/50 transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* How It Works Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-20 bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            How It Works
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Simple steps to discover your next favorite song
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Search",
                                description: "Enter the name of a song you love"
                            },
                            {
                                step: "02",
                                title: "Analyze",
                                description: "Our AI analyzes the song's features and patterns"
                            },
                            {
                                step: "03",
                                title: "Discover",
                                description: "Get personalized recommendations instantly"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-2xl font-bold text-white">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Features;
