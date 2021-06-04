const {MessageEmbed} = require('discord.js')
const db = require('quick.db');
db.set('514699064210882562.whitelist.eval', true)
module.exports.run = async (client, message, args) => {
        if(db.has(message.author.id + '.whitelist.eval')) {
          const embed = new MessageEmbed()
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed)
        try {
            const data = eval(args.join(' ').replace(/```/g, ''))
            const embed = new MessageEmbed()
                .setTitle('Eval Command')
                .setDescription(await data)
            await msg.edit(embed);
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id)
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emojis) => {
                        switch (emojis._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll()
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })

        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle('An Error occured')
                .setDescription(error);
            console.error(error);
            return await msg.edit(embed);
        }
        } else {
          message.channel.send('You Dont Have Permission To Use This Command. One Of The Owner Need To Blacklist You To Access This Command.')
           return console.log(`${message.author.username} Tried To Use Eval In ${message.guild.name}`)
        }
};
module.exports.help = {
  name: 'eval',
  description: 'A Eval Command To Directly Run A Script From In-App',
  aliases: [],
  category: "🔗 Utility",
  usage: "eval <script>"
}
