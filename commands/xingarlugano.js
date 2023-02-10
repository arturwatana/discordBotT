const { SlashCommandBuilder } = require("discord.js");

let xingamentos = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lugano")
    .setDescription("Xingue o lugano gratuitamente"),

  async execute(interaction) {
    xingamentos++;
    await interaction.reply(
      `Lugano Troll FIADAPUTS : Lugano foi xingado ${xingamentos} vezes`
    );
  },
};
