// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin");
const path = require("path");
const multer = require("multer");
const Activity = require("./models/activity");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "your_super_secret_key";

// Use modern Mongoose connection without deprecated options
mongoose
  .connect("mongodb://127.0.0.1:27017/stair-ecosystem")
  .then(() => {
    console.log("Connected to MongoDB");
    initAdmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize one admin if none exists
const initAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@stair.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("stair@1234", 10);
      await Admin.create({
        email: "admin@stair.com",
        password: hashedPassword,
      });
      console.log("Default admin user created.");
    }
  } catch (err) {
    console.error("Error initializing admin user:", err);
  }
};

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/admin/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

// Serve static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage setup for activity image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload activity route
app.post("/api/activities/upload", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const activity = new Activity({ title, description, imageUrl });
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: "Failed to save activity." });
  }
});

// Get all activities
app.get("/api/activities", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
