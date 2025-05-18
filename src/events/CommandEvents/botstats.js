const { Events, EmbedBuilder, version } = require('discord.js');
const botStats = require('../../schemas/fixedBotsStatsSystem');
const os = require('os');

const { stripIndents } = require('common-tags');


module.exports = {
    name: Events.ClientReady,
    async execute(interaction, client) {
        if (!client || !client.guilds) {
            console.error(`${color.red}[${getTimestamp()}] [BOT_STATS] Client or client.guilds is not defined`);
            return;
        }
        
        
const msToHumanReadableTime = (ms) => {
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / (1000 * 60)) % 60);
            const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
            const days = Math.floor(ms / (1000 * 60 * 60 * 24));
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        };
        const editMessage = async () => {
            const channelAddData = await botStats.find();

            if (!channelAddData) return;

            channelAddData.forEach(async data => {
                try {
                    const guild = client.guilds.cache.get(data.Guild);
                        if (!guild) {
                            console.error(`${color.red}[${getTimestamp()}] [BOT_STATS] Guild not found: ${data.Guild}`);
                            return;
                        }
                        const channel = guild.channels.cache.get(data.Channel);
                        if (!channel) {
                            console.error(`${color.red}[${getTimestamp()}] [BOT_STATS] Channel not found: ${data.Channel}`);
                            return;
                        }
                        const message = await channel.messages.fetch(data.MessageId);
                        if (!message) {
                            console.error(`${color.red}[${getTimestamp()}] [BOT_STATS] Message not found: ${data.MessageId}`);
                            return;
                        }

                    const cpus = os.cpus();
                    const cpuModel = cpus[0].model;
                    const cpuUsage = (process.cpuUsage().user / 1024 / 1024).toFixed(2);
                    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

                    const embed = new EmbedBuilder()

                    .setColor('Purple')
                    .setDescription(`**Global Statistics** \n
\`\`Uptime:${msToHumanReadableTime(Date.now() - client.readyTimestamp)}\nGuild Count - \`\`${client.guilds.cache.size}\`\`\nGlobal Users - \`\`${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)}\`\`\nTotal Commands - \`\`${client.commands.size + client.pcommands.size}\`\`\n\n**System Statistics** \n\nCPU - \`\`${cpuModel}\`\`\nCPU Usage - \`\`${cpuUsage}%\`\`\nRAM Usage - \`\`${ramUsage}MB\`\`\nNode.js Version - \`\`${process.version}\`\`\nDiscord.js Version - \`\`${version}\`\``)
                    .setFooter({ text: `Ghost - Bot statistics - Last Updated` })
                    .setTimestamp(message.editedTimestamp || message.createdTimestamp)
                    .setThumbnail(client.user.avatarURL());

                    await message.edit({ embeds: [embed] });
                } catch (error) {
                    console.error(`${color.red}[${getTimestamp()}] [BOT_STATS] Error processing data for guild ${data.Guild}: \n${color.red}[${getTimestamp()}] [BOT_STATS]`,  error);
                }
            })
        }
        setInterval(editMessage, 100000);
        editMessage();
    }
}

const color = {
    red: '\x1b[31m',
}

function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};