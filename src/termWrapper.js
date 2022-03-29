let commHistory = [];
let commHistoryIndex = -1;

let lastResponse = {};
let terminalInputHeight = 0;
let cli = document.getElementById('cli');

let socket = io.connect();

// Forces the console inputs to be at max height and not overlap with the contacts div
cli.style.cssText = 'display: block; max-height: 700px; overflow: hidden;';

function addOutput(message) {
    let output = document.createElement('p');
    output.innerHTML = message;
    cli.appendChild(output);
    addInput();
}

function termInputListener() {
    socket.on('termInput', addOutput);
}

function addInput() {
    let input = makeNewInput();
    input.addEventListener('keydown', function inputEnter(event) {
        if (event.key === 'Enter') {
	    handleUserInput(input);
	    input.readOnly = true;
	    input.removeEventListener('keydown', inputEnter);
        } else if (event.key === 'ArrowUp') {
	    goBackInCommandHistory(input);
        } else if (event.key === 'ArrowDown') {
	    goForwardInCommandHistory(input);
        }
    });
}

function handleUserInput(input) {
    commHistory.push(input.value);
    commHistoryIndex += 1;
    handleValidCommand(input);
}

function handleValidCommand(input) {
    if (input.value === 'clear') {
        window.location.reload();
    } else if (input.value === 'cv') {
	openCV();
    } else if (input.value === 'exit') {
	// redirect to the one true duck
	window.location = "https://www.duckduckgo.com";
    } else {
	// this will connect to the server and the response will be
	// handled by the 'termInputListener'
	socket.emit('termInput', input.value);
    }
}

function openCV() {
    window.open('../contents/cv.pdf');
    addOutput(""); // makes sure to get next output
}

function goForwardInCommandHistory(input) {
    input.value = parseCommandHistory();
    if (commHistoryIndex > 0) {
        commHistoryIndex -= 1;
    }
}

function goBackInCommandHistory(input) {
    input.value = parseCommandHistory();
    if (commHistoryIndex < commHistory.length) {
        commHistoryIndex += 1;
    }
}

function makeNewInput() {
    createPrompt();
    let input = createInputElement();
    terminalInputHeight += 1;
    return input;
}

function createInputElement() {
    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'termInput' + terminalInputHeight;
    input.name = 'termInput' + terminalInputHeight;
    cli.appendChild(input);
    input.focus();

    return input;
}

function createPrompt() {
    let prompt = document.createElement('label');
    prompt.innerHTML = '~ <i class="fas fa-dollar-sign"></i> ';
    cli.appendChild(prompt);
}

function parseCommandHistory() {
    if (commHistory[commHistoryIndex] === undefined) {
        return '';
    } else {
        return commHistory[commHistoryIndex];
    }
}

// create an initial input
addInput();

// create one listener for server responses
termInputListener();
