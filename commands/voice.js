const { SlashCommandBuilder } = require('discord.js');
const { 
    createAudioPlayer, 
    createAudioResource, 
    joinVoiceChannel, 
    AudioPlayerStatus, 
    VoiceConnectionStatus, 
    entersState 
} = require('@discordjs/voice');
const path = require('path');
const fs = require('fs');

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
                    { name: 'Steve doing Karoake!', value: "SteveSinging.m4a" },
                    { name: 'Everyone is a Bitch', value: "YouABitch.m4a" },
                    { name: 'Water Broke', value: "WaterBroke.m4a" },
                    { name: 'Gay Shit My N', value: "GayShitNig.m4a" },
                    { name: 'Steve gets Raped and taps out!', value: "SteveTapout.m4a" },
                    { name: 'Breakup with John', value: "JohnBreakUp.m4a" },
                    { name: 'Get On!', value: "GetOn.m4a" },
                    { name: 'Help on GTA!', value: "GTA.m4a" },
                    { name: 'Fag Nig', value: "FagNig.m4a" },
                    { name: 'Soft Boy Stevie', value: "SoftBoySteve.m4a" },
                    { name: 'Happy Bday Sthef!', value: "HappyBdySthef.m4a" },
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
                audioFile = path.join(audioDir, selectedVoicemail);
            } else {
                const audioFiles = fs.readdirSync(audioDir).filter(file => file.endsWith('.m4a'));
                if (audioFiles.length === 0) {
                    return interaction.reply({ content: "No audio files found in the directory.", ephemeral: true });
                }
                audioFile = path.join(audioDir, audioFiles[Math.floor(Math.random() * audioFiles.length)]);
            }

            console.log(`[Voice] Selected audio: ${path.basename(audioFile)} for channel ${voiceChannel.name}`);
            await interaction.deferReply();

            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });

            connection.on('error', error => {
                console.error('[Connection Error]:', error);
            });

            connection.on('stateChange', (oldState, newState) => {
                console.log(`[Connection State] ${oldState.status} -> ${newState.status}`);
            });

            // Wait up to 15 seconds for connection to be ready before playing
            await entersState(connection, VoiceConnectionStatus.Ready, 15_000);
            console.log('[Voice] Connection is Ready! Starting audio playback.');

            // Create and play the audio resource
            const audioPlayer = createAudioPlayer();
            const resource = createAudioResource(audioFile);

            audioPlayer.on('error', error => {
                console.error('[AudioPlayer Error]:', error.message, error);
            });

            audioPlayer.on('stateChange', (oldState, newState) => {
                console.log(`[Player State] ${oldState.status} -> ${newState.status}`);
            });

            audioPlayer.on(AudioPlayerStatus.Idle, () => {
                console.log('[Voice] Audio ended. Disconnecting.');
                connection.destroy();
            });

            connection.subscribe(audioPlayer);
            audioPlayer.play(resource);

            await interaction.editReply({ content: `Playing audio: **${path.basename(audioFile)}**` });

        } catch (error) {
            console.error('[Voice Command Error]:', error);
            if (interaction.deferred) {
                await interaction.editReply({ content: "There was an error connecting or playing the audio." });
            } else {
                await interaction.reply({ content: "There was an error playing the audio.", ephemeral: true });
            }
        }
    }
};
