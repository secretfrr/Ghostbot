const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { profileImage } = require('discord-arts');

module.exports = {
    usableInDms: true,
    category: ['Info'],
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display a users information")
    .setDMPermission(false)
    .addUserOption((option) => option.setName("member").setDescription("View member information")),

    async execute(interaction, client) {

    await interaction.deferReply();
    const memberOption = interaction.options.getMember("member");
    const member = memberOption || interaction.member;

    try {
        const fetchedMembers = await interaction.guild.members.fetch();

        const profileBuffer = await profileImage(member.id);
        const imageAttachment = new AttachmentBuilder(profileBuffer, { name: 'profile.png' });
        
        
        const status = member.presence?.status || 'offline';

  
        
        const joinPosition = Array.from(fetchedMembers
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
        .keys())
        .indexOf(member.id) + 1;

        const topRoles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role)
        .slice(0, 3);

        const userBadges = member.user.flags.toArray();

        const joinTime = parseInt(member.joinedTimestamp / 1000);
        const createdTime = parseInt(member.user.createdTimestamp / 1000);

        const Booster = member.premiumSince ? "<:boost9months:1268990632869761036>" : "✖";

        const avatarButton = new ButtonBuilder()
        .setLabel('Avatar')
        .setStyle(5)
        .setURL(member.displayAvatarURL());

        const bannerButton = new ButtonBuilder()
        .setLabel('Banner')
        .setStyle(5)
        .setURL((await member.user.fetch()).bannerURL() || 'https://example.com/default-banner.jpg');

        const row = new ActionRowBuilder()
        .addComponents(avatarButton, bannerButton);

        const Embed = new EmbedBuilder()
        .setAuthor({ name: `Ghost`, iconURL: client.user.avatarURL()})
        .setTitle(`User Info`)
        .setColor('Purple')
        .setDescription(`> ${member.user.tag} User Information \nOn <t:${joinTime}:D>, ${member.user.username} Joined as the **${addSuffix(joinPosition)}** member of this guild.`)
        .setImage("attachment://profile.png")
        .setThumbnail(member.user.displayAvatarURL())
        .addFields([
            { name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true },
            { name: "Booster", value: `${Booster}`, inline: true },
            { name: "Top Roles", value: `${topRoles.join("").replace(`<@${interaction.guildId}>`)}`, inline: false },
            { name: "Created", value: `<t:${createdTime}:R>`, inline: true },
            { name: "Joined", value: `<t:${joinTime}:R>`, inline: true },
            { name: "UserID", value: `${member.id}`, inline: false },
           { name: "User Status", value: `Active Status: **${status}**`}])
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
        .setTimestamp()

        interaction.editReply({ embeds: [Embed], components: [row], files: [imageAttachment] });

    } catch (error) {
        interaction.editReply({ content: `There was an error generating the info for **${member}**` });
        throw error;
    }
    }
};

function addSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13)
    return number + "th";

    switch (number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
    }
    return number + "th";
}

function addBadges(badgeNames) {
    if (!badgeNames.length) return ["X"];
    const badgeMap = {
        "ActiveDeveloper": "<:ActiveDeveloper:1268972037582622720> ",
        "BugHunterLevel1": "<:BugHunter1:1268972974556581949>",
        "BugHunterLevel2": "<:bughunter2:1268973017237819483>",
        "PremiumEarlySupporter": "<:EarlySupporter:1268972892377448600>",
        "Partner": "<:Partner:1268972925113864283>",
        "Staff": "<:DiscordStaff:1268972991337992252>",
        "HypeSquadOnlineHouse1": "<:Bravery:1268972179723124766>", 
        "HypeSquadOnlineHouse2": "<:Brilliance:1268972198526455972>", 
        "HypeSquadOnlineHouse3": "<:Balance:1268972163747287220>", 
        "Hypesquad": "<:Hypesquad:1268972309226717285>",
        "CertifiedModerator": "<:mod:1240380119109996615>",
        "VerifiedDeveloper": "<:VerifiedBotDeveloper:1268972328939683882>",
        "LegacyUsername": "<:Knownas:1268972221548855377>"
    };

    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
}
