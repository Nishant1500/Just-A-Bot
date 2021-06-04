
module.exports.help = {
    name: "invite",
    descreption: "Get Bot Invite Links And Others",
    aliases: ["bot-invite", "inv", "invite-bot"],
    category: "🔗 Utility",
  usage: "invite"
}

module.exports.run = async function(client, message, args) {
const { MessageEmbed } = require('discord.js');
const invite = new MessageEmbed()
  .setDescription('Invite Just A Bot To Your Servers :D')
  .setTitle('Bot Invite Link')
  .addField('Administration Perms Link', '[`Invite`](https://discord.com/api/oauth2/authorize?client_id=827814834782601236&permissions=8&scope=bot)')
  .addField('Normal Perms Link', '[`Invite`](https://discord.com/api/oauth2/authorize?client_id=827814834782601236&permissions=201334791&scope=bot)')
  .setImage('https://cdn.discordapp.com/attachments/584291012281630742/847459853948551249/unknown.png')
  .setColor('5865F2');
message.channel.send(invite)
}