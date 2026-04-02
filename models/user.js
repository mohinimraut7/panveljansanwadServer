const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },

    userName: {
      type: String,
      trim: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
    
    },

    role: {
      type: String,
      default: "",
    },

    departmentName: {
      type: String,
    },

    office: {
      type: String,
    },

    departmentCategory: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);