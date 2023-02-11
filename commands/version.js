const { SlashCommandBuilder } = require("@discordjs/builders");
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
 
        //List docker version
docker.version((err, response) => {
    if (response !== null) result = { ...response };
    else result = {...err}
})
  
        interaction.reply(
          JSON.stringify(result)
        );
      }
    }