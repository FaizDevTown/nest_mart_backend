import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js'
import CategoryRoutes from "./routes/CategoryRoutes.js"
//env config    
dotenv.config()

//db config
connectDB()

const app  = express();

//middelwares use
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))


// routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category",CategoryRoutes);



// rest api 
app.get("/", (req,res)=>{
    console.log(colors.bgCyan.white("API IS HIT"))
    res.send("<h1>Welcome to ecommerce app</h1>")
})
// Port 

const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
console.log(`Starting ecommerce on port ${PORT}`.bgGreen.bgMagenta)
})