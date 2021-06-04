module.exports.help = {
  name: 'server-prefix',
  description: 'Change Prefix To Custom One For The Whole Server/Guild',
  aliases: ['guild-prefix'],
  usage: 'server-prefix <new-prefix>',
  category: '🔗 Utility'
}

module.exports.run = async function (client, message, args) {
  if(!args[0]) {
    return message.channel.send('You Need To Provide A New Prefix, Please :)')
  }
  if(args.length > 1) {
    return message.channel.send('Please Dont Put Any Space. It Can Ruin Our Systems')
  }
  client.prefix.setPrefix(args[0], message.guild.id)
  return message.channel.send(`Sucessfully Set This Guild Prefix To ${args[0]}`)
}