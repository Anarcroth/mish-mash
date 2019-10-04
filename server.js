// TODO add modern import statements
const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const parser = require('./src/parser');
const client = require('./src/clients');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'src')));

let users = {};
let cparser = new parser();

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile('./html/index.html');
});

io.on('connection', function(socket) {

    console.log('user connected');
    handleUser(socket.id);

    socket.on('disconnect', function() {
	handleDisconnect(socket);
    });

    socket.on('termInput', function(command) {
	handleTermInput(socket, command);
    });
});

function handleUser(socketid) {
    if (socketid in users == false) {
	users[socketid] = new client();
    }
}

function handleDisconnect(socket) {
    console.log('user disconnected');
    delete users[socket.id];
}

async function handleTermInput(socket, command) {
    try {
        let r = await cparser.parse(command, users[socket.id]);
	socket.emit('termInput', r);
    } catch (e) {
	socket.emit('termInput', e);
    }
}

server.listen(3000, function() {
    console.log('listening on 3000');
});
