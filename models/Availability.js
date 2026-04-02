const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true }, // "09:00"
    end: { type: String, required: true },   // "11:00"
  },
  { _id: false }
);

const availabilitySchema = new mongoose.Schema(
  {
    date: {
      type: String, // format: "YYYY-MM-DD"
      required: true,
      unique: true,
    },
    timeSlots: {
      type: [timeSlotSchema],
      default: [],
    },
    status: {
      type: String,
      default: "Mayor Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);