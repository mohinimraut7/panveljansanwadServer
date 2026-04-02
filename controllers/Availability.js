const Availability = require("../models/Availability");

// Helper: check if two time slots overlap
function slotsOverlap(s1, e1, s2, e2) {
  const toMin = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  return toMin(s1) < toMin(e2) && toMin(s2) < toMin(e1);
}

// POST /api/availability/add-slot
// Body: { date: "2026-03-20", start: "09:00", end: "11:00" }
const addSlot = async (req, res) => {
  try {
    const { date, start, end } = req.body;

    if (!date || !start || !end) {
      return res.status(400).json({
        success: false,
        message: "date, start, and end are required",
      });
    }

    let record = await Availability.findOne({ date });

    if (record) {
      // Check for overlapping slots
      const overlap = record.timeSlots.find((s) =>
        slotsOverlap(start, end, s.start, s.end)
      );
      if (overlap) {
        return res.status(400).json({
          success: false,
          message: `Slot overlaps with existing: ${overlap.start} - ${overlap.end}`,
        });
      }

      // Add new slot and sort by start time
      record.timeSlots.push({ start, end });
      record.timeSlots.sort((a, b) => {
        const toMin = (t) => {
          const [h, m] = t.split(":").map(Number);
          return h * 60 + m;
        };
        return toMin(a.start) - toMin(b.start);
      });

      await record.save();
    } else {
      // Create new date record with this slot
      record = await Availability.create({
        date,
        timeSlots: [{ start, end }],
        status: "Mayor Available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Slot added successfully",
      data: record,
    });
  } catch (error) {
    console.error("addSlot error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/availability/get
const getAvailability = async (req, res) => {
  try {
    const records = await Availability.find().sort({ date: 1 });
    return res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("getAvailability error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/availability/delete/:id
// Deletes the entire date record
const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    await Availability.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Availability record removed",
    });
  } catch (error) {
    console.error("deleteAvailability error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/availability/delete-slot/:id
// Body: { slotIndex: 0 }  — removes one slot from a date
const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { slotIndex } = req.body;

    if (slotIndex === undefined || slotIndex === null) {
      return res.status(400).json({ success: false, message: "slotIndex is required" });
    }

    const record = await Availability.findById(id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    record.timeSlots.splice(slotIndex, 1);

    // If no slots left, delete the entire record
    if (record.timeSlots.length === 0) {
      await Availability.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Last slot removed, date record deleted",
        deleted: true,
      });
    }

    await record.save();
    return res.status(200).json({
      success: true,
      message: "Slot removed",
      data: record,
    });
  } catch (error) {
    console.error("deleteSlot error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addSlot, getAvailability, deleteAvailability, deleteSlot };