socket = require('socket.io-client')(process.env.socket_server);
socket.on('connect',()=> console.log("Socket connected "+process.env.socket_server))

module.exports = {
    socket: socket
};