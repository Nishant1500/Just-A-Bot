const Discord = require('discord.js');
const got = require('got');

module.exports.help = {
	name: 'meme',
	description: 'Find Random Memes, Some Are Really Awesome. Try It! :D',
	category: '😂 Fun',
	aliases: ['mem'],
	usage: 'meme'
};

module.exports.run = async (bot, message, args) => {
	const embed = new Discord.MessageEmbed();
	got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.addFields({
			  name: 'Author',
        value: post.data.name,
        inline: true
			  },
			  {
			   name: '👍 Upvotes',
			   value:memeUpvotes,
			   inline: true
},
			{
			name: '💬 Comments',
		  value: memeNumComments,
		  inline: true
			});

			message.channel.send(embed);
		})
		.catch(console.error);
};