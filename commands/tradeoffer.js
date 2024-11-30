const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: 
    new SlashCommandBuilder()
        .setName("tradeoffer")
        .setDescription("Replies with random quote from Steve."),
        
    async execute(interaction) {

    }
}
 