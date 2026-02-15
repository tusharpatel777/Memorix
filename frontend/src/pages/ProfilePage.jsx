import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMemories } from '../context/MemoryContext';
import GlassCard from '../components/common/GlassCard';
import NeonButton from '../components/common/NeonButton';
import { FaUser, FaMemory, FaHeart } from 'react-icons/fa';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const { memories } = useMemories();

    const userMemories = memories.length;
    const favoriteMemories = memories.filter(m => m.isFavorite).length;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-primary to-neon-secondary mb-8 text-center">
                User Profile
            </h1>

            <GlassCard className="mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-primary to-neon-secondary p-1">
                        <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center overflow-hidden">
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <FaUser className="text-4xl text-gray-400" />
                            )}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-grow">
                        <h2 className="text-2xl font-bold text-white mb-2">{user?.name}</h2>
                        <p className="text-gray-400 mb-4">{user?.email}</p>
                        <NeonButton onClick={logout} className="text-sm px-4 py-1">
                            Logout
                        </NeonButton>
                    </div>

                    <div className="flex gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-neon-primary">{userMemories}</div>
                            <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                                <FaMemory /> Memories
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-neon-secondary">{favoriteMemories}</div>
                            <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                                <FaHeart /> Favorites
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <h3 className="text-2xl font-bold text-white mb-6">Your Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="text-center">
                    <h4 className="text-gray-400 mb-2">Member Since</h4>
                    <p className="text-xl font-bold text-white">Just now</p>
                </GlassCard>
                {/* Add more stats or charts here */}
            </div>
        </div>
    );
};

export default ProfilePage;
