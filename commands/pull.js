const { SlashCommandBuilder } = require("@discordjs/builders");
const Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

let progressMsg

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pull")
    .setDescription("Pulls a container and replies with result")
    .addStringOption((image) =>
      image
        .setName("image")
        .setDescription("image:tag you would like to pull")
        .setRequired(true)
    ),
    async execute(interaction) {
        const imageName = interaction.options.getString('image');
        progressMsg = ''
        await interaction.reply(`Pulling ${imageName} Docker image...`);
    
        docker.pull(imageName, (err, stream) => {
          if (err) return interaction.editReply(`Error Pulling ${imageName}\n\n${progressMsg}`);
    
          let buffer = '';
          stream.on('data', (chunk) => {
            buffer += chunk.toString();
            const progressMsg = buffer
              .split('\n')
              .filter(Boolean)
              .map((line) => '> ' + line)
              .join('\n');
    
            interaction.editReply(`Pulling ${imageName} Docker image...\n\n${progressMsg}`);
          });
    
          stream.on('end', () => {
           progressMsg = buffer
              .split('\n')
              .filter(Boolean)
              .map((line) => '> ' + line)
              .join('\n');
    
            interaction.editReply(`Successfully pulled ${imageName} Docker image!\n\n${progressMsg}`);
          });
        });
      
    
  },
};
