import mongoose from "mongoose";
import dotenv from 'dotenv'
import {MONGO_URI} from '../variables.js'

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
      );
   const url = `${db.connection.host}: ${db.connection.port}`
   console.log(`Connected in: ${url}`)

  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
