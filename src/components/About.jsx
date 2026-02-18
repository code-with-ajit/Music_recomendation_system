import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Cpu, Globe } from 'lucide-react';
import profileImage from '../assets/ajit.png';


const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
            </div>

            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Profile Image */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative group flex justify-center"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-500">

                        <img
                            src={profileImage}
                            alt="Ajit Paraskar"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 rounded-full border border-primary/30 scale-110 group-hover:scale-105 transition-transform duration-700" />
                    </div>


                    {/* Floating Icons */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-10 bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl"
                    >
                        <Code className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-10 left-10 bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl"
                    >
                        <Cpu className="w-6 h-6 text-purple-400" />
                    </motion.div>
                </motion.div>

                {/* Right Side: Content */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">About The Developer</h2>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Ajit Paraskar
                    </h1>

                    <div className="space-y-4 text-gray-300 mb-8 leading-relaxed">
                        <p className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-secondary" />
                            <span className="font-semibold text-white">Role:</span> Computer Engineering Student
                        </p>
                        <p className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-white">Specialization:</span> Machine Learning & Full Stack
                        </p>

                        <div className="h-px bg-white/10 my-6" />

                        <p>
                            "I am Ajit Paraskar, a passionate Computer Engineering student focused on building intelligent AI-powered web applications. This AI Music Recommender project demonstrates the integration of Machine Learning algorithms with modern frontend technologies to create a real-world recommendation system."
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        {[
                            { icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
                            { icon: Github, href: "#", color: "hover:bg-gray-700" },
                            { icon: Mail, href: "#", color: "hover:bg-red-500" }
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-3 rounded-xl bg-white/5 border border-white/10 text-white transition-all duration-300 ${item.color} hover:border-transparent shadow-lg`}
                            >
                                <item.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
