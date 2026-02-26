import { connect } from 'mongoose';
import app from './app.js';
import connectDb from './db/connect.js';
import { env } from 'process';


connectDb()
.then(() => {

    app.get('/', (req, res) => {
        res.send("API is running....:", process.env.Cloud_Name);
    })

    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running on port ${process.env.PORT || 5000}`);
    })
})
.catch((err) => {
    console.log(err);
})