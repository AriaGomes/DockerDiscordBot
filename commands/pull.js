const { SlashCommandBuilder } = require("@discordjs/builders");
const Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

let result = null

//Lists all started containers
docker.pull("debian", (err, containers) => {
	if (err) {
        result = {...err};
	} else {
        result = {...containers};
	}
  });

module.exports = {
    data: new SlashCommandBuilder()
      .setName("pull")
      .setDescription(
        "Pulls a container and replies with result"
      ),
      async execute(interaction) {
 
        console.log(result)
  
        interaction.reply(
          JSON.stringify(result)
        );
      }
  };
  