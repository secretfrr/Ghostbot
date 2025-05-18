const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'say',
    description: 'say',
    async execute(message, args) {
        
        // Replace 'ROLE_ID' with the ID of the role you want
        const requiredRoleID = '1241161356510625832';

        // Check if the user has the specific role
        if (!message.member.roles.cache.has(requiredRoleID)) {
            return message.reply(':x: | You don\'t have the required role to use this command.');
        }

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL() })
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${args.join(' ')}`)
            .setFooter({ text: `Say system`, iconURL: message.guild.iconURL() })
            .setTimestamp();

        await message.delete();

        return await message.channel.send({ embeds: [embed] });
    }
};