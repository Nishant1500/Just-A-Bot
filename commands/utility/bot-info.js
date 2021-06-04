module.exports.help = {
  name: 'bot-info',
  description: 'Shows Bot Info',
  aliases: ['stats'],
  category: '🔗 Utility',
  usage: 'bot-info'
};

const osu = require('node-os-utils');
const mem = osu.mem
const cpu = osu.cpu
const {MessageEmbed} = require('discord.js')
const version = require('../../package.json').version

module.exports.run = async (client, message, args) => {

    const defaultPrefix = '!'
    let guildPrefix = client.prefix.getPrefix(message.guild.id);
    if(!guildPrefix) guildPrefix = defaultPrefix;

    const { totalMemMb, usedMemMb, freeMemMb, freeMemPercentage } = await mem.info();
        const cpuUP = await cpu.usage()
        console.log(await mem.info())

    const embed = new MessageEmbed()
      .setAuthor(
        `Information about the ${client.user.username} Bot`,client.user.displayAvatarURL()
      )
      .addFields(
        {
          name: 'Bot tag',
          value: client.user.tag,
          inline: true
        },
        {
          name: 'Version',
          value: version,
          inline: true
        },
        {
          name: "Server's command prefix",
          value: guildPrefix,
          inline: true
        },
        {
          name: 'Time since last restart',
          value: `${process.uptime().toFixed(2)}s`,
          inline: true
        },
        {
          name: 'Server count',
          value: client.guilds.cache.size,
          inline: true
        },
        {
          name: 'User count',
          value: client.users.cache.size,
          inline: true
        },
        {
          name: 'Memory (RAM) Usage',
          value: 'Total Memory: ' + totalMemMb + " MB\nUsed Memory: " + usedMemMb + " MB\nFree Memory: " + freeMemMb + " MB\nPercentage Of Free Memory: " + freeMemPercentage + "%", 
          inline: true
        },
        {
          name: 'CPU',
          value: 'Percentage of CPU Usage: ' + cpuUP + "%",
          inline: true
        }
      )
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

    await message.channel.send(embed)
  }