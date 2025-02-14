import express from 'express'
import { Server } from 'socket.io'
const app = express()

let PORT = 3500
const expressServer = app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    io.emit('message', `USER : ${socket.id} CONNECTED`)

    socket.on('message', (message) => {
        io.emit('message', `USER : ${socket.id} : ${message}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', `USER : ${socket.id} DISCONNECTED`)
    })
})

