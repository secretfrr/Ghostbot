const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const { EmbedBuilder } = require('discord.js');

const ms = require("ms");
 
 
module.exports = {
    usableInDms: true,
    category: "Fun",
    Cooldown: ms("5s"),
    voteOnly: true,
    data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription('Ask a question and get a random respone.')
    .addStringOption(option =>
        option
        .setName('question')
        .setDescription('Question to ask the 8-ball')
        .setMinLength(10)
        .setMaxLength(250)
        .setRequired(true)
    )
    .addBooleanOption(option => option
        .setName('hidden')
        .setDescription('Whether or not to hide the respone from the 8-ball (displayed by default)')
    ),
 
    async execute(interaction){
        const { options, user } = await interaction;
        const question = await options.getString('question');
        const hidden = await options.getBoolean('hidden');
 
       
        let randomNum = Math.floor(Math.random() * responses.length-0.001);
 
        const embed = new EmbedBuilder()
          .setTitle('8-ball')
          .setAuthor({ name: user.username, avatar: user.displayAvatarURL()})
          .setColor('Gold')
          .addFields(
            {
                name: 'Question',
                value: question
            },
            {
            name: 'Response',
            value: responses[randomNum]
            }
          );
 
        interaction.reply({ephemeral: hidden, embeds: [embed]});
    }
}
 
 
 
const responses = [
 
    "It is certain.",
  
    "Without a doubt.",
  
    "You may rely on it.",
  
    "Yes, definitely.",
  
    "It is decidedly so.",
  
    "As I see it, yes.",
  
    "Most likely.",
  
    "Yes.",
  
    "Outlook good.",
  
    "Signs point to yes.",
  
    "Reply hazy, try again.",
  
    "Better not tell you now.",
  
    "Ask again later.",
  
    "Cannot predict now.",
  
    "Concentrate and ask again.",
  
    "Don't count on it.",
  
    "Outlook not so good.",
  
    "My sources say no.",
  
    "Very doubtful.",
  
    "My reply is no.",
  
    "No.",
  
    "Definitely not.",
  
    "No way.",
  
    "I highly doubt it.",
  
    "Absolutely not.",
    
    "Fuck no Bitch.",
    
    "No, suck my dick."
  
  ];