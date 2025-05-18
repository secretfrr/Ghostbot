const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "unmute",
    aliases: ['unm'],
    description:"Unmute a member.",
        
        async execute (client, message, args) {
            const timeUser = message.mentions.members.first() ||
                  message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" " || x.user.username === args[0]));
            
            if (!message.members.permissioms.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("You do not have permission to unmute members in this server.");
            if (!timeUser) return message.channel.send("Please specify a member to unmute.");
        }
}