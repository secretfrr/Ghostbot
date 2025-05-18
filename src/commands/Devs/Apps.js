const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle, TextInputBuilder, MessageFlags } = require('discord.js');
const { slashPaginate } = require('embed-pagination.js')
const axios = require('axios');

const endpoint = 'https://sheetdb.io/api/v1/poxeyn4ypv3xy'; //replace this link with your sheetdb.io link (https://sheetdb.io/)

module.exports = {
    data: new SlashCommandBuilder()
    .setName("application")
    .setDescription('Commands related to applications n stuff')
    .addSubcommand(c => c.setName("submit").setDescription("Submit an application").addStringOption(o => o.setName("job").setDescription("The type of job you want to apply for").setRequired(true).setChoices(
        {name:'Administrator',value:"admin"},
        {name:'Moderator',value:"mod"},
        {name:'Helper',value:"helper"}
    )))
    .addSubcommand(c => c.setName("view").setDescription("Find an application").addStringOption(o => o.setName("type").setDescription("The type of job you want to apply for").setRequired(true).setChoices(
        {name:'Administrator',value:"admin"},
        {name:'Moderator',value:"mod"},
        {name:'Helper',value:"helper"},
    ))),

    async execute (interaction, client) {
        const { user, options } = interaction;
        const sub = options.getSubcommand();
        if (sub === 'submit') {
        const job = options.getString('job');

        let reason = new TextInputBuilder()
        .setCustomId('reason_for_hire')
        .setLabel("Why should we hire you?")
        .setMinLength(50)
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        reason = new ActionRowBuilder().setComponents(reason);

        const modal = new ModalBuilder()
        .setCustomId('reason_modal')
        .setTitle(`Hiring`)
        .setComponents(reason)

        await interaction.showModal(modal);

        client.on('interactionCreate', async (i) => {
            if (i.isModalSubmit()) {
                if (i.customId === 'reason_modal') {
                    const reason = i.fields.getTextInputValue('reason_for_hire');

                    await axios.post(endpoint, {
                        data: {
                            discord_user: i.user.username,
                            discord_user_id: i.user.id,
                            job: job,
                            reason: reason,
                        }
                    })

                    await i.reply({ content: "Your application was submitted", flags: MessageFlags.Ephemeral })
                }
            }
        })
    }
    if (sub === 'view') {
        const type = options.getString('type')

        let response = await fetch(`${endpoint}/search?job=${type}`)
        if(type === 'all') response = await fetch(endpoint);
        response = await response.json();
        if (response.length == 0) return await interaction.reply({ content: "There is no applications matching that job.", flags: MessageFlags.Ephemeral })
        const embeds = [];
        for (let val of response) {
            const i = response.indexOf(val)
            const discord_user_id = val.discord_user_id;
            const user = interaction.guild.members.cache.get(discord_user_id);
            if (!user) continue;
            
            let job = val.job;
            if (job == 'admin') job = 'Administrator';
            if (job == 'mod') job = "Moderator";
            if (job == 'helper') job = "Helper";
            
            const reason = val.reason  
            embeds.push(
                new EmbedBuilder()
                .setColor('Purple')
                .setTitle(`Application (${i+1}):`)
                .setDescription(`**User:** ${user} (${user.user.username})\n**Job:** ${job}\n\n**Reason:** \`\`\`${reason}\`\`\``)
                .setThumbnail(user.displayAvatarURL({dynamic:true}))
                )
        }

        await slashPaginate({
            interaction: interaction,
            pages: embeds,
            flags: MessageFlags.Ephemeral
        })
    }
    }
}