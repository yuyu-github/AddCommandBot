const { Client, Intents } = require('discord.js');
const botToken = process.env.BotToken;
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});

const runCommand = require('./run_command')

client.on('ready', () => {
  console.log('Ready');
})

client.on('messageCreate', message => {
  if (!message.author.bot && message.content.startsWith('!'))
    runCommand(message.content.match(/^!([^ \n]*)/)[1],
      message.content.match(/^![^ \n]* ?\n?(.*)$/s)[1], message);
})

client.login(botToken);