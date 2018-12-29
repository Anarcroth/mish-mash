const util = require('util');
const path = require('path');
const express = require('express');
const logger = require('morgan');

const parser = require('./src/parser');

const port = process.env.PORT || 3000;

let cparser = new parser();

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile('./html/index.html');
});

// There are some asynchronous calls that have to be waited,
// thus the need for the async-wait.
app.post('/', async function(request, response) {
    try {
        let r = await cparser.parse(request.body.command);
        response.send(r);
    } catch(e) {
        response.send(e.message);
    }
});

app.listen(port);

console.log('Listening on port ' + port);
