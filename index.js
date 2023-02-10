const dotenv = require("dotenv");
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  SlashCommandBuilder,
} = require("discord.js");

dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com data ou execute incorretos`
    );
  }
}

client.once(Events.ClientReady, (c) => {
  console.log("Login realizado como: " + c.user.tag);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    if (selected == "javascript") {
      await interaction.reply(
        "Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      );
    } else if (selected == "node") {
      await interaction.reply(
        "Documentação do node: https://nodejs.org/en/docs/"
      );
    } else if (selected == "csharp") {
      await interaction.reply(
        "Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/"
      );
    } else if (selected == "discordjs") {
      await interaction.reply(
        "Documentação do Discord.js: https://discordjs.guide/#before-you-begin"
      );
    }
  }

  if (!interaction.isChatInputCommand) {
  }
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Invalid command");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply("Ops, nao encontrei este commando");
  }
});
