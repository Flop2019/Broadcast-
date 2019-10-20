var client = new (require ("discord.js")).Client ();
client.login ("التوكن").then (async token => {
  client.on ('message', async message => {
    var prefix = "#",
    command = message.content.slice (prefix.length).split (" ")[0],
    text = message.content.split (" ").slice (1).join (" ");
    if (!message.content.startsWith (prefix) || !message.guild || message.author.bot || !message.member.hasPermission ("ADMINISTRATOR") || !message.guild.me.hasPermission ("ADMINISTRATOR")) return undefined;
    else if (!text) return message.channel.send ("Example\n" + `> ${prefix}broadcast <message to bc>`)
    else {
      switch (command) {
        case "broadcast":
        var awaited = await message.channel.send ("وش تبي نوع البرودكاست ؟\n 1 - للكل\n2 - للأونلاين بس\n3 - لرول معينة بس");
        message.channel.awaitMessages (m => m.author.id == message.author.id, { max: 1 , time: 15000, errors: ['time']}).then (async collected => {
          var type = collected.first ().content;
          switch (type) {
            case "1":
            await message.guild.fetchMembers ();
            var members = message.guild.members;
            break;
            case "2":
            await message.guild.fetchMembers ();
            var members = message.guild.members.filter (m => m.user.presence.status != "offline");
            break;
            case "3":
            collected.first ().delete ();
            awaited.edit ("ايدي الرتبة او المنشن");
            message.channel.awaitMessages (m => m.author.id == message.author.id, { max: 1 , time: 10000, errors: ['time']}).then (collected => {
              var role = collected.first ().mentions.roles.first () || message.guild.roles.get (collected.first ().content);
              if (!role) return awaited.edit ("i can't find this role");
              else var members = role.members;
              broadcast (message.channel, members, text);
            }).catch (e => {
              awaited.edit ("time gone.");
            });
            break;
            default:
            awaited.edit ("cancel, okay!");
          }
          if (type != "3") {
            broadcast (message.channel, members, text);
          }
          function broadcast (channel, members, text) {
            channel.send ("Done");
            var counter = 0;
            members = members.array ();
            setInterval (() => {
              var member = members[counter];
              if (!member) return undefined;
              else member.send (text).then (okay => {
               
              }).catch (error => {
                return error;
              });
              counter++;
            }, 1500);
          }
        }).catch (err => {
          console.log (err);
          awaited.edit ("Time Out");
        });
        break;
      }
    }
  });
});