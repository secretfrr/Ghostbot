const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = {
    name: 'support',
    aliases : ['ghost'],
    async execute(message, client, args) {
        
        const embed = new EmbedBuilder()
        .setDescription('Join the support server [here](https://discord.gg/tYvw4RHC8w) for bot related inquiries')
        .setFooter({ text: `Ghost Support`})
        .setTimestamp()
        
         const btn_link = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Vote Me")
      .setEmoji("🔗")
      .setStyle(ButtonStyle.Link)
      .setURL("https://top.gg/bot/596768950830891018/vote")
  )
         const invite_link = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Join here")
      .setEmoji("<:crown2:1266583145050931272>")
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.gg/tYvw4RHC8w")
  )
    
        message.channel.send({ embeds: [embed], components: [btn_link, invite_link] })
      }
}