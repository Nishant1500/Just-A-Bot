const fs = require("fs");
const path = require('path')

module.exports.run = async (client, message, args) => {

    // Check perms, self, rank, etc
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have Permission to Manage Roles And Manage messages!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have Permission to mute!, You Need Manage Messages Permission");
    let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if(toMute.id === message.author.id) return message.channel.send("You can not mute yourself!");
    if(toMute.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can not mute a member that is equal to or higher than yourself!");

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.cache.find(mR => mR.name === "Muted");


    // If the mentioned user does not have the muted role execute the following
    if(!mutedRole) {
        try {
            // Create a role called "Muted"
            mutedRole = await message.guild.roles.create({data: {       name: "Muted",
                color: "#DC143C",
                permissions: []
            }});

            // Prevent the user from sending messages or reacting to messages
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.overwritePermissions([{
                  id: mutedRole.id,
                    deny: ["SEND_MESSAGES","ADD_REACTIONS"]
                }])
            });

        } catch(e) {
            // If err print
            console.log(e.stack);
        }
    }

    // If the mentioned user already has the "mutedRole" then that can not be muted again
    if(toMute.roles.cache.has(mutedRole.id)) return message.channel.send("This user is already muted!");

    // TODO: Check they they have entered a valid number or even entered one

let mutedTime = args[1];
if(args[1]) {
  if(message.content.includes(`${parseInt(args[1])}d`) || message.content.includes(`${parseInt(args[1])}days`) || message.content.includes(`${parseInt(args[1])}day`)) mutedTime = Date.now() + parseInt(args[1]) * 86400000

  if(message.content.includes(`${parseInt(args[1])}h`) || message.content.includes(`${parseInt(args[1])}hours`) || message.content.includes(`${parseInt(args[1])}hour`)) mutedTime = Date.now() + parseInt(args[1]) * 3600000

  if(message.content.includes(`${parseInt(args[1])}m`) || message.content.includes(`${parseInt(args[1])}min`) ||
  message.content.includes(`${parseInt(args[1])}mins`) ||
  message.content.includes(`${parseInt(args[1])}minutes`) ||
  message.content.includes(`${parseInt(args[1])}minute`)) mutedTime = Date.now() + parseInt(args[1]) * 60000

  if(message.content.includes(`${parseInt(args[1])}s`) || message.content.includes(`${parseInt(args[1])}sec`) || message.content.includes(`${parseInt(args[1])}secs`) ||message.content.includes(`${parseInt(args[1])}seconds`) || message.content.includes(`${parseInt(args[1])}second`)) mutedTime = Date.now() + parseInt(args[1]) * 1000

  var s = mutedTime;

  if(args[2]) {
    if(message.content.includes(`${parseInt(args[2])}h`) || message.content.includes(`${parseInt(args[2])}hours`) || message.content.includes(`${parseInt(args[2])}hour`)) mutedTime = s + parseInt(args[1]) * 3600000

  if(message.content.includes(`${parseInt(args[2])}m`) || message.content.includes(`${parseInt(args[2])}min`) ||
  message.content.includes(`${parseInt(args[2])}mins`) ||
  message.content.includes(`${parseInt(args[2])}minutes`) ||
  message.content.includes(`${parseInt(args[2])}minute`)) mutedTime = s + parseInt(args[1]) * 60000

  if(message.content.includes(`${parseInt(args[2])}s`) || message.content.includes(`${parseInt(args[2])}sec`) || message.content.includes(`${parseInt(args[2])}secs`) ||message.content.includes(`${parseInt(args[2])}seconds`) || message.content.includes(`${parseInt(args[2])}second`)) mutedTime = s + parseInt(args[1]) * 1000
  
  var t = mutedTime;
  if(args[3]) {

  if(message.content.includes(`${parseInt(args[3])}m`) || message.content.includes(`${parseInt(args[3])}min`) ||
  message.content.includes(`${parseInt(args[3])}mins`) ||
  message.content.includes(`${parseInt(args[3])}minutes`) ||
  message.content.includes(`${parseInt(args[3])}minute`)) mutedTime = t + parseInt(args[1]) * 60000

  if(message.content.includes(`${parseInt(args[3])}s`) || message.content.includes(`${parseInt(args[3])}sec`) || message.content.includes(`${parseInt(args[3])}secs`) ||message.content.includes(`${parseInt(args[3])}seconds`) || message.content.includes(`${parseInt(args[3])}second`)) mutedTime = t + parseInt(args[1]) * 1000

var x = mutedTime
  if(args[4]) {
    if(message.content.includes(`${parseInt(args[4])}s`) || message.content.includes(`${parseInt(args[4])}sec`) || message.content.includes(`${parseInt(args[4])}secs`) ||message.content.includes(`${parseInt(args[4])}seconds`) || message.content.includes(`${parseInt(args[4])}second`)) mutedTime = x + parseInt(args[1]) * 1000
  }
  }
  }
}
    // Check current time and add muted time to it, then convert to seconds from milliseconds
    client.muted[toMute.id] = {
        guild: message.guild.id,
        time: mutedTime
    }

    // Add the mentioned user to the "mutedRole" and notify command sender
    await toMute.roles.add(mutedRole);
    

    fs.writeFile(path.join(__dirname, "../../muted.json"), JSON.stringify(client.muted, null, 4), err => {
        if(err) throw err;
        message.channel.send(`I have muted ${toMute.user.tag} !`)
    });

}

module.exports.help = {
    name: "mute",
    description: 'Mutes A User For A Duration/Permanently In The Whole Server',
    aliases: [],
    category: '⚒️ Moderation',
    usage: 'mute <mention/id> (duration)'
}