const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'ownerRobloxAccount',
    aliases : ['banks'],
    category: ['Community'],
    async execute(message, client, args) {
        
        message.channel.send({ content: 'https://www.roblox.com/users/3927632358/profile'});
    }
}   