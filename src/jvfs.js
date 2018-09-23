const fs = require("fs");
const path = require("path");

let jayVFS = {
    prompt: "",
    promptColor: "",
    bgColor: "",
    termBgColor: "",
    termlWidth: "",
    termHeight: "",
    outputColor: "",
    outputBoldColor: "",
    dirs: [],
    files: [],

    init() {
        let configFile = fs.readFile('../.conf', 'utf8', function(err, contents) {
            console.log(contents);
        });
    },

    openFile() {

    },

    closeFile() {

    },

    getDir() {

    },

    cd() {

    },

    ls() {

    },
};
