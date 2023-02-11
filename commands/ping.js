const { SlashCommandBuilder } = require('@discordjs/builders');
const Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

// Stop all
// docker.listContainers(function (err, containers) {
// 	containers.forEach(function (containerInfo) {
// 	  docker.getContainer(containerInfo.Id).stop();
// 	});
//   });

//Lists all started containers
// docker.listContainers((err, containers) => {
// 	if (err) {
// 	  console.error(err);
// 	} else {
// 	  console.log(containers);
// 	}
//   });

//List docker info
// docker.info((err, result) => {
// 	console.log(result)
// })

//Ping Not working???
// docker.ping((err, result) => {
// 	console.log(result)
// })

let ping = null;
docker.version((err, version) => {
	console.log(version)
	if (version === null) ping = {...err}
	
})


//Error: connect ECONNREFUSED /var/run/docker.sock

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Shard hearbeat response time and checks docker availability'),
	async execute(interaction) {
		
		
		console.log(ping)

		if (ping) {return interaction.reply(`Error: ${ping.syscall} ${ping.code} ${ping.address} ${ping.errno}`)}
		else {return interaction.reply(`🏓 ${Math.round(interaction.client.ws.ping)}ms\nDocker socket is connected`);}
		
	},
};