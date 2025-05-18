const mongoose = require("mongoose");

const AllowedChannelLinks = new mongoose.Schema({
    Guild: String,
    Channel: String,
});

module.exports = mongoose.model('AllowedChannelLinks', AllowedChannelLinks);