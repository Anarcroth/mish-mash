const jvfs = require('../jvfs');

let pwd = function(client) {
    if (client.getWd()[0] === '/') {
	return client.getWd().join('/');
    } else {
	return '/' + client.getWd().fullpath.join('/');
    }
};

module.exports = pwd;
