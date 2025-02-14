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
    console.log(`USER ${socket.id} connected`)

    
})