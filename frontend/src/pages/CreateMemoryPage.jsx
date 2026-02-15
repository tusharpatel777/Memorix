import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useMemories } from '../context/MemoryContext';
import GlassCard from '../components/common/GlassCard';
import NeonButton from '../components/common/NeonButton';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const CreateMemoryPage = () => {
    const navigate = useNavigate();
    const { createMemory, isLoading } = useMemories();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState('');
    const [mood, setMood] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
        const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [], 'video/*': [] } });

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('location', location);
        formData.append('mood', mood);
        formData.append('isFavorite', String(isFavorite));
        files.forEach((file) => formData.append('media', file));

        try {
            await createMemory(formData);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-primary to-neon-secondary mb-8 text-center">
                Create New Memory
            </h1>

            <GlassCard>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-field"
                            placeholder="Give your memory a title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input-field h-32 resize-none"
                            placeholder="Describe what happened..."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Media (Images & Videos)</label>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-neon-primary bg-neon-primary/10' : 'border-gray-600 hover:border-gray-500'
                                }`}
                        >
                            <input {...getInputProps()} />
                            <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
                            <p className="text-gray-400">Drag & drop files here, or click to select files</p>
                        </div>

                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative group rounded-lg overflow-hidden h-24">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="input-field"
                                placeholder="e.g. travel, birthday, fun"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Location</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="input-field"
                                placeholder="Where did this happen?"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2 text-sm">Mood</label>
                            <input
                                type="text"
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                                className="input-field"
                                placeholder="How did you feel?"
                            />
                        </div>
                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={isFavorite}
                                    onChange={(e) => setIsFavorite(e.target.checked)}
                                    className="w-5 h-5 accent-neon-secondary rounded"
                                />
                                Mark as Favorite
                            </label>
                        </div>
                    </div>

                    <NeonButton type="submit" className="w-full mt-8" isLoading={isLoading}>
                        Save Memory
                    </NeonButton>
                </form>
            </GlassCard>
        </div>
    );
};

export default CreateMemoryPage;
