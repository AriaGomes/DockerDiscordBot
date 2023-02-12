const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Docker = require('dockerode');

const docker = new Docker();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all Docker containers'),
  async execute(interaction) {
    const containers = await docker.listContainers({ all: true });

    const embeds = [];

    containers.forEach((container) => {
      const name = container.Names[0].replace('/', ''); // Remove the leading slash from the container name
      const state = container.State;
      const status = container.Status;
      const createdAt = new Date(container.Created * 1000); // Convert from Unix timestamp to Date object
      let color = '#0099ff'; // Default color is blue
      if (state === 'running') {
        color = '#00ff00'; // Green for running containers
      } else if (state === 'paused') {
        color = '#ffa500'; // Orange for paused containers
      } else if (state === 'exited') {
        color = '#ff0000'; // Red for exited containers
      }
      
      const embed = new EmbedBuilder()
      .setTitle(name)
      .addFields(
        { name: 'State', value: state, inline: true },
        { name: 'Status', value: status, inline: true },
        { name: 'Created', value: createdAt.toLocaleString(), inline: true },
      )
      .setColor(color);

      embeds.push(embed);
    });

    await interaction.reply({ embeds: embeds });
  },
};