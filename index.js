var tmi = require("tmi.js");
var config = require("./config");


var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: config.username,
        password: config.password
    },
    channels: config.channels
};

var client = new tmi.client(options);

client.connect();