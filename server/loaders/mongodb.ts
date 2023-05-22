import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const connectToDB = () => {
  const uri = process.env.MONGODB_URI ?? '';

  if (!uri) {
    console.error('Error: Please provide a valid MongoDB URI');
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
    process.exit(2);
  });

  db.on('connected', () => {
    console.log('MongoDB State: Connected');
  });

  db.on('disconnected', () => {
    console.log('MongoDB State: Disconnected');
  });

  mongoose.set('strictQuery', true);

  mongoose
    .connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
};

export default connectToDB;
