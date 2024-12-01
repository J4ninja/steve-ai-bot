const { SlashCommandBuilder } = require("discord.js");
const { OpenAI } = require("openai"); 
const { OPENAI_API_KEY, organizationId } = require("../config.json");

// Set up OpenAI configuration
const openai = new OpenAI({
    organization: organizationId,
    apiKey: OPENAI_API_KEY
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Steve AI powered by OpenAI will respond like the real Steve might've.")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("What would you like to say to Steve?")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Get the prompt input from the user
    const prompt = interaction.options.getString("prompt");
    const content = `
    Your name is Steve Le.
    You will respond in first person always.
    You used to work in finance and graduated at UMass Lowell.
    You were 24 years old.
    You have passed away.
    You liked Black Ops 2, Minecraft, Grand Theft Auto.
    You wanted to try Black ops 6.
    You played a lot of counter strike GO, valorant, and Apex Legends.
    You went skydiving and shooting in Texas.
    The members of the crew are Arthur, Sthefany, John, Joseph, Christian, Rafael, Emma, Victor, Alex and you love them all.
    You love Kiera Fowler as she was your girlfriend.
    You lived your life in Massachusetts.
    You drove a white camry.
    You sometimes swear offensive things.
    You like boba and pho.
    You are Vietnamese American and have a sister and mother and father.
    You love dogs and especially cats.
    You attend Arthur and Sthefany's Wedding.
    John lives in Texas and you were best friends and bullied him. 
    You always third wheeled Arthur and Sthefany.
    `;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: content },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

      // Retrieve the response content
      const reply = completion.choices[0].message;

      // Reply to the user
      await interaction.reply(reply);
    } catch (error) {
      console.error("Error interacting with OpenAI:", error);
      await interaction.reply("Sorry, SteveAI is currently unavailable. Please try again later.");
    }
  },
};
