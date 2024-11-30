const { SlashCommandBuilder } = require('discord.js');
const { Jimp, loadFont } = require("jimp");
const { SANS_64_BLACK } = require("jimp/fonts");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("tradeoffer")
        .setDescription("Replies with a trade offer image.")
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
        const iReceiveText = interaction.options.getString('i_receive');
        const youReceiveText = interaction.options.getString('you_receive');

        // Create a new blank image or load an existing background image
        const image = await Jimp.read("./images/tradeoffer.jpg"); // You can replace this with a custom image
        
        const font = await loadFont(SANS_64_BLACK);
        const iReceiveX = 40;
        const iReceiveY = 1100;
        const uReceiveX = iReceiveX + 750;
        const uReceiveY = iReceiveY;

        image.print({font,x:iReceiveX,y:iReceiveY,text:iReceiveText});
        image.print({font,x:uReceiveX,y:uReceiveY,text:youReceiveText});
        // Save the image with text added, or send it back in the interaction
        const buffer = await image.getBuffer("image/jpeg");
        
        await interaction.reply({
            content: 'Here is your trade offer:',
            files: [{
                attachment: buffer,
                name: 'tradeoffer.jpg'
            }]
        });
    }
};
