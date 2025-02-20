import express from 'express';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;

const expressServer = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
});

// Store active rooms and track users in each room
const rooms = new Set();
const roomUsers = new Map(); // { roomName: Set(socketIds) }

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Send existing rooms to the new client
    socket.emit('rooms', Array.from(rooms));

    socket.on('joinRoom', ({ room, name }) => {
        socket.join(room);
        rooms.add(room);

        if (!roomUsers.has(room)) {
            roomUsers.set(room, new Set());
        }
        roomUsers.get(room).add(socket.id);

        io.to(room).emit('message', `${name} has joined room: ${room}`);
        io.emit('rooms', Array.from(rooms)); // Update all clients with the room list
    });

    socket.on('sendMessage', ({ room, name, messages }) => {
        io.to(room).emit('message', `room ${room} > ${name} : ${messages}`);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);

        // Check and remove the user from any room they were in
        for (const [room, users] of roomUsers.entries()) {
            users.delete(socket.id);
            if (users.size === 0) {
                // Schedule room deletion after 30 seconds if still empty
                setTimeout(() => {
                    if (roomUsers.get(room)?.size === 0) {
                        rooms.delete(room);
                        roomUsers.delete(room);
                        io.emit('rooms', Array.from(rooms)); // Update room list
                        console.log(`Room ${room} deleted due to inactivity.`);
                        
                    }
                }, 30000);
            }
        }
    });
});
