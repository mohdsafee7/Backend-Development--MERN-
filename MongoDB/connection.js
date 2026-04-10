import mongoose from 'mongoose';


// Function to connect to MongoDB using Mongoose
export const connectMongoDB = async (connectionURL) => {
  const connection = await mongoose.connect(connectionURL);
  return connection;
}