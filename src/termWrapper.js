let commHistory = [];
let commHistoryIndex = -1;

let lastResponse = {};
let terminalInputHeight = 0;
let container = document.getElementById('terminal-window');

function isCommandValid(command) {
    // This matches any non-word character
    let invalidCommandString = new RegExp('^[^A-Za-z_]');
    if (invalidCommandString.test(command)) {
        return false;
    } else {
        return true;
    }
}

function addOutput(message) {
    let output = document.createElement('p');
    output.innerHTML = message;
    container.appendChild(output);

    addInput();
}

function addInput() {
    let input = makeNewInput();
    input.addEventListener('keydown', function inputEnter(event) {
        if (event.key === 'Enter') {
            commHistory.push(input.value);
            commHistoryIndex += 1;
            if (isCommandValid(input.value)) {
                if (input.value === 'clear') {
                    window.location.reload();
                } else {
                    lastResponse = Promise.all([getPostResponse(input.value)]);
                    lastResponse.then(addOutput);
                }
            } else {
                addOutput('mishmash: command not recognized: ' + input.value);
            }
            input.removeEventListener('keydown', inputEnter);
        } else if (event.key === 'ArrowUp') { // goes forward in the list towards the first element
            input.value = parseCommandHistory();
            if (commHistoryIndex > 0) {
                commHistoryIndex -= 1;
            }
        } else if (event.key === 'ArrowDown') { // goes back in the list towards the last element
            input.value = parseCommandHistory();
            if (commHistoryIndex < commHistory.length) {
                commHistoryIndex += 1;
            }
        }
    });
}

function makeNewInput() {
    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'termInput' + terminalInputHeight;
    input.name = 'termInput' + terminalInputHeight;
    container.appendChild(input);
    input.focus();

    terminalInputHeight += 1;

    return input;
}

// TODO don't use a global to grab the last response
function getPostResponse(inputVal) {
    var params = { command: inputVal };
    return fetch('/', {
        method : 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-Type": 'application/json',
        }
    }).then(
        response => response.text()
    );
}

function parseCommandHistory() {
    if (commHistory[commHistoryIndex] === undefined) {
        return '';
    } else {
        return commHistory[commHistoryIndex];
    }
}

addInput();
