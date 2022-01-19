exports.setJSON = (json, keys, value) => {
  let current = json;
  for (let key of keys) {
    current[key] ??= {};
    if (key == keys.slice(-1)[0]) current[key] = value; //最後のキーなら代入
    current = current[key];
  }
  return json;
}

exports.getJSON = (json, keys) => {
  let current = json;
  for (let key of keys) {
    current = current?.[key];
  }
  return current;
}