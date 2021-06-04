module.exports.help = {
  name: 'dashboard',
  description: 'Gives The Link Of Just A Bot\'s Dashboard',
  aliases: ["dash"],
  category: '📃 General',
  usage: 'dashboard'
}

module.exports.run = async function(client, message, args) {
  message.channel.send('Here Is The Dashboard Link:-\nhttps://just-a-bot.tk/')
}