//UhE1CiWLDTTXnkAgconst express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
require("dotenv").config(); // Load .env variables

const reminderRoutes = require("./routes/reminderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8080;

mongoose
    .connect(MONGODB_URL)
    .then(() => console.log(" MongoDB Connected Successfully!"))
    .catch((err) => console.error(" MongoDB Connection Error:", err));

app.use("/reminders", reminderRoutes);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));