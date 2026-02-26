import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/product.routes.js';

const app = express();

import dotenv from "dotenv";
dotenv.config();

app.use(cors({
    origin : process.env.CORS_ORG,
    credentials : true
}))

app.use(cookieParser());
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({ extended : true, limit : "16kb"}));
app.use("/uploads", express.static("uploads"));
app.use("/bagnest/", router)
app.use(express.static("public"));

export default app;