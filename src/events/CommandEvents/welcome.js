const { WelcomeLeave } = require("canvafy");
const welcomeSchema = require("../../schemas/welcomeSchema");

const { EmbedBuilder } = require('discord.js');

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client, message) {
    const data = await welcomeSchema.findOne({
      guildid: member.guild.id,
    });
      
      const guild = member.guild;

    if (!data) return;

      
          const embed = new EmbedBuilder()
          .setTitle(`Welcome ${member} to ${guild.name}!`)
                          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setFooter({
                    text: 'Enjoy your stay!',
                    iconURL: guild.iconURL({ dynamic: true, size: 1024 }),
                })
                .setTimestamp()
      
      
      

    member.guild.channels.cache.get(data.channel).send({ content: `${member}`,
        
        embeds: [embed]
        
          
      })
    }
    
  }
