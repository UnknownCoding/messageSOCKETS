const express= require("express");
const app= express();
const http= require("http");
const cors= require("cors");
const {Server}= require("socket.io");

app.use(cors());
const server= http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
}); 

io.on("connection",(socket)=>{
    console.log(`User ${socket.id} has joined`)
    socket.on("join_room", 
                (data)=>{socket.join(data);
                console.log(`User with ID ${socket.id} in room ${data} `);
                }); 
    socket.on("send_message", (data) =>{
        socket.to(data.room).emit("recieve_message",data)
    });

    socket.on("disconnect", ()=>{
        console.log("disconnected mayne!", socket.id);
    });
});

server.listen(3001,()=>{
    console.log("works!");
});