const express = require('express');
require('dotenv').config({ path: __dirname + '/../.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const requestRouter = require('./routes/requestRouter');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', credentials: true }
});

// Make io accessible in routes/controllers
app.set("io", io);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Backend is Working");
});

app.use('/api/auth', authRouter);
app.use('/api/request', requestRouter);

server.listen(4000, () => console.log(`Server running on Port 4000`));
