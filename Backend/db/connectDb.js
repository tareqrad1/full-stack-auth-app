import mongoose from 'mongoose';

export const connectDb = async () => {
    let URI = `mongodb://localhost:27017/auth-app`;
    try {
        await mongoose.connect(URI)
        console.log('database connected successfully ✔');
    } catch (error) {
        console.log('Error connecting to the database ❌');
        process.exit(1);
    }
}