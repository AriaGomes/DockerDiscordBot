const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Docker = require('dockerode');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('get')
      .setDescription('Get information about a Docker container')
      .addStringOption(option =>
        option.setName('title')
          .setDescription('Title of the Docker container')
          .setRequired(true)),
    async execute(interaction) {
      const containerTitle = interaction.options.getString('title');
      const docker = new Docker();
  
      const containers = await docker.listContainers({ all: true });
  
      const selectedContainers = containers.filter(container => container.Names.some(name => name.includes(containerTitle)));
  
      if (selectedContainers.length === 0) {
        return interaction.reply({
          content: `No containers found with the title: ${containerTitle}`,
        });
      }
  
      const container = await docker.getContainer(selectedContainers[0].Id).inspect();
  
      const embed = new EmbedBuilder()
        .setColor(getStateColor(container.State.Status))
        .setTitle(`Container: ${container.Name}`)
        .addFields(
          { name: 'Container ID', value: container.Id, inline: true },
          { name: 'Image', value: container.Config.Image, inline: true },
          { name: 'State', value: container.State.Status, inline: true },
          { name: 'Created', value: new Date(container.Created * 1000).toLocaleString(), inline: true },
          { name: 'Started', value: container.State.StartedAt ? new Date(container.State.StartedAt).toLocaleString() : '-', inline: true },
          { name: 'Finished', value: container.State.FinishedAt ? new Date(container.State.FinishedAt).toLocaleString() : '-', inline: true },
          { name: 'Command', value: container.Config.Cmd.join(' '), inline: true },
          { name: 'Ports', value: container.Config.ExposedPorts ? Object.keys(container.Config.ExposedPorts).join(', ') : '-', inline: true },
        );
  
      return interaction.reply({ embeds: [embed] });
    },
  };
  
  function getStateColor(state) {
    switch (state) {
      case 'running':
        return '#00ff00'; // green
      case 'paused':
        return '#ffa500'; // orange
      default:
        return '#ff0000'; // red
    }
  }