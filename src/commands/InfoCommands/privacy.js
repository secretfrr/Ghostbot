const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    category: ['Info'],
  data: new SlashCommandBuilder()
    .setName('privacy')
    .setDescription('View the bot\'s privacy policy'),

  async execute(interaction) {
    const embeds = [
      new EmbedBuilder()
        .setColor(0x5865F2) // Discord Blurple color
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .setDescription(`Effective Date: \`July 18, 2023.\``)
        .addFields({ name: `1. Introduction`, value: `Welcome to ${interaction.client.user.username} ("the Bot"). This Privacy Policy outlines how we collect, use, disclose, and protect the personal information of users ("Users" or "you") who interact with our Bot. By using the Bot, you consent to the practices described in this Privacy Policy.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 1/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `2. Information We Collect`, value: `(a) User-Provided Information: We may collect certain information that you provide directly to the Bot. This may include, Discord usernames, user IDs, messages IDs, and any other information you choose to share while using the Bot.

(b) Automatically Collected Information: We may also collect certain information automatically when you interact with the Bot. This information may include your IP address, browser type, operating system, device information, and other usage details.

(c) Cookies and Similar Technologies: We may use cookies and similar technologies to collect information about your interactions with the Bot. This information helps us improve the Bot's performance, enhance user experience, and analyze trends.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 2/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `3. How We Use Your Information`, value: `We may use the information we collect from you for the following purposes:

(a) Providing and Improving the Bot: We use your information to provide, maintain, and enhance the Bot's functionality, features, and user experience.

(b) Communication: We may use your contact information to respond to your inquiries, feedback, or support requests.

(c) Personalization: We may use your information to personalize your experience with the Bot and provide content tailored to your preferences.

(d) Analytics: We may use aggregated and anonymized data for analytical purposes, such as understanding user behavior, trends, and preferences.

(e) Legal and Security: We may use your information to comply with legal obligations, enforce our Terms of Service, and protect the rights, property, or safety of our Users or others.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 3/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `4. Sharing Your Information`, value: `We will not share your personal information with third parties, except in the following circumstances:

(a) Service Providers: We may share your information with trusted third-party service providers who assist us in operating the Bot and providing services to you. These providers are contractually obligated to protect your information and only use it for the purposes specified by us.

(b) Legal Requirements: We may disclose your information when required by law, legal process, or a government request.

(c) Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our company's assets, your information may be transferred as part of the transaction.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 4/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `5. Data Security`, value: `We implement reasonable measures to protect the information we collect from unauthorized access, disclosure, alteration, or destruction. However, please understand that no method of data transmission over the internet or method of electronic storage is entirely secure. Therefore, we cannot guarantee its absolute security.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 5/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `6. Data Retention`, value: `We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 6/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `7. Children's Privacy`, value: `The Bot is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at [bankdrawz@gmail.com] to request the removal of that information from our systems.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 7/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `8. Your Rights`, value: `You have the right to access, correct, or delete the personal information we hold about you. If you wish to exercise these rights or have any concerns about your information, please contact us at [bankdrawz@gmail.com].` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 8/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `9. Changes to this Privacy Policy`, value: `We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with a revised effective date. We encourage you to review this Privacy Policy periodically for the latest information on our privacy practices.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 9/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `10. International Users`, value: `The Bot is hosted and operated in Bharat. If you are accessing the Bot from outside Bharat, please be aware that your information may be transferred to, stored, and processed in Bharat. By using the Bot, you consent to the transfer and processing of your information in Bharat.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 10/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `11. Data Breach Notification`, value: `In the event of a data breach that compromises the security of your personal information, we will take reasonable steps to notify you and relevant authorities (if required) in accordance with applicable laws.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 11/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `12. Advertising and Marketing`, value: `We do not use your personal information for advertising or marketing purposes without your consent.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 12/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `13. Consent Withdrawal`, value: `If you wish to withdraw your consent to the processing of your personal information, please contact us at [bankdrawz@gmail.com]. Please note that withdrawing consent may impact your ability to use certain features or functionalities of the Bot.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 13/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `14. Governing Law and Dispute Resolution`, value: `This Privacy Policy shall be governed by and construed in accordance with the laws of India, specifically the state of Uttarakhand. Any dispute arising out of or relating to this Privacy Policy shall be resolved through arbitration in accordance with the provisions of the Indian Arbitration and Conciliation Act, 1996.

The arbitration shall be conducted in the city of Dehradun, Uttarakhand, and the language of arbitration shall be Hindi/English, as mutually agreed upon by both parties.

The arbitration proceedings shall be conducted by a sole arbitrator appointed mutually by both parties, or in the absence of mutual agreement, by the Chief Justice of the High Court of the State of Uttarakhand.

The arbitration award shall be final and binding on both parties. The prevailing party in any such arbitration shall be entitled to recover reasonable attorneys' fees and costs incurred in connection with the arbitration.` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 14/15`, iconURL: interaction.client.user.displayAvatarURL() }),

      new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({ name: `Privacy Policy for ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
        .addFields({ name: `15. Contact Us`, value: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at [bankdrawz@gmail.com].` })
        .setFooter({ text: `${interaction.client.user.username} â€¢ Page 15/15`, iconURL: interaction.client.user.displayAvatarURL() })
    ];

    let currentPage = 0;

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('first')
          .setLabel('â‰ª')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('previous')
          .setLabel('Back')
          .setStyle(ButtonStyle.Success)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('close')
          .setLabel('Close')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel('Next')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('last')
          .setLabel('â‰«')
          .setStyle(ButtonStyle.Primary)
      );

    const response = await interaction.reply({ embeds: [embeds[currentPage]], components: [row], fetchReply: true });

    const collector = response.createMessageComponentCollector({ time: 300000 }); // 5 minutes

    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({ content: 'You can\'t use these buttons.', ephemeral: true });
      }

      switch (i.customId) {
        case 'first':
          currentPage = 0;
          break;
        case 'previous':
          currentPage = Math.max(0, currentPage - 1);
          break;
        case 'next':
          currentPage = Math.min(embeds.length - 1, currentPage + 1);
          break;
        case 'last':
          currentPage = embeds.length - 1;
          break;
        case 'close':
          return i.update({ components: [] });
      }

      row.components[0].setDisabled(currentPage === 0);
      row.components[1].setDisabled(currentPage === 0);
      row.components[3].setDisabled(currentPage === embeds.length - 1);
      row.components[4].setDisabled(currentPage === embeds.length - 1);

      await i.update({ embeds: [embeds[currentPage]], components: [row] });
    });

    collector.on('end', () => {
      interaction.editReply({ components: [] });
    });
  },
};