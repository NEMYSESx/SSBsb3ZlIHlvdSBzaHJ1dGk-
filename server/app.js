import express from 'express';
import cookieParser from 'cookie-parser';
import {config} from "dotenv"
import fileUpload from 'express-fileupload';
import cors from "cors";
import { dbConnection } from './database/db.js';
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";


const app = express();
config({path: "./config/config.env"});

app.use(cors({
    origin: process.env.NODE_ENV === "development" ? ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"] : [process.env.FRONTEND_URL, "https://*.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./temp/",
    })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
});

dbConnection();

export default app;