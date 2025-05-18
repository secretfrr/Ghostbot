async function cooldownSend({ user, command, time, left }, interaction) {
 

  const errorEmbed = new EmbedBuilder()
    .setAuthor({
      name: `${interaction.user.tag} | ${interaction.user.id}`,
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    })
    .setDescription(
      `⚠️ Alert: Please wait ${left} Seconds before running this command again.`
    )
    .setColor("Red")
   
    .setFooter({ text: "⏱️ Cooldown Alert" })
    .setTimestamp();

  await interaction.reply({
    embeds: [errorEmbed],
    ephemeral: false,
  });
}

module.exports = { cooldownSend };