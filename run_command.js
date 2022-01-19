const fs = require('fs');

const { setJSON } = require('./control_json');

module.exports = (name, args, message) => {
  switch (name) {
    case 'anonymous':
    case 'anon': {
      message.delete()
      message.channel.send('匿名メッセージが送信されました:\n' + args.replace(/^/mg, '> '));
    }
    case 'autoreply':
    case 'autorep': {
      let argList = args.split(' ');
      switch (argList[0]) {
        case 'user': {
          let id = argList[1].match(/^<@!(.+)>$/)?.[1];
          if (id != null) {
            let data = JSON.parse(fs.existsSync(`data/${message.guild.id}.json`) ?
              fs.readFileSync(`data/${message.guild.id}.json`) : '{}');
            data = setJSON(data, ['autoReply', 'user', id], {
              type: argList[2],
              content: argList.slice(3).join(' '),
            });
            fs.writeFileSync(`data/${message.guild.id}.json`, JSON.stringify(data));
          }
        }
      }
    }
  }
}