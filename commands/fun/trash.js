
module.exports.help = {
  name: 'trash',
  descreption: "Make A Image Of Mentioned User In Trash",
  aliases: [],
  category: '😂 Fun',
  usage: 'trash <mention>'
  }

const {MessageAttachment} = require('discord.js');
const canvacord = require('canvacord');
module.exports.run = async function(client, message,args) {
    const member = message.mentions.members.first();
    if(!member) return message.channel.send('Who To Make Trash? Mention An User Or i make some random dude a trash lol')
    if(member.user.bot) {
      let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trash(avatar);
        let attachment = new MessageAttachment(image, "trash.png");
        return message.channel.send('Bots Are too cool to get trashed. Get trashed yourself',attachment)
    }
    let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trash(avatar);
        let attachment = new MessageAttachment(image, "trash.png");
        return message.channel.send(attachment)
}