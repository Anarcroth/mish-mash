const https = require('https');

const user = require('../user');

let whoami = async function() {

    return user.getTableInfo();
};

module.exports = whoami;
