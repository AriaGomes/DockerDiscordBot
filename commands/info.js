const { SlashCommandBuilder } = require("@discordjs/builders");
const Docker = require("dockerode");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("info")
      .setDescription(
        "Replies with system docker information"
      ),
      async execute(interaction) {
        try {
          const docker = new Docker();
          const info = await docker.info();
    
          const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Docker Environment Information')
            .addFields(
               { name: 'ID', value: info.ID },
               { name: 'Name', value: info.Name },
               { name: 'Server Version', value: info.ServerVersion },
               { name: 'Operating System', value: info.OperatingSystem },
               { name: 'Architecture', value: info.Architecture },
              { name: 'Total Memory', value: `${(info.MemTotal / 1024 / 1024).toFixed(2)} MB` },
              { name: 'Docker Root Directory', value: info.DockerRootDir },
            );
    
          await interaction.reply({ embeds: [embed] });
        } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'An error occurred while getting Docker environment information.', ephemeral: true });
        }
    }
}
