import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoute";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});

// Use task routes
app.use("/api", taskRoutes);

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(process.env.MONGO_URI)
  console.log(`Server is running on port ${PORT}`);
});

export default app;
