var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');
var keys = rootPath + '/keys.txt';


module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
<<<<<<< HEAD
    db: process.env.MONGOHQ_URL || 'localhost:'
=======
	db: process.env.MONGOHQ_URL 
>>>>>>> 568d85fd43c261ddde1de7048b70666d9ef47b6b
};
