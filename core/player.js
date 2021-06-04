const ytdl = require("ytdl-core");
const  { MessageEmbed } = require("discord.js");
const {getAverageColor} = require('fast-average-color-node');

module.exports.play = async (song, message, updFilter) => {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed();
      
    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      embed.setAuthor("Music queue ended | No More Music In Queue");
      embed.setDescription(
        `Ended without playing a song? Join our [\`Support Server\`](https://discord.gg/Y5NbARWb4n) for assistance!`
      );
      return queue.textChannel.send(embed).catch(console.error);
    }
    try {
      var stream = await ytdl(song.url, { quality: 'highestaudio', highWaterMark: 96 << 150, type: "opus" });

    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send(
          "© | Contents of this video are copyright protected."
        );
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream)
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error)
    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    queue.connection.on("disconnect", () => dispatcher.end());
    embed
      .setAuthor(
        "💿 | Started Playing Your Song", song.avatar)
      .setDescription(`**[${song.title}](${song.url})**`)
      .setImage(`${song.thumbnail}`)
      .setFooter(
        `Channel: ${song.author} | Duration: ${song.duration}m | Uploaded: ${song.date}`
      )
      .addField(`Playing In`, `${queue.channel}`, true)
      .addField(`Bound To`, `${queue.textChannel}`, true)

    queue.textChannel
      .send(embed)
      .catch(err =>
        message.channel.send("Unable to play song :(")
      )
  },

// === PlayLists ===== //



  module.exports.playlistplay = async	function(song, message) {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed().setColor(COLOR);
    /* if(!) {
      queue.channel.leave();
      return embed.setAuthor("No One Is In VC So Why Waste My Quality Music? Bye!");
      embed.setDescription(
        `No One Is Listening In The Voice Channel, I Am Leaving :)`
      );
    } */
    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      embed.setAuthor("Music queue ended | No More Music In Queue");
      embed.setDescription(
        `Ended without playing a song? Join our [\`Support Server\`](https://discord.gg/Y5NbARWb4n)`
      );
      return queue.textChannel.send(embed).catch(console.error);
    }
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
    serverQueue.connection.dispatcher.end();
    const dispatcher = queue.connection
      .play(ytdl(song.url, { quality: 'highestaudio', highWaterMark: 96 << 150, type: "opus" }))
      .on("finish", () => {
        const shiffed = queue.songs.shift();
        if (queue.loop === true) {
          queue.songs.push(shiffed);
        }
        module.exports.play(queue.songs[0], message)
      })

    dispatcher.setVolumeLogarithmic(queue.volume / 100)
  }