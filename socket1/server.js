import { WebSocketServer as ws } from "ws";
const server = new ws({ port: 3000 })
console.log('Server now working')

let count = 1

server.on('connection', (socket) => {
    const id = count++

    server.clients.forEach((client) => {
        client.send(`User ${id} has joined the chat`);
    });

    socket.on('message', (message) => {
        server.clients.forEach((client) => {
            client.send(`${id} : ${message}`)
        })
    })



})
