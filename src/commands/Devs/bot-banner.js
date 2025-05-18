
const { SlashCommandBuilder, EmbedBuilder, REST, Routes, DataResolver } = require('discord.js');

module.exports = {
    usableInDms: true,
    category: ['Owner'],
    data: new SlashCommandBuilder()
	.setName('bot-banner')
	.setDescription('Add an animated banner (DEV ONLY)')
	.addAttachmentOption(option => option.setName('banner').setDescription('The banner you want to add').setRequired(true)),

	async execute (interaction, client) {
            const { token, devid } = process.env;
		    const authorizedIDs = devid.split(' ');
            const { options } = interaction;
            const banner = options.getAttachment("banner");
            
            if (!authorizedIDs.includes(interaction.user.id)) { 
				return await interaction.reply(`❌ You are not **authorized** to **execute** this command!`);
			};
        
            async function sendMessage(message) {
              const embed = new EmbedBuilder()
                .setColor(`'Purple'`)
                .setDescription(message);
        
              await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
            }
            
            if (banner.contentType !== "image/gif" && banner.contentType !== "image/png")
                return await sendMessage(`❌ Please use a **GIF** or a **PNG** format for banners`);
            
            var error;

            const rest = new REST().setToken(token);
            await rest.patch(Routes.user(), {
                body: { banner: await DataResolver.resolveImage(banner.url) },
            });

            if (error) return;

            await sendMessage(` ✅ The banner has been **successfully** uploaded!`);
        }
    };