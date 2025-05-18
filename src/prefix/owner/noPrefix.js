const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const NoPrefixSchema = require('../../schemas/noPrefixSchema');

// Array of authorized user IDs who can run the command
const authorizedUsers = ['375931932036431873', 'ID2', 'ID3']; // Replace with actual user IDs

module.exports = {
    name: 'noprefix',
    description: 'Manage no prefix users',
     async execute (client, message, args) {
        // Check if the user is authorized to run the command
        if (!authorizedUsers.includes(message.author.id)) {
            return message.reply('You do not have permission to use this command.');
        }

        if (!args[0]) {
            return message.reply('Please provide a valid subcommand: `add`, `remove`, `list`.');
        }

        const subCommand = args[0].toLowerCase();

        if (subCommand === 'add') {
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply('Please mention a user to add.');
            }

            try {
                const existingUser = await NoPrefixSchema.findOne({ userId: user.id });
                if (existingUser) {
                    return message.reply('User is already in the no-prefix list.');
                }

                const newUser = new NoPrefixSchema({ userId: user.id });
                await newUser.save();
                message.reply(`Successfully added ${user.tag} to the no-prefix list.`);
            } catch (error) {
                console.error(error);
                message.reply('An error occurred while adding the user.');
            }
        } else if (subCommand === 'remove') {
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply('Please mention a user to remove.');
            }

            try {
                const removedUser = await NoPrefixSchema.findOneAndDelete({ userId: user.id });
                if (!removedUser) {
                    return message.reply('User is not in the no-prefix list.');
                }

                message.reply(`Successfully removed ${user.tag} from the no-prefix list.`);
            } catch (error) {
                console.error(error);
                message.reply('An error occurred while removing the user.');
            }
        } else if (subCommand === 'list') {
            try {
                const users = await NoPrefixSchema.find({});
                if (users.length === 0) {
                    return message.reply('The no-prefix list is empty.');
                }

                const userList = users.map(user => `<@${user.userId}>`).join('\n');
                const embed = new EmbedBuilder()
                    .setTitle('No Prefix Users')
                    .setDescription(userList)
                    .setColor(0x00AE86);

                message.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                message.reply('An error occurred while fetching the no-prefix list.');
            }
        } else {
            message.reply('Invalid subcommand. Please use `add`, `remove`, or `list`.');
        }
    },
};
