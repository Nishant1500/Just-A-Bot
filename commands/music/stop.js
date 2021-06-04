const { MessageEmbed } = require('discord.js');

const discord = require('discord.js');

module.exports.help = {
	name: 'stop',
	description: 'Disconnect the bot and take some rest',
	usage: 'stop',
	category: '🎶 Music',
	aliases: ['dc', 'disconnect']
};

module.exports.run = async function(client, message, args) {
	let embed = new MessageEmbed().setColor('RANDOM');

	const { channel } = message.member.voice;

	if (!channel) {
		//IF AUTHOR IS NOT IN VOICE CHANNEL
		embed.setAuthor(
			'❌ | You need to be in a voice channel before executing this command'
		);
		return message.channel.send(embed);
	}

	const serverQueue = message.client.queue.get(message.guild.id);

	if (!serverQueue) {
		await channel.leave();
		embed.setAuthor('Successfully Disconnected');
		return message.channel.send(embed);
	}

	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
};
