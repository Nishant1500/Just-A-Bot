const fs = require("fs");
const path = require('path')

module.exports.run = async (client, message, args) => {

    // Check perms, self, rank, etc
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have Permission to Manage Roles And Manage messages!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have Permission to unmute!, You Need Manage Messages Permission");
    let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if(toMute.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can not unmute a member that is equal to or higher than yourself!");

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.cache.find(mR => mR.name === "Muted");

    // If the mentioned user or ID does not have the "mutedRole" return a message
    if(!mutedRole || !toMute.roles.cache.has(mutedRole.id)) return message.channel.send("This user is not muted!");

    // Remove the mentioned users role "mutedRole", "muted.json", and notify command sender
    await toMute.roles.remove(mutedRole);
    delete client.muted[toMute.id];

    fs.writeFile(path.join(__dirname, "../../muted.json"), JSON.stringify(client.muted), err => {
        if(err) throw err;
        message.channel.send(`I have unmuted ${toMute.user.tag}!`);
    });
    
}

module.exports.help = {
    name: "unmute",
    description: 'Unmutes A User In The Whole Server',
    aliases: [],
    category: '⚒️ Moderation',
    usage: 'unmute <mention/id>'
}