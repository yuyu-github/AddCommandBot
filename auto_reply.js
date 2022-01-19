const fs = require('fs');

const { getJSON } = require('./control_json')

module.exports = message => {
  let data = JSON.parse(fs.existsSync(`data/${message.guild.id}.json`) ?
    fs.readFileSync(`data/${message.guild.id}.json`) : '{}');
  data = getJSON(data, ['autoReply', 'user', message.author.id]);
  if (data != null) {
    switch (data.type) {
      case 'text': {
        message.channel.send(data.content);
      }
    }
  }
}