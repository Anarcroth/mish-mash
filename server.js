// TODO add modern import statements
const path = require('path');
const logger = require('morgan');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const parser = require('./src/parser');
const client = require('./src/clients');

let session = require("express-session")({
    secret: "thiswillbeongithub",
    resave: true,
    saveUninitialized: true
});
let sharedsession = require("express-socket.io-session");
app.use(session);
io.use(sharedsession(session, {
    autoSave:true
}));

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'src')));

let users = [];
let userIDs = [];
server.lastUserID = 0;

let cparser = new parser();

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile('./html/index.html');
});

io.on('connection', function(socket) {

    socket.on('disconnect', function() {
	console.log('user disconnected');
    });

    socket.on('termInput', async function(command) {
	socket.handshake.session.command = command;
	socket.handshake.session.save();
	let cli = new client();
	try {
	    console.log('the request client dir is ;' + cli.wd.name);
            let r = await cparser.parse(command, cli);
	    console.log('the post request client dir is ;' + cli.wd.name);
	    io.emit('termInput', r);
	} catch (e) {
	    io.emit('termInput', e);
	}
    });
});

server.listen(3000, function(){
  console.log('listening on 3000');
});


// There are some asynchronous calls that have to be waited,
// thus the need for the async-wait.
app.post('/', async function(request, response) {
    try {
	console.log('the request client dir is ;' + client1.wd.name);
	//TODO in order to hakc the sysetm, what can be done is that at
	// every command tha any client sends, the client WD can be
	// passed to the jvfs internal WD, then a resolution can be made,
	// then an answer can be return, the WD of the client can be updated,
	// which in theory should NOT cause any problems for the jvfs unless
        let r = await cparser.parse(request.body.command, client1);
	console.log('the post request client dir is ;' + client1.wd.name);
        response.send(r);
    } catch(e) {
        response.send(e.message);
    }
});

//io.listen(port);
//app.listen(port);
