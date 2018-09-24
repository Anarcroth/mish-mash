const jvfs = require('../jvfs');

/*
  Display texts from input.
*/
let echo = function(param) {
    let stringArgs = [];
    let targetFilePath = '';
    // Separate the passed arguments to strings, redirection char, and target file.
    for (var i = 0; i < param.length; i++) {
        if (param[i] === '>' || param[i] === '>>') {
            targetFilePath = param[i + 1];
            break;
        }
        stringArgs.push(param[i]);
    }
    if (param.includes('>') || param.includes('>>')) {
        return 'echo is currently unsupported. Refer to <a href="https://github.com/users/Anarcroth/jayVFS">jayVFS</a> for a full implementation.';
    } else {
        return param.join(' ');
    }
};

module.exports = echo;
