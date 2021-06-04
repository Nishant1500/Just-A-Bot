
module.exports.help = {
  name: 'emojify',
  descreption: 'Convert Text Into Some Good Looking Emoji. Might Be Bad Idk',
  aliases: [],
  category: '😂 Fun',
  usage: 'emojify <text>'
  }

const {MessageEmbed} = require('discord.js')
const emojify = require('discord-emojify');
module.exports.run = async function(client, message,args) {
    if(args.length) {
      const data = await emojify(args.join(" "))
      return message.channel.send(data)
    } else return message.channel.send('Please Provide Some Text To Change It To Some Emojis :D')
}