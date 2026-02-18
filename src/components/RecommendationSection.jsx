import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const recommendations = [
    {
        id: 1,
        title: "Midnight City",
        artist: "M83",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Levitating",
        artist: "Dua Lipa",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Starboy",
        artist: "The Weeknd",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Neon Nights",
        artist: "Synthwave Boy",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=400&auto=format&fit=crop",
    },
];

const RecommendationSection = () => {
    return (
        <section id="recommendations" className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                    Featured Recommendations
                </h2>

                <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                    {recommendations.map((song, index) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="min-w-[200px] md:min-w-[240px] snap-start group relative bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        >
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                                <img
                                    src={song.image}
                                    alt={song.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-secondary">
                                        <Play className="w-5 h-5 fill-current ml-1" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg mb-1 truncate">{song.title}</h3>
                            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default RecommendationSection;
