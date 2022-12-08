import mongoose from "mongoose";

async function Connect() {
  const username = process.env.MONGO_DB_USERNAME
  const password = process.env.MONGO_DB_PASSWORD
  const url = process.env.MONGO_DB_URL
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`
  );
  console.log("MongoDB connection is successfull");
}

export default Connect;
