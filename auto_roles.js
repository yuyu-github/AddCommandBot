const fs = require('fs');

const { getJSON } = require('./control_json')

module.exports = member => {
  let data = JSON.parse(fs.existsSync(`data/${member.guild.id}.json`) ?
    fs.readFileSync(`data/${member.guild.id}.json`) : '{}');
  data = getJSON(data, ['autoRoles']);
  if (data != null) {
    member.roles.add(data);
  }
}