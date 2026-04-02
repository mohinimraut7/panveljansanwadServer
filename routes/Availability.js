const express = require("express");
const router = express.Router();
const {
  addSlot,
  getAvailability,
  deleteAvailability,
  deleteSlot,
} = require("../controllers/Availability");

// Add a time slot (creates date record if not exists)
router.post("/availability/add-slot", addSlot);

// Get all availability records
router.get("/availability/get", getAvailability);

// Delete entire date record by ID
router.delete("/delete/:id", deleteAvailability);

// Delete one slot from a date record
// Body: { slotIndex: 0 }
router.delete("/delete-slot/:id", deleteSlot);

module.exports = router;