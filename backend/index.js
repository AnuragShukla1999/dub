import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dbConnection from "./config/db.js";

import authRouter from './routes/authRoute.js';
import userRouter from "./routes/userRoute.js";
import locationRouter from './routes/locationRoute.js';
import ProductRouter from './routes/productRoute.js'

dotenv.config();

dbConnection();

const app = express();

// app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// app.use(express.static('frontend/build'));



// api
app.use('/api', authRouter);
app.use('/api', ProductRouter);
app.use('/api', userRouter);
app.use('/api', locationRouter);


app.listen(process.env.PORT, () => {
    console.log(`server is connnected at ${process.env.PORT}`);
})