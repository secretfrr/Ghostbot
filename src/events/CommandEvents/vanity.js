const { EmbedBuilder, ChannelType } = require('discord.js');
const Vanity = require('../../schemas/vanitySchema'); // the appropriate location for the schema file

module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        const guildId = newPresence.guild.id;
        const settings = await Vanity.findOne({ guildId });

        if (!settings) return;

        const { vanity, channelId, roleId } = settings;
        const member = newPresence.member;

        // Check if the new presence has the vanity URL in the custom status
        if (newPresence.activities.some(activity => activity.state && activity.state.includes(vanity))) {
            const roleToAdd = member.guild.roles.cache.get(roleId);
            if (roleToAdd) {
                await member.roles.add(roleToAdd);
            }
            else if (newPresence.activities.some(activity => activity.state && activity.state.includes(!vanity))) {
                const roleToRemove = member.guild.roles.cache.get(roleId);
                if (roleToRemove) {
                    await member.roles.remove(roleToRemove);
                }
            }

            const channelToSend = member.guild.channels.cache.get(channelId);
            if (channelToSend && channelToSend.type === ChannelType.GuildText) {
                const embed = new EmbedBuilder()
                    .setDescription(`Thank you ${member} for using ${vanity} in your status. You have received access to send pictures and a distinguished role on the server.`)
                    .setAuthor({ iconURL: member.guild.iconURL(), name: member.guild.name })
                    .setColor('#2f3136')
                    .setTimestamp();

                await channelToSend.send({ embeds: [embed] });
                
                // If you want only message to show on specific channel, remove EmbedBuilder and change it to:
                // await channelToSend.send({ content: `Thank you ${member} for using ${vanity} in your status. You have received access to send pictures and a distinguished role on the server.`});
                // It should works as well.
         }
      }
   }
}    
    