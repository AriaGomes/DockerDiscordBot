const { SlashCommandBuilder } = require("@discordjs/builders");
const Docker = require("dockerode");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

let result = null;

        //List docker info
        docker.info((err, response) => {
            if (response) result = { response };
            else result = {err}
        })

module.exports = {
    data: new SlashCommandBuilder()
      .setName("info")
      .setDescription(
        "Replies with system docker information"
      ),
    async execute(interaction) {
 
        console.log(result)
  
        interaction.reply(
          JSON.stringify(result)
        );
      }
    }