const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  });
const app = require("./app");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  io.emit("connected", "A user joineed");
  socket.on("joinRoom", (data) => {
    socket.join(data);
    socket.to(data).emit("ifJoined", "A user joined");
  });
  socket.on("message", (data) => {
    io.to(data.activeRoom).emit("resMsg", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
