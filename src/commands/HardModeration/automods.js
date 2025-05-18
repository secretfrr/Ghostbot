const { SlashCommandBuilder, EmbedBuilder,  PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
    usableInDms: false,
    category: "Utility",
    permissions: [PermissionFlagsBits.Administrator],
    data: new SlashCommandBuilder()
    .setName('automods')
    .setDescription('Set up the auto mod system')
    .addSubcommand(command => command.setName('flagged-words').setDescription('Block profanitym, sexual content, and slurs'))
    .addSubcommand(command => command.setName('spam-messages').setDescription('Block messages suspected of spam'))
    .addSubcommand(command => command.setName('mention-spam').setDescription('Block ]messages containing a certain amount of mentions').addIntegerOption(option => option.setName('number').setDescription('The number of mentions to allow before it blocks').setRequired(true)))
    .addSubcommand(command => command.setName('keyword').setDescription('Block a keyword in the server').addStringOption(option => option.setName('word').setDescription('The key word to block from being allowed to be sent').setRequired(true))),
    async execute (interaction) {
        
        const { guild, options } = interaction;
        const sub = options.getSubcommand();
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `<:Closed:1266583186893443145> You do not have permission to setup automod in this server`, ephemeral: true })
        
        switch (sub) {
            case 'flagged-words':
                
                await interaction.reply({ content: `<a:verspace:1266583193923092592> Loading your autmod rule...`});
                
                const rule = await guild.autoModerationRules.create({
                    name: 'Block-profanity, sexual content, and slurs by ghost',
                    creatorId: '596768950830891018',
                    enabled: true,
                    eventType: 1,
                    triggerType: 4,
                    triggerMetadata:
                    {
                        presets: [1, 2, 3]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: `This message was prevented by Ghosts automod`
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule) return;
                    
                    const embed = new EmbedBuilder()
                    .setColor('Purple')
                    .setDescription(`<:validate_blue_purple:1266583067326414943> Your automod rule has been created. Swears will be stopped by Ghost`)
                    
                    await interaction.editReply({ content: ``, embeds: [embed] });
                }, 3000)
                
                break;
                
            case 'keyword':
                
                await interaction.reply({ content: `<a:verspace:1266583193923092592> Loading your autmod rule...`});
                const word = options.getString('word');
                
                const rule2 = await guild.autoModerationRules.create({
                    name:  `Prevent the word ${word} from being sent by ghost`,
                    creatorId: '596768950830891018',
                    enabled: true,
                    eventType: 1,
                    triggerType: 1,
                    triggerMetadata:
                    {
                        keywordFilter: [`${word}`]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: `This message was prevented by Ghosts automod`
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule2) return;
                    
                    const embed2 = new EmbedBuilder()
                    .setColor('Purple')
                    .setDescription(`<:validate_blue_purple:1266583067326414943> Your automod rule has been created. All messages containing the word ${word} will be deleted by Ghost`)
                    
                    await interaction.editReply({ content: ``, embeds: [embed2] });
                }, 3000)
                
                break;
                
            case 'spam-messages':
                
                await interaction.reply({ content: `<a:verspace:1266583193923092592> Loading your automod rule...`});
                
                
                const rule3 = await guild.autoModerationRules.create({
                    name: 'Block spam messages by Ghost',
                    creatorId: '596768950830891018',
                    enabled: true,
                    eventType: 1,
                    triggerType: 3,
                    triggerMetadata:
                    {
                        // mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: `This message was prevented by Ghosts automod`
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule3) return;
                    
                    const embed3 = new EmbedBuilder()
                    .setColor('Purple')
                    .setDescription(`<:validate_blue_purple:1266583067326414943> Your automod rule has been created. Spam messages will be stopped by Ghost`)
                    
                    await interaction.editReply({ content: ``, embeds: [embed3] });
                }, 3000)
                
                break;
                
            case 'mention-spam':
                
                await interaction.reply({ content: `<a:verspace:1266583193923092592> Loading your automod rule...`});
                const number = options.getInteger('number');
                
                const rule4 = await guild.autoModerationRules.create({
                    name: 'Block Mention Spam by Ghost',
                    creatorId: '596768950830891018',
                    enabled: true,
                    eventType: 1,
                    triggerType: 5,
                    triggerMetadata:
                    {
                        mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: `This message was prevented by Ghosts automod`
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule4) return;
                    
                    const embed4 = new EmbedBuilder()
                    .setColor('Purple')
                    .setDescription(`<:validate_blue_purple:1266583067326414943> Your automod rule has been created. Spam mentions will be stopped by Ghost`)
                    
                    await interaction.editReply({ content: ``, embeds: [embed4] });
                }, 3000)
                
        }
    }
}