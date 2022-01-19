module.exports = (name, message) => {
  switch (name) {
    case 'test':
      message.channel.send('ok');
  }
}