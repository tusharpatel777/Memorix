import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import GlassCard from '../components/common/GlassCard';
import NeonButton from '../components/common/NeonButton';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaPlus, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
    const { memories, isLoading, toggleFavorite } = useMemories();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMemories = memories.filter(memory =>
        memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <div className="pb-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
            >
                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neon-primary via-white to-neon-secondary tracking-tighter filter drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">
                        MY MEMORIES
                    </h1>
                    <p className="text-gray-400 mt-2 tracking-widest text-sm uppercase">Curate your digital legacy</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 items-stretch">
                    <div className="relative flex-grow md:w-80 group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-neon-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search memories..."
                            className="input-field pl-12 h-12 bg-dark-800/50 backdrop-blur-sm border-white/5 focus:bg-dark-900/80 transition-all duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/create">
                        <NeonButton className="h-12 w-full sm:w-auto flex items-center justify-center gap-2 px-8 font-bold tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)]">
                            <FaPlus className="text-sm" /> CREATE
                        </NeonButton>
                    </Link>
                </div>
            </motion.div>

            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-neon-primary rounded-full border-t-transparent animate-spin"></div>
                    </div>
                </div>
            ) : filteredMemories.length === 0 ? (
                <GlassCard className="text-center py-32 border-dashed border-2 border-white/10 bg-transparent">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-8xl mb-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer text-shadow-glow">🌪️</div>
                        <h2 className="text-3xl font-bold text-white mb-3">No memories found</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">Your vault is empty. Start capturing your moments today and they will appear here.</p>
                        <Link to="/create">
                            <NeonButton className="px-10 py-3 text-lg">Create First Memory</NeonButton>
                        </Link>
                    </motion.div>
                </GlassCard>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredMemories.map((memory) => (
                            <motion.div key={memory._id} variants={item} layout>
                                <GlassCard className="h-full flex flex-col group hover:border-neon-primary/50 transition-all duration-500 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,255,0.2)]">
                                    <Link to={`/memory/${memory._id}`} className="block">
                                        <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                                            {memory.media[0]?.type === 'video' ? (
                                                <video
                                                    src={memory.media[0].url}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                                                    muted
                                                    loop
                                                    onMouseOver={e => e.target.play()}
                                                    onMouseOut={e => e.target.pause()}
                                                />
                                            ) : (
                                                <img
                                                    src={memory.media[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                                                    alt={memory.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                <span className="bg-dark-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                                                    VIEW
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="flex justify-between items-start mb-3 relative pl-4 border-l-2 border-neon-primary/0 group-hover:border-neon-primary transition-colors duration-300">
                                        <h3 className="text-2xl font-bold text-white truncate pr-4 group-hover:text-neon-primary transition-colors">{memory.title}</h3>
                                        <motion.button
                                            whileTap={{ scale: 0.8 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFavorite(memory._id);
                                            }}
                                            className={`text-2xl ${memory.isFavorite ? 'text-neon-secondary drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]' : 'text-gray-600 hover:text-neon-secondary'} transition-all`}
                                        >
                                            {memory.isFavorite ? <FaHeart /> : <FaRegHeart />}
                                        </motion.button>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{memory.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {memory.tags.map((tag, index) => (
                                            <span key={index} className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm bg-white/5 border border-white/5 text-neon-primary/70 group-hover:text-neon-primary group-hover:border-neon-primary/30 transition-colors">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center text-xs font-mono text-gray-500 mt-auto pt-4 border-t border-white/5">
                                        <span className="flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-neon-primary/50" />
                                            {memory.location || 'Unknown Location'}
                                        </span>
                                        <span>{format(new Date(memory.createdAt), 'MMM d, yyyy')}</span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default Dashboard;
