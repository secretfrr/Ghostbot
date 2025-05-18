
const mongoose = require('mongoose');

const bumpSchema = new mongoose.Schema({
    userId: { type: String },
    username: { type: String },
    bumpCount: { type: Number, default: 0 },
    lastBump: { type: Date, default: null },
    Guild: { type: String, unique: true },
    reminders: [
        {
            sendAt: { type: Date, required: true }, 
            sent: { type: Boolean, default: false }, 
        }
    ]
});

module.exports = mongoose.model('Bump', bumpSchema);