
const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, socialHandle } = req.body;
        const imagePaths = req.files.map((file) => file.path);

        const newUser = new User({
            name,
            socialHandle,
            images: imagePaths
        });

        await newUser.save();
        res.status(201).json({ message: "User submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getUsers };
