const express=require('express');
require('dotenv').config({ path: __dirname + '/../.env' });
const cors=require('cors');
const cookieParser=require('cookie-parser')
const connectDB=require('./config/db')
const authRouter=require('./routes/authRouter')
const app=express();
app.use(express.json());
app.use(cookieParser());
connectDB();
app.use(cors({
    origin: 'http://localhost:5173', // ✅ Frontend URL (Vite uses 5173)
    credentials: true  
}));
app.get("/",(req,res)=>{
    res.send("Backend is Working");
})
app.use('/api/auth',authRouter);
app.listen(4000,()=>console.log(`Server running on Port 4000`))
