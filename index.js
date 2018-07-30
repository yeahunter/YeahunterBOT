var tmi = require("tmi.js");
var config = require("./config");


var options = {
    options: {
        debug: false
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: config.botname,
        password: config.password
    },
    channels: config.channels
};

var client = new tmi.client(options);

client.connect();

client.on("message", function (channel, userstate, message, self) {
    // Sajat magam uzeneteit ignoralom
    if (self) return;

    switch(userstate["message-type"]) {
        case "action":
            if(userstate.mod) return;

            // Timeout mindenkire, aki szinessel irkal
            client.timeout(channel.replace('#', ''), userstate.username, 2, "Nem szabad színessel írkálni!").catch((err) => {
                console.log('ERR: ' + err);
            }); 
            break;
        case "chat":
            break;
        case "whisper":
            break;
        default:
            console.log('Baj van!');
            break;
    }
});