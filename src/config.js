module.exports = {

    // BOT VERSION //
    botVersion: "BETA-v0.0.1",
    
    // BOT INFO //
    prefix: ",",
    status: "idle",
    eventListeners: 100,
    global: true,
    dev: "bankdrawz",
    devBy: "bankdrawz",
    developers: "375931932036431873",
    devGuildId: "1156775942224625684",
    secret: "p7aiW1O2aRDLSGxvABeZ0YlFFDjuFjuL",
    clientId: "596768950830891018",
    totalShards: "auto",
    maintenance: false,
    noPerms: `You **do not** have the required permissions to use this command!`,
    ownerOnlyCommand: `This command is **only** available for the owner of the bot!`,
    
    giveawayManager: {
        //Private Message Information.
        //If you set false, the bot will not send private message information to members who join the giveaway, for example.
        privateMessageInformation: true,
        // When a giveaway is created the bot pings everyone (true or false)
        everyoneMention: true,
        // You can choose a custom reaction
        reaction: '🎉'
    },

    messages: {
        giveaway: '🎉 **Giveaway**',
        giveawayEnded: '🎉 **Giveaway Ended**',
        title: 'Prize: {this.prize}',
        drawing: 'The giveaway ends in: {timestamp}',
        dropMessage: 'Be the first, and react to 🎉!',
        inviteToParticipate: 'React with 🎉 to enter the giveaway!',
        winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
        embedFooter: '{this.winnerCount} winner(s)',
        noWinner: 'Giveaway cancelled, no valid participations.',
        hostedBy: 'Hosted by: {this.hostedBy}',
        winners: 'Winner(s):',
        endedAt: 'Ended at',
        paused: '⚠️ **This giveaway is paused!**',
        infiniteDurationText: '`NEVER`',
        congrat: 'New winner(s): {winners}! Congratulations, your prize is **{this.prize}**!',
        error: 'Reroll cancelled, no valid participations.'
        
    },
    
    noPerms: (missingPerms) => {
		const formattedPerms = missingPerms
			.map((perm) => `\`${perm.toString().split("_").join(" ").toLowerCase()}\``)
			.join(", ");
		return `You **do not** have the required permissions to use this command!\nMissing Permissions: ${formattedPerms}`;
	},
    botInvite: "https://discord.com/oauth2/authorize?client_id=596768950830891018&integration_type=0&scope=applications.commands",
    filterMessage: "Your message includes profanity which is **not** allowed!",
    color: "Purple",
     botServerInvite: "https://discord.gg/tYvw4RHC8w",

    // EMBED COLORS //
    embedColor: "Green",
    embedAutomod: "Blue",
    embedCommunity: "Blurple",
    embedModLight: "Red",
    embedModHard: "DarkRed",
    embedInfo: "LuminousVividPink",
    embedMusic: "Gold",
    embedMiniGames: "Orange",
    embedFun: "Yellow",
    embedDev: "Aqua",
    embedProfile: "Navy",
    embedAuditLogs: "Purple",
    embedLevels: "Fuchsia",
    embedEconomy: "DarkOrange",
    embedVerify: "DarkGreen",

    // EMOJIS //
    automodEmoji: "<:auto:1235660206856474704>",
    modEmojiHard: "<a:mod:1235642403986083840>",
    modEmojiLight: "<a:wompus:1235671799241510973>",
    pepeCoffeeEmoji: "<:pepe:1238878395303989309>",
    arrowEmoji: "⤵",
    errorEmoji: "❌",
    auditLogEmoji: "📋",
    verifyEmoji: "<a:ver:1244732033339494450>",
    countSuccessEmoji: "<a:tick:1235674049032486945>",
    
    dmLoggingChannel: "1199777046176485546",

    // MUSIC EMOJIS //
    musicEmojiPlay: "▶️",
    musicEmojiStop: "⏹️",
    musicEmojiQueue: "📄",
    musicEmojiSuccess: "☑️",
    musicEmojiRepeat: "🔁",
    musicEmojiError: "❌",

    // CHANNEL IDS //
    slashCommandLoggingChannel: "1232427085717573672", // slash command logging channel
    prefixCommandLoggingChannel: "1232427085717573672", // Prefix command logging channel
    suggestionChannel: "1156775944908968063", // Suggestion channel
    bugReportChannel: "1240341717031456840", // Bug report channel
    botLeaveChannel: "1190149222645903380", // Logging channel for bot leaving servers
    botJoinChannel: "1190149222645903380", // Logging channel for bot joining servers
    commandErrorChannel: "1243999205354373171", // Logging channel for command error
    boostLogsChannelId: 
    "1371905411749253151",
    boostAnnounceChannelId:
    "1156775944544075873",
    Authorization: "wtvxNXo-bUwArRdsCULN5dNBpZxVCTppnvG6UlQ-r_7afvfsocsOXBZd3GroABHsZZCp",
    license: "20d40c05-587c-41ea-8b8d-7d4a6eea5dbb",
    ownerIDs: "375931932036431873",
    acceptPrivacyPolicy: true,
    clientid: "596768950830891018",
    license: "20d40c05-587c-41ea-8b8d-7d4a6eea5dbb",
    RSNCHAT_API: "rsnai_5GJoEVFS4Igx8mxXvNcyHXyw",
    TOPGGTOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Njc2ODk1MDgzMDg5MTAxOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNzIyMjg3NDA0fQ.Od_1cFlctiOV8lFGfnNnQ_uLwUVZPOklizFZgmHpKTk",
    WEBHOOK_AUTH: "wtvxNXo-bUwArRdsCULN5dNBpZxVCTppnvG6UlQ-r_7afvfsocsOXBZd3GroABHsZZCp",
    WEBHOOK_PORT: "6031",
    VOTE_LOG: "1257336946766774272",
    VOTE_REWARD_ROLE: "1241236929169854535",
   voteLog: "1257336946766774272",
    // Tickets
    
    // Ticket Configuration //
    ticketName: 'ticket-',
    ticketDescription: '🗳️ Ticket has been open by',
    ticketCreate: '✅ Your ticket has been created',
    ticketAlreadyExist: 'Sorry but you already have a ticket open. If you want to open a new ticket, please close the current one.',
    ticketNoPermissions: 'Sorry, but you **do not** have permission to do this.',
    ticketError: 'Something went wrong, try again later.',
    ticketMessageTitle: 'Welcome, thanks for opening a ticket. Please describe your problem in detail.',
    ticketMessageDescription: 'A member of our moderation team will soon take care of your request.\nThank you for waiting patiently.',
    ticketMissingPerms: 'Sorry, it looks like I am missing the required permissions to do this. Try giving me higher permissions.',
    ticketClose: 'Close',
    ticketCloseEmoji: '📪',
    ticketLock: 'Lock',
    ticketLockEmoji: '🔒',
    ticketUnlock: 'Unlock',
    ticketUnlockEmoji: '🔓',
    ticketClaim: 'Claim',
    ticketClaimEmoji: '👋',
    ticketManage: 'Members',
    ticketManageEmoji: '➕',
    ticketManageMenuTitle: 'Choose a member.',
    ticketManageMenuEmoji: '❔',
    ticketCloseTitle: 'This ticket is being closed...',
    ticketCloseDescription: 'Ticket will be closed in 5 seconds.',
    ticketSuccessLocked: 'Ticket was locked successfully.',
    ticketAlreadyLocked: 'This ticket is already locked.',
    ticketSuccessUnlocked: 'Ticket was unlocked successfully.',
    ticketAlreadyUnlocked: 'This ticket is already unlocked.',
    ticketSuccessClaim: 'Ticket was successfully claimed by',
    ticketAlreadyClaim: 'Ticket is already claimed by',
    ticketDescriptionClaim: ', it was claimed by',
    ticketTranscriptMember: 'Member:',
    ticketTranscriptTicket: 'Ticket:',
    ticketTranscriptClaimed: 'Claimed:',
    ticketTranscriptModerator: 'Moderator:',
    ticketTranscriptTime: 'Time:',
    ticketMemberAdd: 'has been added to the ticket.',
    ticketMemberRemove: 'has been removed from the ticket.',
    boostLogsChannelId: '1263930550184448081',
    boostAnnounceChannelId: '1156775944544075873',

// AI Chat Models //
	aiChatChannelModel: "mistral-large-latest",
	aiChatModel: "gpt-4o",
	aiImageGenModel: "flux-pro",
    
}