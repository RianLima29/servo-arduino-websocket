"use strict";
exports.__esModule = true;
var readFileSync = require("fs").readFileSync;
var createServer = require("https").createServer;
var brightness = require('brightness');
var socket_io_1 = require("socket.io");
var httpServer = createServer({
    key: readFileSync('../crt/certificado.key'),
    cert: readFileSync("../crt/certificado.cert")
});
var io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
io.on("connection", function (socket) {
    console.log('conexão');
    socket.on('data', function (args) {
        console.log(args);
        brightness.set(Math.abs(args.ZRotation / 360));
        console.log('val' + Math.abs(args.ZRotation));
    });
});
httpServer.listen(3000, function () {
    console.log('Servidor aberto');
});
