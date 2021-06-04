const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "queue",
  description: "Get all the song name which are in queue",
  aliases: ["q", "list"],
  category: '🎶 Music',
  usage: 'queue'
};
module.exports.run = async function(client, message, args) {
    let embed = new MessageEmbed().setColor('RANDOM');
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor(
        "❌ | You need to be in a Voice Channel Before executing this command"
      );
      return message.channel.send(embed);
    }

    const queue = message.client.queue.get(message.guild.id);

    if (!queue) {
      embed.setAuthor("There is nothing in the queue");
      return message.channel.send(embed);
    }

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `> **__Page:__** **${currentPage + 1}** **__Of__** **${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("🗑");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "🗑", "➡️"].includes(reaction.emoji.name) &&
      message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, {
      time: 60000,
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(
              `> **__Page:__** **${currentPage + 1}** **__Of__** **${
                embeds.length
              }**`,
              embeds[currentPage]
            );
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(
              `> **__Page:__** **${currentPage + 1}** **__Of__** **${
                embeds.length
              }**`,
              embeds[currentPage]
            );
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });

    function generateQueueEmbed(message, queue) {
      let embeds = [];
      let k = 5;

      for (let i = 0; i < queue.length; i += 5) {
        const current = queue.slice(i, k);
        let x = i;
        k += 5;

        const info = current
          .map((track) => `**\`${++x}\`** | [\`${track.title}\`](${track.url})`)
          .join("\n");

        const serverQueue = message.client.queue.get(message.guild.id);
        const embed = new MessageEmbed()
          .setAuthor("Server Songs Queue")
          .setThumbnail(message.guild.iconURL())
          .setColor('RANDOM')
          .setDescription(`${info}`)
          .addField(
            "Now Playing",
            `**[${queue[0].title}](${queue[0].url})**`,
            true
          )
          .addField("Text Channel", serverQueue.textChannel, true)
          .addField("Voice Channel", serverQueue.channel, true)
          .addField("Volume", `**${serverQueue.volume}**`, true)
          .setTimestamp();

        if (serverQueue.songs.length === 1)
          embed.setDescription(
            `No songs to play next add songs by \`\`!play <song_name>\`\``
          );

        embeds.push(embed);
      }

      return embeds;
    }
  };