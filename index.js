const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const fila = [];

const PIX = "chave_pix_abaixo";
const MEDIADOR_ID = "ID_DO_MEDIADOR";

client.once("ready", () => {
  console.log("Bot online!");
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isButton()) return;

  if (interaction.customId === "entrar_fila") {

    if (fila.includes(interaction.user.id)) {
      return interaction.reply({ content: "Você já está na fila.", ephemeral: true });
    }

    if (fila.length >= 2) {
      return interaction.reply({ content: "A fila já está cheia.", ephemeral: true });
    }

    fila.push(interaction.user.id);

    await interaction.reply({ content: "Você entrou na fila!", ephemeral: true });

    if (fila.length === 2) {

      const jogador1 = fila[0];
      const jogador2 = fila[1];

      const canal = interaction.channel;

      const embed = new EmbedBuilder()
        .setTitle("Fila completa")
        .setDescription(`Jogadores:\n<@${jogador1}> vs <@${jogador2}>\n\nEnvie o PIX:\n${PIX}\n\nAguardando mediador.`)
        .setColor("Green");

      canal.send({
        content: `<@${MEDIADOR_ID}>`,
        embeds: [embed]
      });

      fila.length = 0;

    }

  }

});
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

client.on("messageCreate", async message => {

  if (message.content === "!fila") {

    const botao = new ButtonBuilder()
      .setCustomId("entrar_fila")
      .setLabel("Entrar na fila")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(botao);

    message.channel.send({
      content: "Clique no botão para entrar na fila.",
      components: [row]
    });

  }

});
client.login(process.env.TOKEN);
