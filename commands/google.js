const querystring = require('querystring');

module.exports = function (client, channel, userstate, args) {
    console.log('https://lmgtfy.com/?' + querystring.stringify({ q: args }));
    client.say(channel.replace('#', ''), "Szerencsére, már minden vadász kapott meghívót a Google-re, vedd át Te is. yeaSwag https://lmgtfy.com/?" + querystring.stringify({ q: args })).then(function(data) {
        //
    }).catch(function(err) {
        //
    });
}