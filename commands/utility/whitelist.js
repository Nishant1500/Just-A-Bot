module.exports.help = {
	name: 'whitelist',
	description: 'Whitelist A User To Access A Private Command',
	aliases: [],
	category: '🚫 Hidden',
	usage: 'whitelist <cmd> <user-id>'
};

const db = require('quick.db');
module.exports.run = async function(client, message, args) {
  if(!args.length) return message.channel.send('You Need To Provide An Id To White List')
  if(message.author.id !== '514699064210882562') return message.channel.send('Sorry this command is only accessible to bot owner')
  db.set(args[1] + '.whitelist' + `.${args[0]}`, true)
  return message.channel.send('Done!')
};
