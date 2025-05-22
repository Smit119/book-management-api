import mongoose from 'mongoose';

const db = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Library'
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1)
    }
};
export default db;
