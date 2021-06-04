
module.exports.help = {
  name: 'ban',
  descreption: "Ban a Memeber",
  aliases: [],
  category: '⚒️ Moderation',
  usage: 'ban <user>'
  }

const {MessageEmbed} = require('discord.js')
module.exports.run = async function(client, message,args) {
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have Permission to ban :C");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have Permission to ban!");
    let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!toBan) return message.channel.send("You did not specify a user mention or ID!");
    if(toBan.id === message.author.id) return message.channel.send("You can not ban yourself!");
    if(toBan.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can not ban a member that is equal to or higher than yourself!");
    if(toBan.id === message.client.user.id) return leave();
    function leave() {
      let filter = m => m.author.id === message.author.id
      message.channel.send("Do You Really Want Me To Ban Myself?\n Answer in `Yes`or `No`").then(() => {
      message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then(collected => {

      if(collected.first().content.toLowerCase() === 'no') return message.channel.send('Okay I Will Not Ban Myself, Cancelling Ban')
      if(collected.first().content.toLowerCase() == 'yes') {
        message.channel.send('I Would Leave Rather Banning Myself lol, Bye!')
        return message.guild.leave();
      }
      else return message.channel.send('Unknown Response Provided!')
      }).catch((err) => {
        console.log(err)
        return message.channel.send('No Response Provided! Cancelling Ban...');
      });
    });
    }
    if(toBan.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send("Sorry I cannot ban a member that is equal to or higher than me!");
      toBan.ban();
      const ban = new MessageEmbed()
      .setTitle('Banned')
      .setDescription(`Ban Hammer has spoken!\n${toBan.user.tag} Have Been Banned From ${message.guild.name}`)
      .setColor('RANDOM')
      .setImage('https://cdn.discordapp.com/attachments/584291012281630742/847471846680428564/unknown.png')
      message.channel.send(ban)
}