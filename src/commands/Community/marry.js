const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

const marriageSchema = require('../../schemas/marriageSchema')
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("marry")
    .setDescription("Marry another user!")
    .addUserOption(option => option.setName("user").setDescription("The user you want to marry!").setRequired(true)),
    async execute(interaction) {
        
        const user1 = interaction.user.id;
        const user2 = interaction.options.getUser("user").id;
 
        // Check if the users are already married
        const existingMarriage = await marriageSchema.findOne({ user2 });
        const married = await marriageSchema.findOne({ user1 })
        if (existingMarriage) {
          return interaction.reply("You are already married to this user!");
        } else if (married) {
            return interaction.reply('you are already married to someone else')
        }
 
        // Create a new marriage record
        const newMarriage = new marriageSchema({ user1, user2 });
        await newMarriage.save();
 
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('accept')
              .setLabel('Accept')
              .setStyle('Success'),
            new ButtonBuilder()
              .setCustomId('deny')
              .setLabel('Deny')
              .setStyle('Danger')
          );
 
        const marriageEmbed = new EmbedBuilder()
          .setTitle('Marriage Request')
          .setDescription(`<@${interaction.user.id}> wants to marry you <@${interaction.options.getUser("user").id}>`);
 
         await interaction.reply({ embeds: [marriageEmbed], components: [row] });
 
        const filter = i => i.user.id === user2;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
 
        collector.on('collect', async i => {
          if (i.customId === 'accept') {
            // Update the marriage record with the acceptance
            await marriageSchema.findOneAndUpdate({ user1, user2 }, { accepted: true });
            const acceptedEmbed = new EmbedBuilder()
              .setTitle('Marriage Accepted')
              .setDescription(`<@${user2}> has accepted your marriage request! Congratulations! :tada:`);
            await i.reply({ embeds: [acceptedEmbed]});
          } else if (i.customId === 'deny') {
            // Delete the marriage record
            await marriageSchema.findOneAndDelete({ user1, user2 });
            const deniedEmbed = new EmbedBuilder()
              .setTitle('Marriage Denied')
              .setDescription(`<@${user2}> has denied your marriage request. :broken_heart:`);
            await i.reply({ embeds: [deniedEmbed]});
          }
        });
        
 
        collector.on('end', collected => {
          if (collected.size === 0) {
            // Delete the marriage record if it wasn't accepted in time
            marriageSchema.findOneAndDelete({ user1, user2 });
            const timeoutEmbed = new EmbedBuilder()
              .setTitle('Marriage Request Timed Out')
              .setDescription(`<@${user2}> didn't respond to your marriage request in time. :hourglass:`);
            interaction.editReply({ embeds: [timeoutEmbed], components: [] });
          }
        });
      }
    }      
 