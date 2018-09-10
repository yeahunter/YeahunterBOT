var Viewer = require("./viewer.js");
var tmi = require("tmi.js");
var config = require("./config");
var commands = require("./commands");


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
var viewers = {};

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
            // Figyeljuk a parancsokat
            if(message[0] == "!") {
                commands(client, channel, userstate, message);
            }
            break;
        case "whisper":
            break;
        default:
            console.log('Baj van!');
            break;
    }
});

function getViewerList() {
    client.api({
        url: "https://tmi.twitch.tv/group/user/" + config.channels[0].replace('#', '') + "/chatters",
    }, function(err, res, body) {
        var currentViewers = [];
        if(body.hasOwnProperty('chatters')) {
            // Osszefuzzuk a moderatorokat, a globalmodokat, es a tobbieket egy tombbe
            currentViewers = Array.prototype.concat.apply([], Object.values(body.chatters));

            // A tarolt nezok kozul, kitoroljuk azokat, akik a lekerdezett nezok kozott mar nincsenek ott
            Object.keys(viewers).map(function(viewersKey, index) {
                if(!currentViewers.includes(viewersKey)) {
                    delete viewers[viewersKey];
                }
            });
            
            currentViewers.forEach(currentViewer => {
                // Feltoljuk a nezok "listajat" uj nezokkel
                if (!viewers.hasOwnProperty(currentViewer)) {
                    viewers[currentViewer] = new Viewer(currentViewer);
                } else {
                    viewers[currentViewer].check();
                }
            });
        } else {
            console.log('Baj van!')
        }
    });
}

var timer = setInterval(getViewerList, 60000);
getViewerList();