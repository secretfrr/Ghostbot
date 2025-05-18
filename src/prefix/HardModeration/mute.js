const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'To timeout member.',

     async execute(client, message, args) {
        const timeUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" " || x.user.username === args[0]));
        const duration = args[1];

        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("You don't have permission to mute members.");
        if (!timeUser) return message.channel.send("Please specify a member to mute.");
        if (message.member === timeUser) return message.channel.send("You can't mute yourself.");
        if (!duration) return message.channel.send("Please specify a duration!");
        if (!timeUser.kickable) return message.channel.send("Please specify a duration between 1 & 604800 (one week) seconds.");
        if (duration > 604800) return message.channel.send("Please specify a duration between 1 & 604800!");


        if (isNaN(duration)) {
            return message.channel.send("Please specify a valid duration.");

        }

        let reason = args.slice(2).join(" ") || "No reason given.";

        const embed = new EmbedBuilder()
        .setColor("#00c7fe")
        .setDescription(`Successfully muted ${timeUser.user.tag} for ${duration} seconds | ${reason}` )


        const dmembed = new EmbedBuilder()
            .setColor("#00c7fe")
            .setDescription(`You have been **muted** in **${message.guild.name}** for **${duration}** seconds | ${reason}`);


        timeUser.timeout(duration * 1000, reason);

        message.channel.send({ embeds: [embed]});

        timeUser.send({ embeds: [dmembed]}).catch(err => {
            return;
        })

    
    }
}