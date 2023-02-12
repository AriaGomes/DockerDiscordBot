const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Docker = require('dockerode');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('run')
    .setDescription('Run a Docker container')
    .addStringOption(option => option.setName('image').setDescription('Name of the Docker image').setRequired(true))
    .addStringOption(option => option.setName('cmd').setDescription('Command to run in the Docker container'))
    .addStringOption(option => option.setName('name').setDescription('Name for the Docker container'))
    .addStringOption(option => option.setName('env').setDescription('Environment variables to set in the container')),
  async execute(interaction) {
    const image = interaction.options.getString('image');
    const cmd = interaction.options.getString('cmd');
    const name = interaction.options.getString('name');
    const env = interaction.options.getString('env');

    const docker = new Docker();

    const options = {};
    if (cmd) {
      options.Cmd = cmd.split(' ');
    }
    if (name) {
      options.name = name;
    }
    if (env) {
      options.Env = env.split(';');
    }

    try {
        
      let container = await docker.run(image, [], process.stdout, options);
      container = {...container["1"]}
      console.log(container)
      const embed = new EmbedBuilder()
        .setTitle(`Container ${container.id} started`)
        .setColor('#00ff00')
        .setDescription(`Started container from image \`${image}\``)
        .addFields(
          { name: 'Command', value: cmd || 'None' },
          { name: 'Name', value: name || 'None' },
          { name: 'Environment Variables', value: env || 'None' },
        );
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setTitle('Error')
        .setColor('#ff0000')
        .setDescription(`Failed to start container from image \`${image}\``)
        .addFields({name: 'Reason',value: error.message});
      await interaction.reply({ embeds: [embed] });
    }
  },
};
