const jvfs = require('../jvfs');

/*
  Returns empty string if command executes.
  Throws missing directory exception.
*/
let cd = function(paramDir, client) {
    // Since there is no $HOME directory, an empty parameter goes to root as well
    if (!paramDir) {
        paramDir = '/';
    }
    try {
	jvfs.setWd(client.getWd());
	jvfs.moveWdTo(paramDir);
	client.setWd(jvfs.getWd());
        return '';
    } catch (e) {
        return 'cd: no such file or directory: ' + paramDir;
    }
};

module.exports = cd;
