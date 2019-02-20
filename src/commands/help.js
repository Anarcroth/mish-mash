/*
  Display possible commands to user.
*/
let help = function(param) {
    switch (param) {
    case 'ls':
        return '<b>ls</b> [FILE]<br>List information about the FILEs (the current directory by default).<br>';
    case 'rm':
        return '<b>rm</b> [FILE]<br>Removes specified file. By default, it does not remove directories.<br>';
    case 'cp':
        return '<br><b>Not yet implemented</b>';
    case 'cd':
        return '<b>cd</b> [DIRECTORY]<br>Change the working directory of the current shell execution environment.';
    case 'mv':
        return '<br><b>Not yet implemented</b>';
    case 'pwd':
        return '<b>pwd</b><br>Print the name of current working directory';
    case 'cat':
        return '<b>cat</b> [FILE]<br>Concatenate FILE(s) to standard output.';
    case 'date':
        return '<b>date</b><br>Display the current time.';
    case 'echo':
        return '<b>echo</b> [STRING]<br>Display a line of text.';
    case 'help':
        return '<b>help</b> [COMMAND]<br>Print the help of a command.';
    case 'mkdir':
        return '<b>mkdir</b> [DIRECTORY]<br>Create the DIRECTORY, if it does not already exist.';
    case 'rmdir':
        return '<b>rmdir</b> [DIRECTORY]<br>Remove the DIRECTORY, if it is empty.';
    case 'touch':
        return '<b>touch</b> [FILE]<br>A  FILE  argument  that  does not exist is created empty.';
    case 'clear':
        return '<b>clear</b><br>Clear the terminal screen.';
    case 'whoami':
        return '<b>whoami</b><br>Print effective user and the associated data';
    default:
        return 'These are the commands that are available<br>'+
            '<pre>ls     cd      pwd\n' +
                 'cat    date    echo\n' +
                 'mkdir  rmdir   touch\n' +
                 'clear  whoami  help</pre>';
    }
};

module.exports = help;
