const mongoose = require('mongoose');


const wordSchema = new mongoose.Schema({

guildId: {

type: String,

required: true,

},

word: {

type: String,

required: true,

unique: true, // Ensures that each word is unique in the guild

},

});


const WordModel = mongoose.model('Word', wordSchema);


module.exports = WordModel;