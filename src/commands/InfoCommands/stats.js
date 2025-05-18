const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Display the bot statistics'),

    async execute(interaction, client) {
        const msToHumanReadableTime = (ms) => {
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / (1000 * 60)) % 60);
            const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
            const days = Math.floor(ms / (1000 * 60 * 60 * 24));
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        };

        const latency = client.ws.ping;
        const fcLatency = Date.now() - interaction.createdTimestamp;
        const memoryUsedInMB = process.memoryUsage().heapUsed / 1024 / 1024;
        const memoryAvailableInMB = process.memoryUsage().rss / 1024 / 1024;
        const objCacheSizeInMB = client.guilds.cache.size * 10;
        const discordVersion = require('discord.js').version;
        const nodeVersion = process.version;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('Fetching Stats')
            .setTimestamp();

        const reply = await interaction.reply({ embeds: [embed], fetchReply: true });

        const updatedEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .addFields(
                {
                    name: 'Latency',
                    value: stripIndents`
                        **API Latency:** ${latency} ms
                        **Bot Latency:** ${fcLatency} ms
                    `,
                    inline: true
                },
                {
                    name: 'Memory',
                    value: stripIndents`
                        💾 **Memory Usage:** ${memoryUsedInMB.toFixed(2)}/${memoryAvailableInMB.toFixed(2)} MB 
                        ♻️ **Cache Size:** ${objCacheSizeInMB.toFixed(2)} MB
                    `,
                    inline: true
                },
                {
                    name: 'Uptime',
                    value: stripIndents`**📊 I've been idle for ${msToHumanReadableTime(Date.now() - client.readyTimestamp)}**`,
                    inline: false
                },
                {
                    name: 'System',
                    value: stripIndents`
                        ⚙️ **Discord.js Version:** [v${discordVersion}](https://discord.js.org)
                        ⚙️ **Node Version:** [${nodeVersion}](https://nodejs.org/en/docs/)
                    `,
                    inline: true
                },
                {
                    name: 'Stats',
                    value: stripIndents`
                        👥 **Servers:** ${client.guilds.cache.size.toLocaleString('en-US')}
                        👤 **Users:** ${client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0).toLocaleString('en-US')}
                    `,
                    inline: true
                }
            )
            .setTimestamp();

        setTimeout(() => {
            reply.edit({ embeds: [updatedEmbed] });
        }, 2000);
    }
};
