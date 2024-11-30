const fs = require("node:fs");
const {Client, Events, SlashCommandBuilder, GatewayIntentBits, Collection} = require('discord.js');
const {token} = require('./config.json');

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = getCommands("./commands");

client.once(Events.ClientReady, (c) => {
    console.log(`${c.user.tag} is online.`);
});


client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) {
        return;
    }

    let command = client.commands.get(interaction.commandName);

    try {
        if(interaction.replied) return;
        command.execute(interaction);
    } catch(error) {
        console.error(error);
    }
});

client.login(token);

function getCommands(dir) {
    let commands = new Collection();
    const commandFiles = getFiles(dir);

    for(const commandFile of commandFiles) {
        const command = require(commandFile);
        commands.set(command.data.toJSON().name, command);
    }

    return commands
}

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = [];


    for (const file of files) {
        if(file.isDirectory()) {
            // recursive call getFiles to subdirs
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`)
            ];
        } 
        // pushes file to commandFiles array
        else if (file.name.endsWith(".js")) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }

    return commandFiles;
}



