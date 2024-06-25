import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/test";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cashed: MongooseConnection = (global as any).mongoose || {};

if (!cashed) {
  cashed = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cashed.conn) {
    return cashed.conn;
  }

  if (!MONGO_URI)
    throw new Error(
      "Please define the MONGO_URL environment variable inside .env.local"
    );

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cashed.conn = await cashed.promise;
  return cashed.conn;
};
