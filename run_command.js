module.exports = (name, args, message) => {
  switch (name) {
    case 'anonymous':
    case 'anon': {
      message.delete()
      message.channel.send('匿名メッセージが送信されました:\n' + args.replace(/^/mg, '> '));
    }
  }
}