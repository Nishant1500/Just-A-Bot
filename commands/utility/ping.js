
module.exports.help = {
    name: "ping",
    description: "Shows Bot Latency and Ping",
    aliases: ["pong"],
    category: "🔗 Utility",
  usage: "ping"
}
 const {MessageEmbed} = require('discord.js')
module.exports.run = async function(client, message, args) {
const gatewayLatency = Math.round(client.ws.ping);

message.channel.send('🏓Pinging...').then((m) => {
const embed = new MessageEmbed()
              .setTitle("Pong!")
            .addField("API Latency", `\`${gatewayLatency}ms\``, true)
            .addField("Client Latency", `\`${m.createdTimestamp - message.createdTimestamp}ms\``, true)
            .setColor("FFD494")
            .setImage('https://cdn.discordapp.com/attachments/584291012281630742/847479947564285962/unknown.png')
            .setTimestamp();
        m.edit(embed);
})
}