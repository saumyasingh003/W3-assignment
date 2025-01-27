const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the user model
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to add a user
router.post("/add", upload.array('images'), async (req, res) => {
    try {
        const { name, socialHandle } = req.body;
        
        if (!name || !socialHandle || !req.files || req.files.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream( 
                    {
                        folder: "user-images",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );

                // Convert buffer to stream and pipe to Cloudinary
                const bufferStream = require('stream').Readable.from(file.buffer);
                bufferStream.pipe(uploadStream);
            });
        });

        // Wait for all images to be uploaded
        const imageUrls = await Promise.all(uploadPromises);

        const newUser = new User({
            name,
            socialHandle,
            images: imageUrls, // Store Cloudinary URLs instead of file paths
        });

        await newUser.save();
        res.status(200).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/users", async (req, res) => {
    try {
        
        const totalUsers = await User.countDocuments();
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            users: users,
            totalUsers: totalUsers
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;
