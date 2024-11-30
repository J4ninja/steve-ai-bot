const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const path = require('path'); // Ensure path module is imported
const fs = require('fs'); // To read audio files dynamically

module.exports = {
    data: new SlashCommandBuilder()
        .setName("voice")
        .setDescription("Plays a random voicemail or a selected one")
        .addStringOption(option => 
            option
                .setName("voicemail")
                .setDescription("Choose a specific voicemail")
                .setRequired(false)
                .addChoices(
                    { name: 'Happy Bday Sthef!', value: "HappyBdySthef.m4a" },
                    { name: 'Everyone is a Bitch', value: "YouABitch.m4a" },
                    { name: 'Water Broke', value: "WaterBroke.m4a" },
                    { name: 'Gay Shit My N', value: "GayShitNig.m4a" },
                    { name: 'Breakup with John', value: "JohnBreakUp.m4a" },
                    { name: 'Get On!', value: "GetOn.m4a" },
                    { name: 'Help on GTA!', value: "GTA.m4a" },
                    { name: 'Fag Nig', value: "FagNig.m4a" },
                    { name: 'Soft Boy Stevie', value: "SoftBoySteve.m4a" },
                )
        ),

    async execute(interaction) {
        const { member, guild } = interaction;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel to use this command!", ephemeral: true });
        }

        const selectedVoicemail = interaction.options.getString("voicemail");
        const audioDir = path.join(__dirname, '../audio');

        try {
            let audioFile;

            if (selectedVoicemail) {
                // Use selected audio file
                audioFile = path.join(audioDir, selectedVoicemail);
            } else {
                // Pick a random file from the audio directory
                const audioFiles = fs.readdirSync(audioDir).filter(file => file.endsWith('.m4a'));
                if (audioFiles.length === 0) {
                    return interaction.reply({ content: "No audio files found in the directory.", ephemeral: true });
                }
                audioFile = path.join(audioDir, audioFiles[Math.floor(Math.random() * audioFiles.length)]);
            }

            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });

            // Create and play the audio resource
            const audioPlayer = createAudioPlayer();
            const resource = createAudioResource(audioFile);

            audioPlayer.play(resource);
            connection.subscribe(audioPlayer);

            // Confirm the command
            await interaction.reply({ content: `Playing audio` });

            // Handle player events (optional)
            audioPlayer.on('idle', () => {
                connection.destroy(); // Disconnect after the audio ends
            });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error playing the audio.", ephemeral: true });
        }
    }
};
