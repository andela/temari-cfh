const path = require('path');
const rootPath = path.normalize(__dirname + '/../..');
//const keys = rootPath + '/keys.txt';

module.exports = {
<<<<<<< HEAD
	root: rootPath,
	port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL
=======
  root: rootPath,
  port: process.env.PORT || 3000,
  db: process.env.MONGOHQ_URL,
  app: { name: 'Cards for Humanity' }
>>>>>>> develop
};
