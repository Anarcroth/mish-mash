let terminalInputHeight = 0;
let container = document.getElementById("terminal-window");

let commands = ["ls", "cat", "cd"];
const dirContents = ["home", "root", "projects"];

function parseCommand(command) {
    let output = document.createElement("p");

    switch (command) {
    case commands[0]:
        output.innerHTML = dirContents;
        container.appendChild(output);
        break;
    case commands[1]:
        output.innerHTML = "No file to cat";
        container.appendChild(output);
        break;
    case commands[2]:
        output.innerHTML = "No dir to cd in yet";
        container.appendChild(output);
        break;
    default:
        output.innerHTML = command + " was not recognize. Err 1";
        container.appendChild(output);
        break;
    }

    addInput();
}

function clearCli() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    terminalInputHeight = 0;
}

function addInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.id = "termInput" + terminalInputHeight;
    input.name = "termInput" + terminalInputHeight;
    container.appendChild(input);
    input.focus();

    terminalInputHeight += 1;

    input.addEventListener("keydown", function inputEnter(event) {
        if (event.key === "Enter") {
            parseCommand(input.value);
            input.removeEventListener("keydown", inputEnter);
        }
    });

    return input;
}

addInput();
