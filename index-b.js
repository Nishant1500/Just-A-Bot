const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: 'everyone',
});
const { MessageEmbed } = require('discord.js');
const prefix = require('discord-prefix');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection();
client.category = new Discord.Collection();
client.queue = new Map();
client.vote = new Map();
client.prefix = prefix;
client.muted = require('./muted.json')

async function run() {

const fs = require("fs");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

await fs.readdir("./commands/",(err, directories) => {
  console.log(`Loading a total of ${directories.length} categories.`);
	directories.forEach(async (dir) => {
		await fs.readdir("./commands/"+dir+"/", (err, commands) => {
      if(err) {
        return console.log(err)
      }
      commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
    let pull = require(`./commands/${dir}/${cmd}`);
   
    client.commands.set(pull.help.name, pull);
    client.category.set(dir, true)
    pull.help.aliases.forEach(alias => {
    client.aliases.set(alias, pull.help.name)
    });
    });
		});
	});
});


client.login(process.env.TOKEN)
}

run();
