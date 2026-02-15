const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    media: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true }
    }],
    tags: [String],
    location: { type: String },
    mood: { type: String },
    isFavorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Memory', memorySchema);
