const fs = require('fs');

const { setJSON, removeJSON } = require('./control_json');

module.exports = (name, args, message, client) => {
  switch (name) {
    case 'anonymous':
    case 'anon': {
      message.delete()
      message.channel.send('匿名メッセージが送信されました:\n' + args.replace(/^/mg, '> '));
    }
    break;
    case 'autoreply':
    case 'autorep': {
      let argList = args.split(' ');
      switch (argList[0]) {
        case 'add': {
          switch (argList[1]) {
            case 'user': {
              let id = argList[2].match(/^<@!(.+)>$/)?.[1];
              if (id != null) {
                let data = JSON.parse(fs.existsSync(`data/${message.guild.id}.json`) ?
                  fs.readFileSync(`data/${message.guild.id}.json`) : '{}');
                data = setJSON(data, ['autoReply', 'user', id], {
                  type: argList[3],
                  content: argList.slice(4)?.join(' ') ?? '',
                });
                fs.writeFileSync(`data/${message.guild.id}.json`, JSON.stringify(data));
                message.guild.members.fetch(id).then(result => {
                  console.log(result);
                  message.channel.send(`${result.user.username}が発言したとき自動でリプライするよう設定されました`)});
              }
            }
            break;
          }
        }
        break;
        case 'remove': {
          switch (argList[1]) {
            case 'user': {
              let id = argList[2].match(/^<@!(.+)>$/)?.[1];
              if (id != null) {
                let data = JSON.parse(fs.existsSync(`data/${message.guild.id}.json`) ?
                  fs.readFileSync(`data/${message.guild.id}.json`) : '{}');
                data = removeJSON(data, ['autoReply', 'user', id]);
                fs.writeFileSync(`data/${message.guild.id}.json`, JSON.stringify(data));
                message.guild.members.fetch(id).then(result =>
                  message.channel.send(`${result.user.username}が発言したとき自動でリプライしなくなりました`));
              }
            }
            break;
          }
        }
      }
    }
    break;
    case 'autoroles':
    case 'autorole': (async () => {
      let data = JSON.parse(fs.existsSync(`data/${message.guild.id}.json`) ?
        fs.readFileSync(`data/${message.guild.id}.json`) : '{}');
      if (args != 'none') {
        const role = (await message.guild.roles.fetch()).find(role => role.name == args);
        if (role == null) return;
        data = setJSON(data, ['autoRoles'], role.id);
      } else {
        data = removeJSON(data, ['autoRoles']);
      }
      fs.writeFileSync(`data/${message.guild.id}.json`, JSON.stringify(data));
      if (args != 'none') message.channel.send(`サーバーに入ったとき自動で${args}ロールがつくようになりました`);
      else message.channel.send(`サーバーに入ったとき自動でロールがつかなくなりました`)
    })()
    break;
  }
}