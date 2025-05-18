const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    usableInDms: true,
    category: ['Fun'],
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get a random image of a cute cat"),
  async execute(interaction) {
    try {
      await interaction.reply("Looking for kitty...");
        
         const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
        
        const embed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle('🐱 Meow...')
        .setImage(response.data[0].url)
        

     
       

      await interaction.editReply({ content: "Found one!", embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.editReply(
        "Sorry, something went wrong while fetching a cute cat image."
      );
    }
  },
};