const jvfs = require('../jvfs');

let cat = function(tarNode, client) {
    if (!tarNode) {
	return 'cat: missing file operand';
    }
    try {
	jvfs.setWd(client.getWd());
	let file = jvfs.getFile(tarNode);
	return file.contents;
    } catch (e) {
	return 'cat: \'' + tarNode + '\': ' + e.message;
    }
};

module.exports = cat;
