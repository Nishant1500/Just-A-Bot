module.exports.help = {
  name: 'kick',
  descreption: "kicks a member",
  aliases:[],
  category: '⚒️ Moderation',
  usage: 'kick <mention>'
}

 const {MessageEmbed} = require('discord.js')
module.exports.run = async function(client, message,args) {
  if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have Permission to kick :C");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have Permission to kick!");
    let toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!toKick) return message.channel.send("You did not specify a user mention or ID!");
    if(toKick.id === message.author.id) return message.channel.send("You can not kick yourself!");
    if(toKick.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can not kick a member that is equal to or higher than yourself!");
    if(toKick.id === message.client.user.id) return leave();
    function leave() {
      let filter = m => m.author.id === message.author.id
      message.channel.send("Do You Really Want Me To Kick Myself?\n Answer in `Yes`or `No`").then(() => {
      message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then(collected => {

      if(collected.first().content.toLowerCase() === 'no') return message.channel.send('Okay I Will Not Leave, Cancelling Kick')
      if(collected.first().content.toLowerCase() == 'yes') {
        message.channel.send('Aight, Am Leaving Bye!')
        return message.guild.leave();
      }
      else return message.channel.send('Unknown Response Provided!')
      }).catch((err) => {
        console.log(err)
        return message.channel.send('No Response Provided! Cancelling Kick...');
      });
    });
    }
    if(toKick.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send("Sorry I cannot kick a member that is equal to or higher than me!");
      toKick.kick();
      const kick = new MessageEmbed()
      .setTitle('Kicked')
      .setDescription(`Kicked ${toKick.user.tag} From ${message.guild.name}`)
      .setColor('RANDOM')
      .setImage('https://cdn.discordapp.com/attachments/584291012281630742/847474576274882641/unknown.png')
      message.channel.send(kick)
}