import dotenv from "dotenv";
dotenv.config();

import { connect } from 'mongoose';
import app from './app.js';
import connectDb from './db/connect.js';
import { env } from 'process';
import { configureCloudinary } from "./utils/cloudinary.js";

configureCloudinary(); 

connectDb()
.then(() => {

    app.get('/', (req, res) => {
        res.send("API is running....:");
    })

    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running on port ${process.env.PORT || 5000},${process.env.Cloud_Name}`);
    })
})
.catch((err) => {
    console.log(err);
})