const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const os = require('os');
const cpuStat = require("cpu-stat");
const Schema = require("../../schemas/update");


module.exports = {
    category: ['Info'],
    devOnly: true,
    data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Bot commands")
    .addSubcommand(command => command.setName("privacy-policy").setDescription("Our privacy policy")) //done
    .addSubcommand(command => command.setName("terms-of-service").setDescription("Our TOS/Terms of Service"))
    .addSubcommand(command => command.setName("info").setDescription("Bot information"))//done
    .addSubcommand(command => command.setName("invite").setDescription("invite this bot"))//done
    .addSubcommand(command => command.setName("review-topgg").setDescription("Review this bot at top.gg"))//done
    .addSubcommand(command => command.setName("set-nickname").setDescription("Set the bots nickname for this server").addStringOption(option => option.setName('nickname').setDescription(`The nickname you want your bot to get`).setRequired(true))) //done
    .addSubcommand(command => command.setName("uptime").setDescription("The Bots uptime"))//done
    .addSubcommandGroup(group => group
        .setName("advanced-info") //done
        .setDescription("Get advanced information about the bot")
        .addSubcommand(command => command.setName('stats').setDescription('Shows some basic statistics about ghost.'))
        .addSubcommand(command => command.setName('specs').setDescription('Shows the specifications that ghost uses.'))
        .addSubcommand(command => command.setName('ping').setDescription(`Displays the bot's ping... Pong.. PANG!!`))
        .addSubcommand(command => command.setName('online').setDescription(`Shows the online status of YourBot, a great way to see if our bot works!`))
    ),

    async execute (interaction, client) {
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case "privacy-policy":
                const embedPP = new EmbedBuilder()
                .setTitle("Privacy Policy")
                .setURL(`${process.env.PRIVACY}`)
                .setDescription(`You can find our privacy policy here: \n${process.env.PRIVACY}`)
                .setColor('Purple')
        
                await interaction.reply({ embeds: [embedPP] });
            break;

            case "terms-of-service":
                const embedTOS = new EmbedBuilder()
                .setTitle("Terms of Service")
                .setURL(`${process.env.TOS}`)
                .setDescription(`You can find our terms of service here: \n${process.env.TOS}`)
                .setColor('Purple')
        
                await interaction.reply({ embeds: [embedTOS] });
            break;

            case "invite": //if interaction then....
            const embedxxxxx = new EmbedBuilder() //create a new embed
            .setColor("Purple") //color of the embed
            .setTitle("Bot invite") //Title of the embed
            .setURL("https://discord.com/oauth2/authorize?client_id=596768950830891018&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fghostt&integration_type=0&scope=bot+applications.commands+applications.commands.permissions.update")
            .setDescription("Click [here](https://discord.com/oauth2/authorize?client_id=596768950830891018&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fghostt&integration_type=0&scope=bot+applications.commands+applications.commands.permissions.update) to invite the bot!") //URL of the Title
            .setDescription("Invite the Bot!") //Description of the embed
    
            await interaction.reply({ embeds: [embedxxxxx]}); //if interaction then reply with the embed
            break;
            case 'stats':

            let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);
    
            let totalSeconds = (client.uptime / 1000);
            let daysxx = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hoursxx = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutesxx = Math.floor(totalSeconds / 60);
            let secondsxx = Math.floor(totalSeconds % 60);
    
            let uptime = `**${daysxx}**d **${hoursxx}**h **${minutesxx}**m **${secondsxx}**s`;
    
            const embedxx = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`> Ghosts Statistics`)
            .setAuthor({ name: '🤖 Ghosts Statistics'})
            .setFooter({ text: `https://discord.gg/ghostt`})
            .setTimestamp()
            .addFields({ name: '• Servers Count', value: `> ${client.guilds.cache.size}`, inline: true})
            .addFields({ name: '• Members Count', value: `> ${servercount}`, inline: true})
            .addFields({ name: '• Latency', value: `> ${Math.round(client.ws.ping)}ms`, inline: false})
            .addFields({ name: '• Uptime', value: `> ${uptime}`, inline: false})
    
            await interaction.reply({ embeds: [embedxx]})
    
            break;
            case 'specs':

            await client.user.fetch();
            await client.application.fetch();

            const usage2 = process.memoryUsage();
            const usage = process.cpuUsage();
            const usagePercent = usage.system / usage.user * 100;
            const usagePercent2 = usage2.system / usage2.user * 100;
            const memoryUsed = (os.totalmem - os.freemem)/1000000000
            const memoryTotal = os.totalmem()/1000000000
            const specsembed = new EmbedBuilder()
            .setTitle('> System Usage')
            .setAuthor({ name: `💻 Bot Specs`})
            .setColor('Purple')
            .setFooter({ text: `gg/ghostt`})
            .addFields({name: `• Memory:`, value: `> ${(memoryUsed/memoryTotal * 100).toFixed(1)}%`})
            .addFields({name: '• OS:', value: `> ${os.type}`})
            .addFields({name: `• OS Version:`, value: `> ${os.release}`})
            .addFields({name: '• CPU: ', value: `> ${usagePercent.toFixed(1)}%`, inline: true})
            .addFields({name: "• CPU Name:", value: `> ${os.cpus()[0].model}`, inline: true})
            .addFields({name: '• CPU Type (Arch): ', value: `> ${os.arch}`, inline: true})
            .addFields({name: "• Owner:", value:`> ${client.application.owner.tag || "None"}`})
            .addFields({name: "• OS Name:", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: true})
            .addFields({name: "• Platform:", value: `${os.platform}`, inline: true})
            .setTimestamp()

            await interaction.reply({embeds: [specsembed]})
    
            break;
            case 'ping':
    
            const embedping = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`Connection between ${client.user.username} \nand your client`)
            .setDescription( `> Pong: ${Math.round(client.ws.ping)}ms`)
            .setFooter({ text: `<a:matamison:1349067870038003786> Ping recorded`})
            .setTimestamp()
            .setAuthor({ name: `🏓 Ping Command`})
    
            await interaction.reply({ embeds: [embedping] })
    
            break;
            case 'online':
    
            const embedonline = new EmbedBuilder()
            .setColor('Purple')
            .setTitle('The bot is **online!**')
            .setDescription(`> ${client.user.username} is fuctioning correctly.`)
            .setFooter({ text: `💚 online command succeeded`})
            .setTimestamp()
            .setAuthor({ name: `discord.gg/ghostt`})
            await interaction.reply({ embeds: [embedonline] })
            break;
            case "review-topgg":
                const embed = new EmbedBuilder()
                .setTitle("Review this Bot!")
                .setURL(`https://top.gg/bot/${client.user.id}#reviews`)
                .setColor('Purple')
                .setDescription("Thank you for choosing this bot!")
                .setFooter({ text: "Thanks :)"})
                .setTimestamp()
        
                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel("Review")
                    .setURL(`https://top.gg/bot/${client.user.id}#reviews`)
                    .setStyle(ButtonStyle.Link)
                )
        
                await interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true})

            break;
            case "info":
                const days = Math.floor(client.uptime / 86400000)
                const hours = Math.floor(client.uptime / 3600000) % 24
                const minutes = Math.floor(client.uptime / 60000) % 60
                const seconds = Math.floor(client.uptime / 1000) % 60
        
                cpuStat.usagePercent(function (error, percent) {
        
                    if(error) return interaction.reply({ content: `${error}` });
        
                    const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
                    const node = process.version;
                    const cpu = percent.toFixed(2);
                    const servers = client.guilds.cache.size;
                    const users = client.guilds.cache.reduce(
                        (a, b) => a + b.memberCount,
                        0
                      );
        
                    const embed = new EmbedBuilder()
                    .setColor('Purple')
                    .addFields(
                        {name: "Developer:", value:`<@375931932036431873>`, inline: true},
                        {name: "Client name:", value:`<@${client.user.id}>`, inline: true},
                        {name: "Client ID:", value:`${client.user.id}`, inline: true},
                        {name: "Created at:", value:`05.07.2019`, inline: true},
                        {name: "Bot-Ping:", value:`${client.ws.ping}`, inline: true},
                        {name: "Node:", value:`${node}`, inline: true},
                        {name: "CPU usage:", value:`${cpu} %`, inline: true},
                        {name: "SSD usage:", value:`${memoryUsage}`, inline: true},
                        {name: "Oauth2:", value: `False`, inline: true},
                        {name: "Servers:", value: `${servers}`, inline: true},
                        {name: "Members:", value: `${users}`, inline: true},
                        {name: "Mongoose Connection:", value: `[true](https://mongodb.com/)`, inline: true}
                    )
        
                    interaction.reply({ embeds: [embed] })
                })
        
                function formatBytes(a, b) {
                    let c = 1024
                    d = b || 2 
                    e = ['B', 'KB', 'MB', 'GB', 'TB']
                    f = Math.floor(Math.log(a) / Math.log(c))
        
                    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
                }
            break;
            case "uptime":
                const daysx = Math.floor(client.uptime / 86400000)
                const hoursx = Math.floor(client.uptime / 3600000) % 24
                const minutesx = Math.floor(client.uptime / 60000) % 60
                const secondsx = Math.floor(client.uptime / 1000) % 60
        
                const embedx = new EmbedBuilder()
                .setTitle(`Uptime of: ${client.user.username}`)
                .setColor('Purple')
                .setTimestamp()
                .addFields({ name: "Days: ", value: `${daysx}`, inline: false})
                .addFields({ name: "Hours: ", value: `${hoursx}`, inline: false})
                .addFields({ name: "Minutes: ", value: `${minutesx}`, inline: false})
                .addFields({ name: "Seconds: ", value: `${secondsx}`, inline: false})
        
                await interaction.reply({ embeds: [embedx] });
            break;
            case "set-nickname":
                
        const nickname = interaction.options.getString(`nickname`);

        const guildClient = await interaction.guild.members.cache.get(`${client.user.id}`);
                const {user, options} = interaction;

       
        await interaction.reply({ content: `Loading...` })

        const changed = await guildClient.setNickname(`${nickname}`).catch(err => {
            interaction.editReply({ content: `An error had been found! + Error: ${err}` })
        });

        if (changed) {
            const embed = new EmbedBuilder()
            .setColor('Purple')
            .setDescription(`The bot's nickname is now set to: \`${nickname}\``)

            await interaction.editReply({ embeds: [embed], content: `` })
        } else {
            return;
        }





        }
    }
}