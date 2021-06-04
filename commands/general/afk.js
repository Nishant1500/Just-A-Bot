const db = require('quick.db')
module.exports.run = async function(client, message, args) {
  client.db = db
const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const defaultPrefix = '!'
    let guildPrefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : client.prefix.getPrefix(message.guild.id);
    if(!guildPrefix) guildPrefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : defaultPrefix;
      if(message.author.bot) return;
    if(!message.guild) return;
  if (!message.member) message.member = message.guild.fetchMember(message);
    if (message.content.startsWith(`${guildPrefix}afk`)) {
      if(db.has(message.author.id + '.afk')) {
message.channel.send(`Welcome back ${message.author}, I removed your AFK status.`).then(msg => msg.delete({timeout: 7000}));
if(message.guild.member(message.author).nickname) {
if(message.guild.me.hasPermission('MANAGE_NICKNAMES') != true) {
        return message.reply('Sorry I cant change your nickname. Please Give Me Perms To Change Others Nickname.');
      }
      if(message.member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply('Sorry I cant change your nickname. I Need To Be Higher Than Your Role.');
      if(db.has(message.author.id + '.nickafk')) {
        console.log('HI GIG I')
        message.member.setNickname(`${db.get(message.author.id + '.nickafk')}`)
        db.delete(message.author.id + '.nickafk');
      } else {
        console.log('HEHEHE')
        message.member.setNickname(`${message.author.username}`)
        db.delete(message.author.id + '.nickafk')
      }
}
db.delete(message.author.id + '.afk')
db.delete(message.author.id + '.messageafk')
return;
} else {
      message.channel.send(`I have set your AFK status.`)

db.set(message.author.id + '.afk','true')
if(args.length) {
  if(args == 'afk') {} else db.set(message.author.id + '.messageafk', args.join(" ").replace('afk ', ''));
};

      if(!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
        return message.channel.send('Sorry I cant change your nickname. I Need Perms To Change Others Nickname.');
      }
      if(message.member.roles.highest.position >= message.guild.members.resolve(client.user).roles.highest.position) return message.reply('Sorry I cant change your nickname. I Need To Be Higher Than Your Role.');
      if(!message.guild.member(message.author).nickname) {
        message.member.setNickname(`[AFK] ${message.author.username}`)
      } else {
        db.set(message.author.id + '.nickafk', message.guild.member(message.author).nickname)
        message.member.setNickname(`[AFK] ${message.guild.member(message.author).nickname}`)
      }
return;
    }
    }

    if(db.has(message.author.id + '.afk')) {
message.channel.send(`Welcome back ${message.author}, I removed your AFK status.`).then(msg => msg.delete({timeout: 7000}));
if(message.guild.member(message.author).nickname) {
if(message.guild.me.hasPermission('MANAGE_NICKNAMES') != true) {
        return message.reply('Sorry I cant change your nickname. Please Give Me Perms To Change Others Nickname.');
      }
      if(message.member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply('Sorry I cant change your nickname. I Need To Be Higher Than Your Role.');
      if(db.has(message.author.id + '.nickafk')) {
        console.log('HI GIG I')
        message.member.setNickname(`${db.get(message.author.id + '.nickafk')}`)
        db.delete(message.author.id + '.nickafk');
      } else {
        console.log('HEHEHE')
        message.member.setNickname(`${message.author.username}`)
        db.delete(message.author.id + '.nickafk')
      }
}
db.delete(message.author.id + '.afk')
db.delete(message.author.id + '.messageafk')
return;
}
    
   }

module.exports.help = {
      name: "afk",
    description: "Set an AFK status to display when you are mentioned.",
      aliases: ["idk"],
      category: "📃 General",
  usage: "afk (afk message)"
}