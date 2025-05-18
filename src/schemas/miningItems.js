const mongoose = require('mongoose');

const miningItemSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemEmoji: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

const MiningItem = mongoose.model('MiningItem', miningItemSchema);

module.exports = MiningItem;