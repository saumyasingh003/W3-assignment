const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    socialHandle: {
      type: String,
      required: [true, "Social handle is required"], // Ensure this matches the field name
    },
    images: [{
      type: String, // This will store the file paths
      required: [true, "Images are required"],
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
