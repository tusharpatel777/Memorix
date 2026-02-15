import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const MemoryContext = createContext();

export const MemoryProvider = ({ children }) => {
    const [memories, setMemories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const fetchMemories = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const response = await axios.get('/memories');
            setMemories(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch memories');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMemories();
    }, [fetchMemories]);

    const createMemory = async (formData) => {
        setIsLoading(true);
        try {
            const response = await axios.post('/memories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMemories((prev) => [response.data, ...prev]);
            toast.success('Memory created successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create memory');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteMemory = async (id) => {
        try {
            await axios.delete(`/memories/${id}`);
            setMemories((prev) => prev.filter((m) => m._id !== id));
            toast.success('Memory deleted');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete memory');
        }
    };

    const toggleFavorite = async (id) => {
        try {
            const response = await axios.patch(`/memories/${id}/favorite`);
            setMemories((prev) =>
                prev.map((m) => (m._id === id ? { ...m, isFavorite: response.data.isFavorite } : m))
            );
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update favorite');
        }
    };

    const getMemory = async (id) => {
        try {
            const response = await axios.get(`/memories/${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch memory');
            return null;
        }
    }

    return (
        <MemoryContext.Provider
            value={{
                memories,
                isLoading,
                fetchMemories,
                createMemory,
                deleteMemory,
                toggleFavorite,
                getMemory
            }}
        >
            {children}
        </MemoryContext.Provider>
    );
};

export const useMemories = () => {
    const context = useContext(MemoryContext);
    if (context === undefined) {
        throw new Error('useMemories must be used within a MemoryProvider');
    }
    return context;
};
