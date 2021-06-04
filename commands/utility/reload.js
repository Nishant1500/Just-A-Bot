module.exports.help = {
  name: 'reload',
  description: 'Reloads A Specific Command',
  aliases: [],
  category: '🚫 Hidden',
  usage: 'reload <command> <category>'
}

module.exports.run = async function(client, message, args) {
  if(message.author.id !== '514699064210882562') {
    message.channel.send('You Dont Have Permission To Use This Command. One Of The Owner Need To Blacklist You To Access This Command.')
           return console.log(`${message.author.username} Tried To Use Eval In ${message.guild.name}`)
  }
  const commandName = args[0];
  const fs = require('fs')
  if(!commandName) {
    return message.reply("Must provide a command name to reload.");
  } else if(!client.commands.has(commandName)) {
    return message.reply(`The command \`${commandName}\` does not exist.`);
  } else if(commandName.trim() == "reload") {
    return message.reply("The \`reload\` command cannot be reloaded.");
  }
  
  if(!args[1]) return message.reply("Must provide a category of the command to reload")

  if(client.category.has(args[1])) {

  delete require.cache[require.resolve(`../${args[1]}/${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`../${args[1]}/${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command \`${commandName}\` has been reloaded`);
  } else return message.reply('There Is No Category Like That')
};