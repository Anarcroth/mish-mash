let commHistory = [];
let commHistoryIndex = -1;

let lastResponse = {};
let terminalInputHeight = 0;
let cli = document.getElementById('cli');

// Forces the console inputs to be at max height and not overlap with the contacts div
cli.style.cssText = 'display: block; max-height: 700px; overflow: hidden;';

function isCommandValid(command) {
    // This matches any non-word character
    let invalidCommandString = new RegExp('^[^A-Za-z_]');
    if (invalidCommandString.test(command)) {
        return false;
    }
    return true;
}

function addOutput(message) {
    let output = document.createElement('p');
    output.innerHTML = message;
    cli.appendChild(output);
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

            input.readOnly = true;
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
    addPrompt();
    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'termInput' + terminalInputHeight;
    input.name = 'termInput' + terminalInputHeight;
    cli.appendChild(input);
    input.focus();

    terminalInputHeight += 1;

    return input;
}

function addPrompt() {
    let prompt = document.createElement('label');
    prompt.innerHTML = '~ <i class="fas fa-dollar-sign"></i> ';
    cli.appendChild(prompt);
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
