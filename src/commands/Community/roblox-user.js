const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const noblox = require('noblox.js');
 
module.exports = {
    usableInDms: true,
    category: "Info",
    data: new SlashCommandBuilder()
    .setName('roblox-userinfo')
    .setDescription('Displays roblox users account information')
    .setDMPermission(true)
    .addStringOption(option => option.setName('username').setRequired(true).setDescription('roblox username')),
    async execute (interaction) {
        await interaction.deferReply();
        const { options } = interaction;
        const username = options.getString('username');
        
      const premium = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_592CD1EC07658FA18AAC24E81C4E5213EA28C00DCD304B94D115F0CB01F23F9F01FCCA4DE9A2821133121EC8F1DAA00F1976F81B6E0887A5799F8E7A384DF438486D4FA5B2F0D9CCBA889B811D9D2A8DAE838A760B18FD8D1B211C55FD4CA827B175B0CED2944B8C3AFDD7E4311EE1B3132A364B627EBC99097934A263EDB6CAAAADC4CA69E81C2D85E717354634FB81ED8FF1C786F9C08C484C0D3E5DECF99D8E771A4F6C41E9E0D29A5450DBFA78BB94B372EC0C2DA757C531C07ACD15747CFB8AA14F357580D69A871EF2DE50666D4251CC9B3A285505F0FD33CC17812583E9A5FBD0FB8A6987B0C57B99811130BE89537D36E9C925298F64137696E2D365C2B355B6E56141C306FD7D54E447CD67ECED4F7178CF89C4C38054BF73FF8694915FDAAA97DD8517DBABE2B6F3F6A530835E61CB860991FEA0BD79991F6BAF69500C2F39E48FA0A6AA0AE2BD098EF47F204D3EE22B2FF19E1A6E708F2731C1445353F87B237B73C8D04D27D0A47B690A809C205365301B40E0B302886D501383DE701D3E69CD6ED291820A230DF68BE0362AAC0C8523F23165963266A74F8A0088BFA774DDDAD8B388F1817B07FD773338F8A3002A6757EFA503FCA2EA7AF93A41053BB69F05738A67877F1C82B84058C05207A79BB99DD6288CCDF44D92B00B15E0DA9A1DE4F2376A8ABB0CF6A57AA6A430DB2F251014211510C53E7622DB340441FB0E78D0ED80DAD0346AA2AFBA5913E3904FF9E2E363722D39D14D3A293C0CD4DD0014E2F142C43CD4227C2484424DC7D2B777A9DE6B37722DB4EC34E6BB544B1811A8425F62948B7D7DFCEAA8EAEF15D71F11484C94D2D83E3BA312D8E4A4B1DD5C3F03DBD43A59D390D7646CA64E25BE2576FBFCCDF47CC4F57D87F725FD4F226EE36B4DD680B98E2FDDEABC07D5E3886DA7BB9A77D8D24AD52F20D8B226B9DC524BD925F64BA406825338C317515096E6A24271AB20616AD8E829067E169E0121EEFDCF9B797AE6833D2136967AB6197AA1A485019E79998C9941BABE16D336E7AD5C3D85F635A747DC128F8FF897CC73D5B0473C2318AD54F2987582C4B2FF37BCA039C21DE0702A518CB6D738C044AB')         
 
        const id = await noblox.getIdFromUsername(`${username}`);
        if (!id) return await interaction.editReply({ content: `No user found with the username \`${username}\``, });
        const info = await noblox.getPlayerInfo(id);
        const profilePicture = await noblox.getPlayerThumbnail([id], '720x720', 'png', false, 'body')
        const hasPremium = await noblox.getPremium(id)
 
        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`${info.username} (${id})`)
        .setDescription(`@[${info.username}](https://www.roblox.com/users/${id}/profile)`)
        
        .setThumbnail(profilePicture[0].imageUrl)
        .addFields(
            { name: `Joined`, value: `<t:${Math.floor(info.joinDate / 1000)}:R>` },
            { name: 'Description', value: `${info.blurb || 'No Description'}` },
            { name: `Friends`, value: `${info.friendCount?.toString() ?? '0'}` },
            { name: `Followers`, value: `${info.followerCount?.toString() ?? '0'}` },
            { name: `Premium`, value: `${hasPremium ? "✅" : "❌"}` },
			{ name: `Banned`, value: `${info.isBanned ? "✅" : "❌"}` }
           
        )
        await interaction.editReply({ embeds: [embed] })
    }
}