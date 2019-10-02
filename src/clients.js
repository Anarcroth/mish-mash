const jvfs = require('./jvfs');

let clients = function() {

    this.wd = jvfs.getRoot();
};

clients.prototype.getWd = function () {
    return this.wd;
};

clients.prototype.setWd = function (thatWd) {
    this.wd = thatWd;
};

module.exports = clients;
