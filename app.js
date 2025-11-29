import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import TodoRoutes from "./routes/todo.route.js";
import connectDb from "./utils/database.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config(); // load environment variables from .env file
}

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello people of this world!");
});
// middleware to parse JSON request bodies and x-www-form-urlencoded and multipart/form-data
app.use(express.json()); // application/json - request body
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded - request body

app.use("/todo", TodoRoutes);

connectDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
