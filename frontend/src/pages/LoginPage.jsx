import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/common/GlassCard';
import NeonButton from '../components/common/NeonButton';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            // Error handled in context
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <GlassCard className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary tracking-widest hover:scale-105 transition-transform mb-6">
                        MEMORIX
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Unlock your memory vault</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="input-field"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="input-field"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <NeonButton type="submit" className="w-full" isLoading={isLoading}>
                        Login
                    </NeonButton>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-neon-primary hover:text-white transition-colors">
                        Register here
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
};

export default LoginPage;
