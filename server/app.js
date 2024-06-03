const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const express = require("express");

app = express();

// Import the http module
app.use(cors());
// Create a server instance
const server = http.createServer(app);

// Handle socket.io connections
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  //   console.log(`A user connected ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });
});
// Start the server
const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
