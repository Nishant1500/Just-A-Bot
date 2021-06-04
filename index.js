const Discord = require("discord.js"); // Discord.Js
const client = new Discord.Client({
  disableMentions: 'everyone',
}); // The Client
const { MessageEmbed } = require('discord.js'); // Discord Message Embed
const prefix = require('discord-prefix'); // The Prefix Database

client.commands = new Discord.Collection(); // Client Commands
client.events = new Discord.Collection(); // Client Events
client.aliases = new Discord.Collection(); // Client Command Aliases
client.category = new Discord.Collection(); // Client Command Category
client.queue = new Map(); // Music Queue
client.vote = new Map(); // Music Vote
client.prefix = prefix; // Prefix As Global Variable
client.muted = require('./muted.json') // Muted Database

async function run() { // The Start Function

const fs = require("fs");

// Read Events Directory And Execute Events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

// Read Commands Directory
await fs.readdir("./commands/",(err, directories) => {
  console.log(`Loading a total of ${directories.length} categories.`);

// Separate Categories
	directories.forEach(async (dir) => {
		await fs.readdir("./commands/"+dir+"/", (err, commands) => {
      if(err) {
        return console.log(err)
      }
      commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
    let pull = require(`./commands/${dir}/${cmd}`);
    // Set Categories, Aliases And Commands
    client.commands.set(pull.help.name, pull);
    client.category.set(dir, true)
    pull.help.aliases.forEach(alias => {
    client.aliases.set(alias, pull.help.name)
    });
    });
		});
	});
});


// Login Into Client
client.login(process.env.TOKEN)
}

// Run The Start Function
run();
