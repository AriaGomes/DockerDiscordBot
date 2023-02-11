const { SlashCommandBuilder } = require("@discordjs/builders");
const Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

let result = null



module.exports = {
    data: new SlashCommandBuilder()
      .setName("list")
      .setDescription(
        "Replies with started containers"
      ),
      async execute(interaction) {

        //Lists all started containers
docker.listContainers((err, containers) => {
	if (err) {
        result = {...err};
	} else {
        result = {...containers};
	}
  });
 
        console.log(result)
  
        interaction.reply(
          JSON.stringify(result)
        );
      }
  };
  