const mongoose = require("mongoose")

module.exports = mongoose.model(
    "changelog",
        new mongoose.Schema({
            ident: String,
            changelog: String,
			date: String
        })
);