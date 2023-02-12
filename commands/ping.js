const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');
const Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

// Stop all
// docker.listContainers(function (err, containers) {
// 	containers.forEach(function (containerInfo) {
// 	  docker.getContainer(containerInfo.Id).stop();
// 	});
//   });


let ping = null;

docker.version((err, version) => {
  if (version === null) ping = { ...err };
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Replies with Shard hearbeat response time and checks docker availability"
    ),
	async execute(interaction) {
		const start = Date.now();
		const response = await docker.ping();
		const end = Date.now();
		const responseTime = end - start;
	
		const embed = new EmbedBuilder()
		  .setTitle('Latency')
		  .setDescription(`Response time: ${responseTime}ms\n\nDiscord API Response Time: ${interaction.client.ws.ping}ms`)
		  .setColor('#0099ff');
	
		await interaction.reply({ embeds: [embed] });
  },
};
