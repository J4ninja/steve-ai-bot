## Steve AI Discord Bot Powered by OpenAI

### System Dependencies
1. ffmpeg
2. node.js v20
3. npm v10

### Dependencies
1. discord.js v14
2. jimp v1.6
3. openai v4.73


### Configuration
You will need to create a `config.json` file in the project dir and fill in these required variables.

    {
      "token": "INSERT DISCORD LOGIN TOKEN",
      "clientId": "INSERT DISCORD CLIENT ID",
      "guildId": "INSERT SERVER ID",
      "organizationId": "INSERT OPENAI ORGANIAZATION ID",
      "OPENAI_API_KEY": "INSERT OPENAI API KEY"
    }   


### Running the bot with Docker
0. Prerequisite (docker and docker compose installed)
1. Run `docker-compose up --build` from project dir to build the image with necessary dependencies and run the container
  
   
