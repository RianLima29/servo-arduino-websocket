"use strict";
exports.__esModule = true;
var readFileSync = require("fs").readFileSync;
var createServer = require("https").createServer;
var brightness = require('brightness');
var dotenv_1 = require("dotenv");
var socket_io_1 = require("socket.io");
var dot = (0, dotenv_1.config)({ path: __dirname + "../.env" });
var httpServer = createServer({
    key: readFileSync('../crt/certificado.key'),
    cert: readFileSync("../crt/certificado.cert")
});
var io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
io.on("connection", function (socket) {
    console.log('conexão');
    socket.on('data', function (args) {
    });
});
httpServer.listen(process.env.PORT, function () {
    console.log('Servidor aberto');
});
