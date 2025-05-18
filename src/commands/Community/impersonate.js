const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, MessageFlags } = require("discord.js");
const filter = require('../../jsons/filter.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("impersonate")
    .setDescription("Makes you look like someone else")
    .addUserOption(option => option.setName("user").setDescription("Mention a user to impersonate").setRequired(true))
    .addStringOption(option => option.setName("message").setDescription("What message do you want the user to type?").setRequired(true)),

    async execute(interaction, client) {
        
        
        if(interaction.member.id !== '375931932036431873') return interaction.reply({ content: 'this command is locked under the owner', ephemeral: false})

        const { options } = interaction;

        const member = options.getUser("user");
        const message = options.getString("message");


        if (message.includes('@here') || message.includes('@here')) return await interaction.reply({ 
            content: `You **cannot** mention \`\`everyone/here\`\` with this command`, 
            flags: MessageFlags.Ephemeral
        });
        
        interaction.channel.createWebhook({ name: member.username, avatar: member.displayAvatarURL({ dynamic: true })}).then((webhook) => {
        
            webhook.send({ content: message });
            setTimeout(() => {
                webhook.delete();
            }, 3000);
        });
        
        interaction.reply({ content: `${member || "user"} has been **successfully** impersonated <#${interaction.channel.id}>!`, flags: MessageFlags.Ephemeral });
    },
};