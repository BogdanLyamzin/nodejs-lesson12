const webSocketServer = new require("ws");

const wsServer = new webSocketServer.Server({port: 5000});

wsServer.on("connection", (server)=>{
    console.log("New conection")
    server.send("Server message")
});