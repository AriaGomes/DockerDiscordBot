const { SlashCommandBuilder } = require("@discordjs/builders");
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
    if (ping !== null) {
      console.log(ping);
    }

    if (ping !== null) {
      return interaction.reply(
        `Error: ${ping.syscall} ${ping.code} ${ping.address} ${ping.errno}`
      );
    } else {
      return interaction.reply(
        `🏓 ${Math.round(
          interaction.client.ws.ping
        )}ms\nDocker socket is connected`
      );
    }
  },
};
