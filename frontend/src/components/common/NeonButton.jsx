import React from 'react';
import { motion } from 'framer-motion';

const NeonButton = ({ children, onClick, type = 'button', className = '', isLoading = false }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`neon-button relative overflow-hidden ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : children}
        </motion.button>
    );
};

export default NeonButton;
