import mongoose, { mongo } from 'mongoose';

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.CONNECTIONDB}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDb;