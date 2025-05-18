const mongoose = require('mongoose');

const AntiSpamSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false, // Set to true if you want the system enabled by default
    },
    punishments: {
        MaxSpamMessageLimit: {
            limit: {
                type: Number,
                default: 5, // Example limit for maximum spam messages
            },
            action: {
                type: String,
                enum: ['kick', 'ban', 'warn', 'mute'],
                default: 'warn', // Default action to be taken
            },
        },
        MaxMentionsLimit: {
            limit: {
                type: Number,
                default: 10, // Example limit for maximum mentions
            },
            action: {
                type: String,
                enum: ['kick', 'ban', 'warn', 'mute'],
                default: 'warn', // Default action to be taken
            },
        },
        MaxLinksLimit: {
            limit: {
                type: Number,
                default: 3, // Example limit for maximum links
            },
            action: {
                type: String,
                enum: ['kick', 'ban', 'warn', 'mute'],
                default: 'mute', // Default action to be taken
            },
        },
        MaxCapsLimit: {
            limit: {
                type: Number,
                default: 70, // Example limit for maximum percentage of caps allowed in a message
            },
            action: {
                type: String,
                enum: ['kick', 'ban', 'warn', 'mute'],
                default: 'warn', // Default action to be taken
            },
        },
        // Add more limits and punishments as needed
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('AntiSpam', AntiSpamSchema);
