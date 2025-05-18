const { model, Schema } = require('mongoose');

const reactor = new Schema({
    Guild: String,
    Channel: String,
    Emoji: String
})

module.exports = model('reactorschema', reactor);