const fs = require('fs')
module.exports = (client) => {
    console.log(`${client.user.tag} is online!`);
    const status = ["Commands", `In ${client.guilds.cache.size} Servers`, "Commands", `With ${client.users.cache.size} Members : D`]

    setInterval(() => {
        const index = Math.floor(Math.random() * (status.length - 1) + 1);
        client.user.setActivity(status[index]);
    }, 10000);
  const webPortal = require("../server.js");
    webPortal.load(client);

setInterval(() => {
        for(let i in client.muted) {
            let time = client.muted[i].time;
            let guildId = client.muted[i].guild;
            let guild = client.guilds.cache.get(guildId);
            let member = guild.members.cache.get(i);
            let mutedRole = guild.roles.cache.find(mR => mR.name === "Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                member.roles.remove(mutedRole);
                delete client.muted[i];

                fs.writeFile("./muted.json", JSON.stringify(client.muted), err => {
                    if(err) throw err;
                });
            }
        }
    }, 5000);
    
};
