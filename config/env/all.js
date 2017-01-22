const path = require('path');
const rootPath = path.normalize(__dirname + '/../..');
//const keys = rootPath + '/keys.txt';

module.exports = {
  root: rootPath,
  port: process.env.PORT || 5000,
  db: process.env.MONGOHQ_URL || 'mongodb://localhost:27017/cfh',
  app: { name: 'Cards for Humanity' }
};
