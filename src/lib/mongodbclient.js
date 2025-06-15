// import { MongoClient } from 'mongodb';

// const uri = process.env.DATABASE_URL; // Make sure this is set correctly
// const options = {};

// let client;
// let clientPromise;

// if (!process.env.DATABASE_URL) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// if (process.env.NODE_ENV === 'development') {
//   // Use global variable in development to avoid re-creating the client
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production, just connect normally
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const options = {};

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGO_URI, options);
  clientPromise = client.connect();
}

export default clientPromise;