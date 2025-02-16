import express from 'express'
import { Server } from 'socket.io'

const app = express()


const PORT = 3500
const expressServer = app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    io.emit('message', `User : ${socket.id} CONNECTED`)

    socket.on('textMsg', (message) => {
        io.emit('message', `${socket.id}: ${message}`)
    })


    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)

    })
})