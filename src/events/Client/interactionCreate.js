const { EmbedBuilder, MessageFlags, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const blacklistSchema = require("../../schemas/blacklistSystem");
const { color, getTimestamp } = require('../../utils/loggingEffects.js');
const { checkDmUsability } = require("../../utils/commandParams/dmCommandCheck.js");
const { Api } = require('@top-gg/sdk');
const topgg = new Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Njc2ODk1MDgzMDg5MTAxOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjk2MDQ4MjA1fQ.9KLk2oeCZ3JUrklJPIvxqQw09KLEGYUDNBzSe-l6VmM");
const { checkUnderDevelopment } = require("../../utils/commandParams/underDevelopmentCheck.js");
const { logCommandError } = require("../../utils/errorLogging.js");
const db = require('../../lib/db');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        
        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.error(`${color.red}[${getTimestamp()}]${color.reset} [ERROR] Error in autocomplete:`, error);
            }
            return;
        }
        
        if (!interaction.isCommand()) return;
        

        const userData = await blacklistSchema.findOne({
            userId: interaction.user.id,
        });

        if (userData) {
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Ghost` })
            .setTitle(`You are blacklisted from using ${client.user.username}`)
            .setDescription(`Reason: ${userData.reason}`)
            .setColor(client.config.embedColor)
            .setFooter({ text: `You are blacklisted from using this bot` })
            .setTimestamp();

            const reply = await interaction.reply({ embeds: [embed], withResponse: true });
            setTimeout(async () => {
                await reply.delete();
            }, 5000);

            return;
        }

        const command = client.commands.get(interaction.commandName);
        
        if (command.voteRequired) {
        const btn_link = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Vote Me")
            .setEmoji("🔗")
            .setStyle(ButtonStyle.Link)
            .setURL("https://top.gg/bot/596768950830891018/vote")
        )

        const voted = new EmbedBuilder()
          .setTitle("Vote Required")
          .setDescription("**You must vote in [top.gg](https://top.gg/bot/596768950830891018/vote)to unlock this command**")
          .setFooter({ text: "Ghost | Vote Required" })
        
        const hasVoted = await topgg.hasVoted(interaction.user.id);
        if (!hasVoted) {
          interaction.reply({ embeds: [voted], components: [btn_link] });
          return;
        }
      }

        if (!command) return

        if (!checkDmUsability(command, interaction)) return;
        
        if (!checkUnderDevelopment(command, interaction)) return;
        
        if (command.voteOnly) { 
 const embed = new EmbedBuilder()
 .setColor('Red')
 .setDescription(`❌ Permission Error`,  `You need to vote the bot to use this commandn [Get support here](${client.config.support})`, true)
 }

        if (command.permissions && command.permissions.length) {
            const missingPerms = command.permissions.filter(perm => {
                if (!interaction.member.permissions.has(perm)) {
                    return true;
                }
                return false;
            }).map(perm => {
                return Object.keys(PermissionFlagsBits).find(p => 
                    PermissionFlagsBits[p] === perm
                ).replace(/_/g, ' ').toLowerCase();
            });

            if (missingPerms.length > 0) {
                return interaction.reply({ 
                    content: client.config.noPerms(missingPerms),
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
        
        try{
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`${color.red}[${getTimestamp()}] [INTERACTION_CREATE] Error while executing command. \n${color.red}[${getTimestamp()}] [INTERACTION_CREATE] Please check you are using the correct execute method: "async execute(interaction, client)": \n${color.red}[${getTimestamp()}] [INTERACTION_CREATE]`, error);

            await logCommandError(error, interaction, client);



            const errorEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`There was an error while executing this command!\n\`\`\`${error}\`\`\``)

            try {
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.followUp({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral });
                }
            } catch (replyError) {
                console.error(`${color.red}[${getTimestamp()}] [INTERACTION_CREATE] Failed to reply to interaction:`, replyError);
            }
        }
    },
};