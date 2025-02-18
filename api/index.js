import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/listing.route.js"
import cookieParser from 'cookie-parser'
import path from 'path';




dotenv.config();



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to mongodb")
})
.catch((err)=>{
    console.log(err)
})
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json());
// app.use(express.static("dist"));
app.use(cookieParser());
app.listen(3000|| process.env.PORT,()=>{
    console.log("Server is listening on port 3000!!!");
})

var corsOptions = {
    origin: 'https://homehub-smoky.vercel.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  


 
  

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter)

app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  })


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })

}
)

export default app;