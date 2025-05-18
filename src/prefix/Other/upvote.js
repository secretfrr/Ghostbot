const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'upvote',
    aliases : ['vote'],
    async execute(message, client, args) {
      
        const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Njc2ODk1MDgzMDg5MTAxOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNzIyMjg3NDA0fQ.Od_1cFlctiOV8lFGfnNnQ_uLwUVZPOklizFZgmHpKTk";
        const botId = "596768950830891018";
        const userId = message.author.id;
        
        try {
            const response = await fetch(`https://top.gg/api/bots/${botId}/check?userId=${userId}`,              {
                headers: {
                    Authorization: apiKey,
                },
            });
            
            if (response.ok) {
                const data = await response.json(); //1
                
                if (data.voted ===1) {
                  //code
                return message.reply("You are able to use this command!")
                } else if (data.voted === 0) {
                    const voteEmbed = new EmbedBuilder()
                    .setDescription("Please vote for our bot to use this command.")
                    
                    return message.reply({ embeds: [voteEmbed] })
                }
            } else {
                return message.reply("There was an error!")
            }
        } catch (error) {
            console.error("Error:", error)
            return message.reply("There was an error on the website")
        }
      }
}