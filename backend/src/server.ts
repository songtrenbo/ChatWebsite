import express, { Application, Request, Response, NextFunction } from "express";
import { connectDB } from "./config/db.config";
import userRouter from "./routes/user.route";
import conversationRouter from "./routes/conversation.route";
import messageRouter from "./routes/message.route";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Socket } from "socket.io";

dotenv.config();

const app: Application = express();

const corsOptions = {
  origin: process.env.CLIENT_URI,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("API Work");
});

const port = process.env.PORT!;

const server = http.createServer(app);

const io = require('socket.io')(server,{
  cors:{
    origin: [process.env.CLIENT_URI]
  }
})

io.on('connection', (socket: Socket)=>{
  console.log('a user connected');
  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  })

  socket.on('message', (msg: string) =>{
    console.log('message: '+msg);
    io.emit('broadcast', msg);
  })

  socket.on('conversation', (conversation: string)=>{
    console.log('conversation: '+conversation);
    io.emit('conversation broadcast', conversation);
  })
})

server.listen(port, () => {
  console.log(`app listen on port ${port}`);
  connectDB();
});