const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Replies with random quote from Steve."),

  async execute(interaction) {
    var quotes = [
      "Bless me, thank you -Steve",
      "John's mom -Steve",
      "I'm not a weeb, I'm a pervert -Steve",
      "I want thy dick -Steve",
      "Let thy be fat and thy wallets be fat -Steve",
      "The sun will shine another day -Steve",
      "You fucking immigrant -Steve",
      "Trust trust trust -Steve",
      "You know my stance on asians. I hate them -Steve Le 2021",
      "What are you doing step ladder? -Steve",
    ];
    const quoteline = quotes[Math.floor(Math.random()*quotes.length)];
    const author = quoteline.substring(quoteline.indexOf('-'));
    const quote = quoteline.substring(0,quoteline.indexOf('-'));
    const quoteEmbed = new EmbedBuilder()
        .setTitle(quote)
        .setDescription(author);
    await interaction.reply({embeds: [quoteEmbed]});
  },
};
