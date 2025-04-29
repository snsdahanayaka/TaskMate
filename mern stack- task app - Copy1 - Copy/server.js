const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb'); // Added MongoClient
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI (using environment variable or fallback)
const uri =  "mongodb+srv://kariyawasamchamidew:vvdJxsCq4UseGqSy@cluster0.s3f32.mongodb.net/taskmate_db?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with options for Stable API
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB using Mongoose (for schema-based operations)
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected via Mongoose"))
  .catch((err) => console.error("MongoDB connection error (Mongoose):", err));

// Additional MongoClient connection test (for raw MongoDB operations)
async function testMongoClientConnection() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB via MongoClient!");
  } catch (err) {
    console.error("MongoClient connection error:", err);
  } finally {
    await client.close();
  }
}

// Run the MongoClient connection test on startup
testMongoClientConnection().catch(console.error);

// Import routes
const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", chatRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});