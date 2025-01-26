const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the user model
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// POST route to add a user
router.post("/add", upload.array('images'), async (req, res) => {
    try {
        const { name, socialHandle } = req.body;
        const images = req.files.map(file => file.path); // Get the paths of uploaded files

        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        if (!name || !socialHandle || !images.length) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({
            name,
            socialHandle,
            images, // Now this will be an array of file paths
        });

        await newUser.save();
        res.status(200).json({ message: "User added successfully", user: newUser });
    } catch (error) {
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
