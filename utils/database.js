import mongoose from "mongoose";

export default function connectDb() {
  // connect to mongodb database using mongoose
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB database");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB database:", error.message);
      process.exit(1); // exit the process with failure
    });
}
