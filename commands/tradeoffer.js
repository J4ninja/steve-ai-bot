const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: 
    new SlashCommandBuilder()
        .setName("tradeoffer")
        .setDescription("Replies with random quote from Steve.")
        .addStringOption(option => 
            option
                .setName("i_receive")
                .setDescription("Set text under I receive")
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName("you_receive")
                .setDescription("Set text under You receive")
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply("hi");
    }
}
 