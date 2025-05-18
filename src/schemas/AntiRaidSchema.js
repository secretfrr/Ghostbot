const mongoose = require('mongoose');

const massJoinProtectionSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: false
    },
    massJoinLimit: {
        type: Number,
        required: false
    },
    punishment: {
        type: String,
        enum: ['mute', 'kick', 'ban', 'lockChannels', 'hideChannels'],
        required: true
    },
    timeLimit: {
        type: Number,
        default: 15  
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    joins: [
        {
            userId: String,
            time: Number
        }
    ]
});

module.exports = mongoose.model('MassJoinProtection', massJoinProtectionSchema);
