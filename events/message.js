module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const defaultPrefix = '!'
    let args = null;
    let guildPrefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : client.prefix.getPrefix(message.guild.id);
    if(!guildPrefix) guildPrefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : defaultPrefix;
    if (message.content.startsWith(guildPrefix)) args = message.content.slice(guildPrefix.length).trim().split(' ');
    client.commands.get('afk').run(client, message, args);
      if(message.mentions.members) {
        message.mentions.members.forEach((mention) => {
          if(client.db.has(mention.id + '.afk')) {
        if(client.db.has(mention.id + '.messageafk') || client.db.has(mention.id + '.messageafk')) {
          message.channel.send(`${mention.user.tag} Went Afk. They Also Left A Message: "${client.db.fetch(mention.id + '.messageafk')}"`)
        } else {
          message.channel.send(`${message.mentions.members.first().user.tag} Went Afk.`)
        }
      }
        })
}
      if (!message.content.startsWith(guildPrefix)) return;
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (!command) return;
    console.log(`${message.guild.name}:${message.guild.id} | ${message.author.tag} Used ${commandName}`)
    client.ecoAddUser = message.author.id;
    if(!message.content.includes(`${guildPrefix}afk` || `${guildPrefix}idk`)) {
      command.run(client, message, args)
    }
};
