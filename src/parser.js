const fs = require('fs');

const ls = require('./commands/ls');
const cd = require('./commands/cd');
const cat = require('./commands/cat');
const pwd = require('./commands/pwd');
const date = require('./commands/date');
const echo = require('./commands/echo');
const help = require('./commands/help');
const whoami = require('./commands/whoami');

let parser = function() {
    this.commandsDir = './src/commands/';
};

parser.prototype.parse = function(command) {
    let commandAndParams = command.split(' ');
    let c = commandAndParams[0];
    let params = commandAndParams[1];
    switch (c) {
    case 'ls':
        return ls(params);
    case 'rm':
        return c + ' is currently unsupported. Refer to <a href="https://github.com/Anarcroth/jayVFS">jayVFS</a> for a full implementation.';
    case 'cd':
        return cd(params);
    case 'pwd':
        return pwd();
    case 'cat':
        return cat(params);
    case 'date':
        return date();
    case 'echo':
        // This takes in the whole line after the 'echo' command
        return echo(commandAndParams.slice(1));
    case 'help':
        return help(params);
    case 'mkdir':
        return c + ' is currently unsupported. Refer to <a href="https://github.com/Anarcroth/jayVFS">jayVFS</a> for a full implementation.';
    case 'rmdir':
        return c + ' is currently unsupported. Refer to <a href="https://github.com/Anarcroth/jayVFS">jayVFS</a> for a full implementation.';
    case 'touch':
        return c + ' is currently unsupported. Refer to <a href="https://github.com/Anarcroth/jayVFS">jayVFS</a> for a full implementation.';
    case 'whoami':
        return whoami();
    case '':
        return '';
    default:
        throw Error('mishmash: command not found: ' + c);
    }
};

module.exports = parser;
