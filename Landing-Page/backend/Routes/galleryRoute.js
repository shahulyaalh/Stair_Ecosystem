const express = require("express");
const multer = require("multer");
const Gallery = require("../Models/galleryschema"); // Mongoose Model
const router = express.Router();

// Multer Setup (Upload to "uploads/" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload Image API
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Gallery({ imageUrl: `/uploads/${req.file.filename}` });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", newImage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Images API
router.get("/images", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
