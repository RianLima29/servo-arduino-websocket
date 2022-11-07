const { readFileSync } = require("fs");
const { createServer } = require("https");
const brightness = require('brightness');
import {Server} from 'socket.io'

const httpServer = createServer({
  key: readFileSync('../crt/certificado.key'),
  cert: readFileSync("../crt/certificado.cert")
});



const io = new Server(httpServer, {cors: {origin: '*'}});

io.on("connection", (socket) => {
    console.log('conexão')
    socket.on('data', (args : {XRotation: number, YRotation: number, ZRotation: number}) => {
        console.log(args)
        brightness.set(Math.abs(args.ZRotation / 360))
        console.log('val'+ Math.abs(args.ZRotation))  
    })
  });

httpServer.listen(3000, ()=>{
  console.log('Servidor aberto')
});