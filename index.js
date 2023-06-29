const express = require('express');
const cors = require('cors');
const http = require('http'); // Import http module

const { Server } = require('socket.io');
const port = 3001;
const app = express();

app.use(cors());

const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
    cors: {
        origin: 'http://192.168.43.214:3000',
        methods : ['GET', 'POST'],
    }
});

io.on("connection", (socket)=>{
    try {
        console.log(`User connection ID : ${socket.id}`);
    } catch (error) {
        console.error(error);
    }

    socket.on("joinRoom" , (data)=>{
        socket.join(data);
    });

    socket.on("sendMessage" , (data)=>{
        console.log(`User sent message : ${data.message}`);
        // socket.broadcast.emit("receiveMessage" , data);
        socket.to(data.room).emit("receiveMessage" , data);
    });
})
server.listen(port, () => {
    console.log('SERVER RUNNING');
});
