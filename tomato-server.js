var express = require('express');
var app = express();
var http = require('http').Server(app);
var vhost = require('vhost');

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

var tomatoHost = createVirtualHost("www.tomato.com", "tomato");

app.use(tomatoHost);

app.get('/remote/someJson', function(request, response) {
    console.log("Received remote json request");
    response.json({foo: 'bar'});
});

http.listen(3001, function() {
    console.log('Listening for requests...');
});

