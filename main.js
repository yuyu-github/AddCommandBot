const { Client, Intents } = require('discord.js');
const botToken = process.env.BotToken;
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ]
});

const runCommand = require('./run_command')
const autoReply = require('./auto_reply');
const autoRoles = require('./auto_roles');

client.on('ready', () => {
  console.log('Ready');
})

client.on('messageCreate', message => {
  if (!message.author.bot) {
    autoReply(message);

    if (message.content.startsWith('!'))
      runCommand(message.content.match(/^!([^ \n]*)/)[1],
        message.content.match(/^![^ \n]* ?\n?(.*)$/s)[1], message, client);
  }
})

client.on('guildMemberAdd', member => {
  autoRoles(member);
})

client.login(botToken);