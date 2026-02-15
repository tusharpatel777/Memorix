const Memory = require('../models/Memory');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get user's memories
// @route   GET /api/memories
// @access  Private
const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(memories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single memory
// @route   GET /api/memories/:id
// @access  Private
const getMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Check for user
        if (memory.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.status(200).json(memory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new memory
// @route   POST /api/memories
// @access  Private
const createMemory = async (req, res) => {
    try {
        const { title, description, tags, location, mood, isFavorite } = req.body;
        let media = [];

        if (req.files) {
            media = req.files.map((file) => ({
                url: file.path,
                public_id: file.filename,
                type: file.mimetype.startsWith('video') ? 'video' : 'image',
            }));
        }

        const memory = await Memory.create({
            user: req.user.id,
            title,
            description,
            media,
            tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
            location,
            mood,
            isFavorite: isFavorite === 'true',
        });

        res.status(201).json(memory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update memory
// @route   PUT /api/memories/:id
// @access  Private
const updateMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Check for user
        if (memory.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedMemory = await Memory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedMemory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete memory
// @route   DELETE /api/memories/:id
// @access  Private
const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Check for user
        if (memory.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Delete media from Cloudinary
        if (memory.media && memory.media.length > 0) {
            for (const file of memory.media) {
                await cloudinary.uploader.destroy(file.public_id, { resource_type: file.type });
            }
        }

        await memory.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle favorite
// @route   PATCH /api/memories/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Check for user
        if (memory.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        memory.isFavorite = !memory.isFavorite;
        await memory.save();

        res.status(200).json(memory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMemories,
    getMemory,
    createMemory,
    updateMemory,
    deleteMemory,
    toggleFavorite
};
