import express from 'express'
import { Server } from 'socket.io'

const app = express()
const PORT = process.env.PORT || 3000

const expressServer = app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    // console.log('A user connected:', socket.id);

    socket.on('joinRoom', ({ room, name }) => {
        socket.join(room);
        io.to(room).emit('message', `${name} has joined room: ${room}`);
    });

    socket.on('sendMessage', ({ room, name, messages }) => {
        // io.to(room).emit('message', `room ${room} > ${name} : ${messages}`);
        io.to(room).emit('message', `room ${room} > ${name} : ${messages}`);
    });
});