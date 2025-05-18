const mongoose = require('mongoose');

const guildDataSchema = new mongoose.Schema({
    guildId:
    {
        type: String,
        require: true,
        unique: true,
    },
    roles: [
        {
            roleId: {
                type: String,
                 required: true,
           },
            roleName: {
                type: String,
                required: true,
            },
            coins: {
                type: Number,
                required: true,
                default: 0,
            }
        
        }
    ]
})

module.exports = mongoose.model('GuildData', guildDataSchema);