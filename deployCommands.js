const fs = require("node:fs");
const path = require("node:path");
const {Routes} = require('discord.js');
const { REST } = require('@discordjs/rest')
const {token, clientId, guildId} = require('./config.json');


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


let commands = [];

const commandFiles = getFiles("./commands");

for(const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: "10"}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then(() => {
        console.log("Successfully deployed commands!");
    })
    .catch(console.error);
