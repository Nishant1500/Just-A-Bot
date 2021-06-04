module.exports.help = {
  name: 'help',
  description: 'Get list of all command and even get to know every command detials',
  aliases: ["halp"],
  category: "🔗 Utility",
  usage: "help (cmd)"
}
const {MessageEmbed} = require('discord.js')
module.exports.run = async function(client, message, args) {
  const defaultPrefix = '!'
    let guildPrefix = client.prefix.getPrefix(message.guild.id);
    if(!guildPrefix) guildPrefix = defaultPrefix;
  if (args[0]) {
      let command = await client.commands.get(args[0]);

      if (!command) {
        const aliasesCommand = await client.commands.get(client.aliases.get(args[0]));
        if(!aliasesCommand) return message.channel.send("Unknown Command: " + args[0]);
        command = aliasesCommand;
      }

      let embed = new MessageEmbed()
        .setAuthor(command.help.name[0].toUpperCase() + command.help.name.substring(1))
        .addField("Description", command.help.description || "Not Provided :(", true)
        .addField("Usage", "`" + guildPrefix + command.help.usage + "`" || "Not Provied", true)
        .setColor("B4EB46")
        .setFooter('P.S: "<>"is required, "()"is optional');

      return message.channel.send(embed);
} else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setFooter('P.S: "<>"is required, "()"is optional')
        .setTitle(client.user.username + '\'s Commands')
        .setColor("B4EB46")
        .setDescription(`Here is the list of all commands.\nTo get detailed info about a command do \`${guildPrefix}help <cmd name>\``)
        .setImage('https://cdn.discordapp.com/attachments/584291012281630742/847794733283409950/unknown.png')

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.help.category + ' Commands' || "Unknown";
        let name = comm.help.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + guildPrefix+ value.join(`\`, \`${guildPrefix}`) + "`";
        if(category != '🚫 Hidden Commands') {
        emx.addField(`${category}: ${value.length}`, desc, true);
        }
      }

      return message.channel.send(emx);
    }
  }