const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Docker = require('dockerode');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search Docker images')
    .addStringOption(option =>
      option.setName('term')
        .setDescription('Search term')
        .setRequired(true)),
  async execute(interaction) {
    const term = interaction.options.getString('term');

    const docker = new Docker();
    const searchResults = await docker.searchImages({ term });

    const imageResults = searchResults.map(result => {
      const { name, description, is_official, is_automated, star_count } = result;

      return {
        name: `${name}${is_official ? ' (Official)' : ''}`,
        is_official: is_official,
        star_count: star_count,
        is_automated: is_automated,
        value: description || 'No description provided',
      };
    });

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Search Results for "${term}"`)
      .addFields(imageResults);

    await interaction.reply({ embeds: [embed] });
  },
};