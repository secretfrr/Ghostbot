const {
  SlashCommandBuilder,
  EmbedBuilder, ChatInputCommandInteraction
} = require('discord.js');

const userDatas = require('../../schemas/UserSchema');

/**
 * @param {CountingBot} client
 * @param {ChatInputCommandInteraction} interaction
 */
  

module.exports = {
    usableInDms: true,
    category: ['Utility'],
    data: new SlashCommandBuilder()
        .setName('votes')
        .setDescription('Check your vote stats.'),
    
    async execute(interaction, client) {
        
        
        const userData = await userDatas.findOne({
          id: interaction.user.id,
        });
        
        if (!userData) {
          await userDatas.create({
            id: interaction.user.id,
            name: interaction.user.username
          })
        };
        const red = "Red";
        const green = "Green";

        const now = new Date();
        const lastVoted = userData.vote.time;
        const voteMs = 1000 * 60 * 60 * 12;
        const resolve = now - lastVoted;
        const embed = new EmbedBuilder()
        
        

        if (resolve < voteMs) {
            const remainingTime = voteMs - resolve;
            const remainingTimeHours = Math.floor(remainingTime / (1000 * 60 * 60));
            const remainingTimeMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            
             embed.setDescription(`**You have already voted.** \n\n> You can vote after **${remainingTimeHours}** hour, **${remainingTimeMinutes}** minute(s).`)
            embed.setTitle(`Voting For Ghost`)
            embed.setTimestamp()
            embed.setColor('#00FF00')
            await interaction.reply({ embeds: [embed] });
        } else {
            
            embed.setDescription(`**Your vote is available.** \n\n> Vote now by clicking **[here](https://top.gg/bot/${client.config.clientId}/vote)**!`)
            embed.setTitle(`Voting For Ghost`)
            embed.setTimestamp()
            embed.setColor('#00FF00')
            await interaction.reply({ embeds: [embed] });
        }
    },
};