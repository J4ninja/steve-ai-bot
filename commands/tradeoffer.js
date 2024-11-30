const { SlashCommandBuilder } = require('discord.js');
const { Jimp, loadFont } = require("jimp");
const { SANS_64_BLACK } = require("jimp/fonts");

function wrapText(text, maxLength = 15) {
    const lines = [];
    for (let i = 0; i < text.length; i += maxLength) {
        lines.push(text.slice(i, i + maxLength));
    }
    return lines;
}

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
        let iReceiveX = 40;
        let iReceiveY = 1000;
        let uReceiveX = iReceiveX + 715;
        let uReceiveY = iReceiveY;

        const iReceiveWrapped = wrapText(iReceiveText);
        const youReceiveWrapped = wrapText(youReceiveText);

        // Add wrapped text to image for "I receive"
        iReceiveWrapped.forEach(line => {
            image.print({font, x:iReceiveX, y:iReceiveY, text:line});
            iReceiveY += 50;  // Increase vertical position for next line
        });

        // Add wrapped text to image for "You receive"
        youReceiveWrapped.forEach(line => {
            image.print({font, x:uReceiveX, y:uReceiveY, text:line});
            uReceiveY += 50;  // Increase vertical position for next line
        });
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
