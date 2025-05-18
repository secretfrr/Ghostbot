const { GatewayIntentBits, Partials } = require(`discord.js`);

const intents = [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildIntegrations, 
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildExpressions, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.GuildModeration, 
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.GuildScheduledEvents, 
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.AutoModerationExecution, 
]

const partials = [
    Partials.GuildMember, 
    Partials.Channel,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction, 
    Partials.ThreadMember, 
    Partials.User
]

module.exports = { intents, partials };