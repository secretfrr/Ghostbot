const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const config = require('../../config.js');

module.exports = {
    name: 'purge',
   description: 'Purrges a whole channel',
    async execute(message, client, args) {
        
        const amount = args[0];
        const user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() 

        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return await message.channel.send({ content: `${client.config.noPerms}`, ephemeral: true});
            
            
         await message.reply({ content: `Clearing channel...`})

        let deletedSize = 0;
        const channel = message.channel;    
            
       while (true) {
      const fetchedMessages = await channel.messages.fetch({ limit: 100 });
      if (fetchedMessages.size === 0) break;

      const deletedMessages = await channel.bulkDelete(fetchedMessages, true);
      if (deletedMessages.size === 0) break;

      deletedSize += deletedMessages.size;
    }
      
        return message.channel.send({ content: `Successfully deleted **${deletedSize}** message(s).` });
       }
    }