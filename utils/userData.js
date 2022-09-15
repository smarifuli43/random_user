const fs = require('fs');
const path = require('path')


const basedir = path.join(__dirname, '../db')

module.exports.getUserData = () => {


  const data = fs.readFileSync(`${basedir}/users.json`);
  return JSON.parse(data);
}

module.exports.saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(`${basedir}/users.json`, stringifyData);
}