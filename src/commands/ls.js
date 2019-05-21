const jvfs = require('../jvfs');

/*
  Returns a list of strings, representing all of the sub-directories and files on the current directory.
*/
let ls = function(paramDir, client) {
    if (!paramDir) {
	paramDir = client.getWd();
    }
    try {
	jvfs.setWd(client.getWd());
	let dc = jvfs.getDirContents(paramDir);
	client.setWd(jvfs.getWd());
	return dc.join('<br>');
    } catch (e) {
	return 'ls: cannot access \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = ls;
