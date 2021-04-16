const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

server.listen(3000);

const users = {};

io.sockets.on("connection", (client)=>{
    const broadcast = (event, data) => {
        client.emit(event, data);
        client.broadcast.emit(event, data);
    }

    broadcast("user", users);

    client.on("message", (msg) => {
        if(users(client.id) !== msg.name){
            users[client.id] = msg.name;
            broadcast("user", users);
        }
        broadcast("message", users);
    })

    client.on("disconnect", ()=> {
        delete users(client.id);
        client.broadcast.emit("user", users);
    })
})