var google = require("./commands/google");

module.exports = function (client, channel, userstate, message) {
    var messageArray = message.split(' ');
    var command = messageArray[0].substr(1);
    var args = message.substr(command.length + 1 + 1);
    var arg = messageArray.slice(1, messageArray.length);

    switch(command) {
        case "teszt":
            console.log('TIBOR: ' + command);
            break;
        case "google":
            google(client, channel, userstate, args);
            break;

        // default:
        //     if(userstate.mod) return;

        //     client.timeout(channel.replace('#', ''), userstate.username, 2, "Nincs ilyen parancs: \"" + command + "\" !" ).catch((err) => {
        //         console.log('ERR: ' + err);
        //     });
        //     break;
    }
}