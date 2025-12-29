import express, { Router } from 'express'
import Connection from './database/db.js';
import router from './routes/api.js';
import cors from "cors"
import dotenv from 'dotenv'
import path from 'path';
const app=express();
dotenv.config();
app.use(cors());
const PORT=process.env.PORT;
app.use('/',router);
const __dirname=path.resolve()
app.use(express.static(path.join(__dirname,'/frontend/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})
app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})
Connection();