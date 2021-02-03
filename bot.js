// DECLERATIONS ============================================================================================================================

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require('./config.json');
const { prefix, token, bot_info } = require('./config.json');
const ytdl = require('ytdl-core');


// COMMANDHANDLER SETUP ============================================================================================================================


client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

});


// STARTUP BOT ============================================================================================================================

client.once('ready', () => {
    console.log(bot_info.name);
    console.log(bot_info.version);

    client.user.setActivity('Mrugank can\'t change this', { type: 'LISTENING' });
// 3!help for commands
});

client.login(token);

// Commands

client.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let command = messageArray[0];
  let args = messageArray.slice(1);

     message.guild.me.setNickname('3am');

    if (command === `${prefix}ping`) {
      message.channel.send('pong');
    }

    // List of help commands

    if (command === `${prefix}help`) {
      message.channel.send('Bot still in development. Please try again later!');
    }

    if (command === `${prefix}happybday`) {

      let tagged = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

      if (!tagged) return message.channel.send('Could not find user.');

      message.channel.send(`Happy Birthday ${tagged}`);
    }

});


// JOIN MESSAGE + UNVERIFIED ROLE ============================================================================================================================



client.on('guildMemberAdd', member => {

 const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome'); // finds welcome channel

 welcomeChannel.send(`${member} has joined the ${member.guild.name} server!`);

 const errorChannel = member.guild.channels.cache.find(channel => channel.name === 'errors');  // finds errors channel

 member.roles.set(['803717036902449193'])
   .catch(error => {
         errorChannel.send(`An error has occurred while assigning a role for a new member with user ID: ${member.id}.`);
   });

     const AddEmbed = new Discord.MessageEmbed()
       .setColor('#2DFF0C')
       .setTitle(`_**${member.user.tag}**_ has arrived!`)
       .setImage(member.user.avatarURL({ dynamic: true }))
       .setTimestamp()
       .setFooter(member.id);

   welcomeChannel.send(AddEmbed);

});


 // LEAVE MESSAGE ============================================================================================================================

 client.on('guildMemberRemove', member => {

 const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome'); // finds welcome channel

   welcomeChannel.send(`${member} has left the ${member.guild.name} server! Farewell!`);

     const RemoveEmbed = new Discord.MessageEmbed()
       .setColor('#EF1313')
       .setTitle(`_**${member.user.tag}**_ has left!`)
       .setImage(member.user.avatarURL({ dynamic: true }))
       .setTimestamp()
       .setFooter(member.id);

   welcomeChannel.send(RemoveEmbed);

  });


// MUSIC BOT BEGINS

/*

  client.on('message', async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
      execute(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
      return;
    } /*else if (!message.content.startsWith(`${prefix}play || ${prefix}skip || ${prefix}stop`)) {
      message.channel.send('Please enter a valid command.');
    }

})

const queue = new Map();

async function execute(message, serverQueue) {

  const args = message.content.split(' ');

  const voiceChannel = message.member.voice.channel;
  if(!voiceChannel) return message.channel.send('Join a voice channel to play music!');

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permission.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send('Please provide me with the permission to join and speak in the voice channel!');

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url,};

}
*/
