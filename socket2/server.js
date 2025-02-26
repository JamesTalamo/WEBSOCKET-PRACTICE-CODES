import { Server } from "socket.io";
import { createServer } from 'http'
const httpServer = createServer()

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log(`User ${socket.id} is connected `)

    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

})

httpServer.listen(3500, () => {
    console.log(`Listening on port 3500`)
})