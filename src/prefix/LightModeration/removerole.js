const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "removerole",
    aliases: ["rrole", "rr"],
    async execute(message, client, args) {

        const user = message.guild.members.cache.get(args[1]) || message.mentions.members.first();
        const role = message.guild.roles.cache.get(args[2]) || message.mentions.roles.first();

        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) return message.channel.send({ content: `${client.config.noPerms}`, ephemeral: true });
        if (!user) return message.channel.send({ content: 'Please mention a **user** to remove a role from.', ephemeral: true });
        if (!role) return message.channel.send({ content: 'Please mention a **role** to remove.', ephemeral: true });
await message.delete()
        user.roles.remove(role).catch(err => {
            return message.reply({ content: `**Couldn't** remove that role! **Check** my permissions and **role position** and try again.`, ephemeral: true });
        })

        const roleEmbed = new EmbedBuilder()
        .setColor(client.config.embedModLight)

        .setDescription(`> Removed <@&${role.id}> from ${user}`)
        .setFooter({ text: `Role removed by ${message.author.tag}` })
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embeds: [roleEmbed] });
    }
}