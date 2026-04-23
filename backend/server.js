const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", productRoutes);

// DB connect
connectDB();

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
