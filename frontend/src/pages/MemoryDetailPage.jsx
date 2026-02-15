import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import GlassCard from '../components/common/GlassCard';
import NeonButton from '../components/common/NeonButton';
import { format } from 'date-fns';
import { FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaHeart } from 'react-icons/fa';

const MemoryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getMemory, deleteMemory, isLoading: contextLoading } = useMemories();
    const [memory, setMemory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemory = async () => {
            if (id) {
                const data = await getMemory(id);
                setMemory(data);
                setLoading(false);
            }
        };
        fetchMemory();
    }, [id, getMemory]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this memory?') && id) {
            await deleteMemory(id);
            navigate('/');
        }
    };

    if (loading || contextLoading) {
        return <div className="text-white flex justify-center items-center h-64">Loading...</div>;
    }

    if (!memory) {
        return <div className="text-white text-center mt-20">Memory not found</div>;
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Media Section - Simple list for now, could be a carousel */}
                <div className="space-y-4">
                    {memory.media.map((item, index) => (
                        <div key={index} className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            {item.type === 'video' ? (
                                <video src={item.url} controls className="w-full h-auto" />
                            ) : (
                                <img src={item.url} alt={`Memory ${index}`} className="w-full h-auto" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <GlassCard>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-bold text-white leading-tight">{memory.title}</h1>
                            {memory.isFavorite && <FaHeart className="text-neon-secondary text-2xl flex-shrink-0" />}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                            <span className="flex items-center gap-2">
                                <FaCalendarAlt className="text-neon-primary" />
                                {format(new Date(memory.createdAt), 'MMMM d, yyyy')}
                            </span>
                            {memory.location && (
                                <span className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-neon-primary" />
                                    {memory.location}
                                </span>
                            )}
                            {memory.mood && (
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    Mood: {memory.mood}
                                </span>
                            )}
                        </div>

                        <div className="prose prose-invert max-w-none text-gray-300 mb-6">
                            <p className="whitespace-pre-wrap">{memory.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {memory.tags.map((tag, index) => (
                                <span key={index} className="text-sm px-3 py-1 rounded-full bg-neon-primary/10 border border-neon-primary/30 text-neon-primary">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-white/10">
                            <NeonButton onClick={handleDelete} className="bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]">
                                <FaTrash className="inline mr-2" /> Delete Memory
                            </NeonButton>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default MemoryDetailPage;
