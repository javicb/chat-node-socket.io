var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado',
    nickname: 'Bot'
}]

// Encargado de recibir las conexiones de los clientes
// y detectar cada vez que alguien se conecte
io.on('connection', function(socket) {
    console.log('IP: ' + socket.handshake.address + ' conectada')

    // Cuando se conecte el cliente le enviamos un mensaje
    socket.emit('messages', messages);

    // Recoger evento add-message y emitirla a todos los clientes conectados
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages)        ;
    });
})

server.listen(8080, function() {
    console.log('Servidor en funcionanmiento en http://localhost:8080');
});

