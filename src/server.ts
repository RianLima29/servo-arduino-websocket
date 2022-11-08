const { readFileSync } = require("fs");
const { createServer } = require("https");
const brightness = require('brightness');
const path = require('path')
import * as dotenv from "dotenv";
import {Server} from 'socket.io'

dotenv.config({ path: path.join(__dirname, '../.env')});

const httpServer = createServer({
  key: readFileSync('../crt/certificado.key'),
  cert: readFileSync("../crt/certificado.cert"),
  origin: "*"
});

const io = new Server(httpServer, {cors: {origin: '*'}});

io.on("connection", (socket) => {
    console.log('conexão')
    socket.on('data', (args : {XRotation: number, YRotation: number, ZRotation: number}) => {
    })
  });

httpServer.listen(process.env.PORT, ()=>{
  console.log('Servidor aberto, '+process.env.PORT)
});