const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
 
// Define the schema for the marriage data
const marriageSchema = require('../../schemas/marriageSchema')
 
module.exports = {
    usableInDms: false,
    category: ['Marriage'],
  data: new SlashCommandBuilder()
    .setName("divorce")
    .setDescription("Divorce your spouse!")
    .addUserOption(option => option.setName("user").setDescription("The user you want to Divorce!").setRequired(true)),
  async execute(interaction) {
    // Get the users involved in the divorce
    const user1 = interaction.user.id;
    const user2 = interaction.options.getUser("user")?.id;
 
    // Check if the users are married
    const existingMarriage = await marriageSchema.findOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });
    if (!existingMarriage) {
      return interaction.reply("You are not married to anyone!");
    }
 
    // Remove the marriage record
    await marriageSchema.findByIdAndRemove(existingMarriage._id);
 
    // Send a message confirming the divorce
    const divorceEmbed = new EmbedBuilder()
      .setColor('Red')
      .setTitle("Divorce Finalized")
      .setDescription(`You are now divorced from ${interaction.options.getUser("user").username}!`);
    await interaction.reply({ embeds: [divorceEmbed] });
  }
};
 