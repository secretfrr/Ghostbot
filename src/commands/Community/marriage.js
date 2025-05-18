const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const ms = require('ms');
 
// Define the schema for the marriage data
const marriageSchema = require('../../schemas/marriageSchema')
 
module.exports = {
    usableInDms: true,
    category: ['Marriage'],
  data: new SlashCommandBuilder()
    .setName("marriage")
    .setDescription("Check who you're married to!"),
  async execute(interaction) {
    // Get the author's user ID
    const authorId = interaction.user.id;
      let timeAdded = '12h';
 
    // Check if the author is married
    const existingMarriage = await marriageSchema.findOne({ $or: [{ user1: authorId }, { user2: authorId }] });
    if (!existingMarriage) {
      return interaction.reply("You are not married to anyone! ");
    }
 
    // Get the ID of the spouse
    const spouseId = existingMarriage.user1 === authorId ? existingMarriage.user2 : existingMarriage.user1;
 
    // Get the user object of the spouse
    const spouseUser = await interaction.client.users.fetch(spouseId);
 
    // Create and send the embed
    const marriageEmbed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle("Ghost")
      .setDescription(`You are married to ${spouseUser.username}!<a:Milk_And_Mochi_5:1157440586345885846> \n `)
  .setTimestamp(Date.now());
    await interaction.reply({ embeds: [marriageEmbed] });
  }
};