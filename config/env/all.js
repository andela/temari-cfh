const path = require('path');

const rootPath = path.normalize(`${__dirname}/../..`);
// const keys = rootPath + '/keys.txt';

module.exports = {
  root: rootPath,
  port: process.env.PORT || 2002,
  db: process.env.MONGOHQ_URL,
  app: { name: 'Cards for Humanity' }
};
