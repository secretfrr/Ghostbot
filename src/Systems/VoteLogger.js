
const { EmbedBuilder } = require("discord.js");
/**
 *@paem {CountingBot} client
 *@param {Staring} id
 *@param {Staring} name
 */

async function VoteLog(client, id, name) {
  
  const channel = await client.channels.cache.get(client.config.voteLog);
  
  const image = `https://top.gg/api/widget/${client.config.clientId}.svg`;

  await channel.send({
    content: `<@${id}>`,
    embeds: [
      new EmbedBuilder()
        .setTitle(`${name} Just Voted!`)
        .setImage(image)
        .setColor('Purple')
        .setTimestamp()
        .setDescription(`Thank's for voting **[Ghost](https://top.gg/bot/${client.config.clientId})**.`)
        .setFooter({ text: `Ghost 2019 - 2025`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
    ]
  })
}

module.exports = { VoteLog };