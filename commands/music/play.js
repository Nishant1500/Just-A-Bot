const { MessageEmbed, Util } = require('discord.js');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
const { play, playlistplay } = require('../../core/player.js');
const QUEUE_LIMIT = 0

module.exports.help = {
  name: "play",
  description: 'Plays Music',
  aliases: ['p'],
  category: "🎶 Music",
  usage: 'play <song name/url or playlist url>'
}

module.exports.run = async function(client, message, args) {
  
  const { channel } = message.member.voice;

if (!channel) return message.channel.send({embed: {description: `👀 | You must be in a voice channel to play!`}});
  
if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send({embed: {description: `👀 | You are not in my voice channel!`}});

let query = args.join(" ");
if (!query) return message.channel.send({embed: {description: `👀 | Please enter a song name/ URL to play!` }})

		let embed = new MessageEmbed().setColor('RANDOM');
		const targetsong = args.join(' ');
		const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
		const urlcheck = videoPattern.test(args[0]);
		const urlx = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    

      
		if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
			try {
				const playlist = await ytpl(urlx.split('list=')[1]);
				if (!playlist) return sendError('Playlist not found', message.channel);
				let playlistInfo = await ytpl(urlx);
				const playlistx = {
					title: playlistInfo.title,
					url: playlistInfo.url,
					author: playlistInfo.author.name,
					thumbnailUrl: playlistInfo.items[0].thumbnail,
					items: playlistInfo.items.length
				};

				const videos = await playlist.items;
				for (const video of videos) {
					await handleVideo(video, message, channel, true);
				}
				return message.channel.send(
					new MessageEmbed()
						.setColor(COLOR)
						.setTitle('Added Select Playlist!')
						.setURL(playlistx.url)
						.setDescription(
							`<a:success:756884916213514341> **|**  Playlist: **\`${
								playlistx.title
							}\`** has been added to the queue`
						)
						.addField(`Enqueued Songs:`, playlistx.items)
						.setTimestamp()
				);
			} catch (error) {
				console.error(error);
				return message.channel
					.send('Playlist not found :(')
					.catch(console.error);
			}

			async function handleVideo(video, message, channel, playlist = false) {
				const serverQueue = message.client.queue.get(message.guild.id);
				const song = {
					id: video.id,
					title: Util.escapeMarkdown(video.title),
					views: video.views ? video.views : '-',
					ago: video.ago ? video.ago : '-',
					duration: video.duration,
					url: `https://www.youtube.com/watch?v=${video.id}`,
					img: video.thumbnail,
					req: message.author
				};
				if (!serverQueue) {
					const queueConstruct = {
						textChannel: message.channel,
						channel,
						connection: null,
						songs: [],
						volume: 100,
						playing: true,
						loop: false,
						additionalStreamTime: 0
					};
					message.client.queue.set(message.guild.id, queueConstruct);
					queueConstruct.songs.push(song);

					try {
						var connection = await channel.join();
						queueConstruct.connection = connection;
						playlistplay(queueConstruct.songs[0], message);
					} catch (error) {
						console.error(`I could not join the voice channel: ${error}`);
						message.client.queue.delete(message.guild.id);
						return message.channe.send(
							`I could not join the voice channel: ${error}`
						);
					}
				} else {
					serverQueue.songs.push(song);
				}
				return;
			}
		}

		const serverQueue = message.client.queue.get(message.guild.id);

		const queueConstruct = {
			textChannel: message.channel,
			channel,
			connection: null,
			songs: [],
			loop: false,
			volume: 100,
			playing: true,
			additionalStreamTime: 0
		};

		const voteConstruct = {
			vote: 0,
			voters: []
		};

		let songData = null;
		let song = null;

		if (urlcheck) {
			try {
				const x = await ytsr.getFilters(args[0]);
				const filter = x.get('type').get('Video');
				const result = await ytsr(filter.url, {
					page: 1
				});
				songData = result.items[0];
				console.log(result.items);

				song = {
					title: songData.title,
					url: songData.url,
					duration: songData.duration,
					thumbnail: songData.bestThumbnail.url,
					avatar: songData.author.bestAvatar.url,
					description: songData.description,
					author: songData.author.name,
					date: songData.uploadedAt
				};
			} catch (error) {
				if (message.include === 'copyright') {
					return message
						.reply('© | Contents of this video are copyright protected.')
						.catch(console.error);
				} else {
					console.error(error);
				}
			}
		} else {
			try {
				const result = await ytsr(targetsong, {
					pages: 1
				});
				songData = result.items[0];

				song = {
					title: songData.title,
					url: songData.url,
					duration: songData.duration,
					thumbnail: songData.bestThumbnail.url,
					avatar: songData.author.bestAvatar.url,
					description: songData.description,
					author: songData.author.name,
					date: songData.uploadedAt
				};
			} catch (error) {
				console.log(error);
				return message.channel.send('Fatal error!');
			}
		}

		if (serverQueue) {
			if (
				serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) &&
				QUEUE_LIMIT !== 0
			) {
				return message.channel.send(
					`❌ | You can't add more than ${QUEUE_LIMIT} in the queue!`
				);
			}

			serverQueue.songs.push(song);
			embed.setAuthor(
				'Added New Song To Queue',
				song.avatar
			);
			embed.setDescription(`**[${song.title}](${song.url})**`);
			embed.setImage(song.thumbnail);
			embed.setFooter(
				`Channel: ${song.author} | Duration: ${song.duration}m | Uploaded On: ${
					song.date
				}`
			);
			embed.addField(`Playing In`, `${channel}`, true);
			embed.addField(`Bound To`, `${message.channel}`, true);
			return serverQueue.textChannel.send(embed).catch(console.error);
		} else {
			queueConstruct.songs.push(song);
		}

		if (!serverQueue)
			message.client.queue.set(message.guild.id, queueConstruct);
		message.client.vote.set(message.guild.id, voteConstruct);
		if (!serverQueue) {
			try {
				queueConstruct.connection = await channel.join();
				play(queueConstruct.songs[0], message);
			} catch (error) {
				console.error(`Could not join voice channel: ${error}`);
				message.client.queue.delete(message.guild.id);
				await channel.leave();
				return message.channel
					.send({
						embed: {
							description: `${client.emojis.error} | Could not join the channel: ${error}`,
							color: '#ff2050'
						}
					})
					.catch(console.error);
			}
		}
	};