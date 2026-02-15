const express = require('express');
const router = express.Router();
const {
    getMemories,
    getMemory,
    createMemory,
    updateMemory,
    deleteMemory,
    toggleFavorite
} = require('../controllers/memoryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, getMemories)
    .post(protect, upload.array('media', 10), createMemory);

router.route('/:id')
    .get(protect, getMemory)
    .put(protect, updateMemory)
    .delete(protect, deleteMemory);

router.patch('/:id/favorite', protect, toggleFavorite);

module.exports = router;
