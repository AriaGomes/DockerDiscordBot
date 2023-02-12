const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');
const Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

let result = null;



module.exports = {
    data: new SlashCommandBuilder()
      .setName("version")
      .setDescription(
        "Replies with system docker version information"
      ),
    async execute(interaction) {
 
        const version = await docker.version();

        const embed = new EmbedBuilder()
          .setTitle('Docker Version Information')
          .addFields(
            { name: 'API Version', value: version.ApiVersion, inline: true },
            { name: 'Version', value: version.Version, inline: true },
            { name: 'Git Commit', value: version.GitCommit, inline: true },
            { name: 'Go Version', value: version.GoVersion, inline: true },
            { name: 'Operating System', value: version.Os, inline: true },
            { name: 'Kernel Version', value: version.KernelVersion, inline: true },
            { name: 'Build Time', value: version.BuildTime, inline: true },
          )
          .setColor('#0099ff');
    
        await interaction.reply({ embeds: [embed] });
      }
    }