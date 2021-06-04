module.exports.help = {
  name: 'add-emoji',
  description: 'Add A Emoji To Server',
  aliases: [],
  category: '📃 General',
  usage: 'add-emoji <emoji-name> <emoji>'
}

module.exports.run = async function(client, message, args) {
if (!message.guild.me.hasPermission ('MANAGE_EMOJIS')) return message.reply('I do not have the `MANAGE_EMOJIS` premission');
        if (!message.member.hasPermission ('MANAGE_EMOJIS')) return message.reply('You do not have the `MANAGE_EMOJIS` permission')
 
        if (!args[0]) return message.reply(`Enter the name of the emoji`)
        if (!args[1]) return message.reply(`Put A Emoji To Add`)
 
        try {
            message.guild.emojis.create(args[1], args[0]).then(emoji => {
                let embed = new MessageEmbed()
                .setTitle('**Emoji added to server**')
                .setThumbnail(`${args[1]}`)
                .addField('Emoji:', `$ {emoji}`)
                .addField('Used By:', message.author.username)
                .setColor("#33908b")
                message.channel.send(embed)
            })
        } catch(err) {
            console.log(err)
            return message.channel.send(`An Error Occured :C`)
        }
}