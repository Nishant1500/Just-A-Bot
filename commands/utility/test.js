module.exports.help = {
    name: "test",
    description: "Shows The Current Experiment Of Just A Bot",
    aliases: [],
    category: "🚫 Hidden",
  usage: "test"
}
const Discord = require('discord.js')
const client = new Discord.Client();
const disbut = require('discord-buttons')(client);

module.exports.run = async function(client, message, args) {
  let btn = new disbut.MessageButton()
     .setStyle('green')
        .setLabel('This Is A test')
        .setID('invbb');
  message.channel.send('Hey', {button: btn})
}