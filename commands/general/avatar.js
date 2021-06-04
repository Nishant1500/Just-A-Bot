const {MessageEmbed} = require('discord.js');
module.exports.help = {
    name: 'avatar',
    description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
    aliases: ['av'],
    category: '📃 General',
    usage: 'avatar (mention)',
}
module.exports.run = async function(client, message, args) {
        if (!message.mentions.members.size) {
            const embed = new MessageEmbed()
                .setTitle(message.author.username + '\'s Avatar')
                .setColor(0x00ffff)
                .setImage(message.author.displayAvatarURL({ dynamic: true, size: 2048}));
            return message.channel.send(embed);
        }

        const mention = message.mentions.members.first();
        const Embed = new MessageEmbed()
            .setTitle(message.mentions.members.first().user.username + '\'s Avatar')
            .setColor(0x00ffff)
            .setImage(mention.user.displayAvatarURL({ dynamic: true, size: 2048}));
        return message.channel.send(Embed);

    };
