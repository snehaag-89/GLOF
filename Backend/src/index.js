const express = require('express');
require('dotenv').config({ path: __dirname + '/../.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const requestRouter = require('./routes/requestRouter');

// ✅ UPDATED: Import volunteer routes
// const volunteerRouter = require('./routes/volunteer');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// ✅ UPDATED: Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

// Make io accessible in routes/controllers
app.set("io", io);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ UPDATED: CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is Working");
});

// ✅ API Routes
app.use('/api/auth', authRouter);
app.use('/api/request', requestRouter);
// app.use('/api/volunteer', volunteerRouter); // ✅ Added volunteer routes

// ✅ Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

