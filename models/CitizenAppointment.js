const mongoose = require("mongoose");

const citizenAppointmentSchema = new mongoose.Schema(
  {
    // ── Token ID (unique, auto-generated like inwardNo) ───────────────────
    tokenId: {
      type:   String,
      unique: true,
      trim:   true,
    },

    // ── Citizen reference ─────────────────────────────────────────────────
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "Citizen",
    },

    

    // ── Personal info (snapshot at booking time) ──────────────────────────
    fullName:     { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    email:        { type: String, default: "",    trim: true, lowercase: true },
    address:      { type: String, default: "",    trim: true },
    pincode:      { type: String, default: "",    trim: true },

    // ── Appointment slot (addSlot pattern: start + end separate) ─────────
    preferredDate: { type: String, required: true },  // YYYY-MM-DD
    slotStart:     { type: String, required: true },  // "10:00"
    slotEnd:       { type: String, required: true },  // "11:00"
    slotTime:      { type: String, required: true },  // "10:00 - 11:00" (display)

    // ── Additional info ───────────────────────────────────────────────────
    purpose:          { type: String, required: true, trim: true },
    numberOfVisitors: { type: String, default: "1" },
    visitedBefore:    { type: Boolean, default: false },
    ward:             { type: String, default: "", trim: true },

    // ── Photo path (addInwardApplication pattern: req.file.path) ─────────
    visitorPhoto: { type: String, default: "" },

    // ── QR code ───────────────────────────────────────────────────────────
    qrCode: { type: String, default: "" },

    // ── Status ────────────────────────────────────────────────────────────
    status: {
      type:    String,
      enum:    ["pending","in progress","approved", "rejected", "expired","resolved"],
      default: "pending",
    },

    // ── Submission info (addInwardApplication pattern) ────────────────────
    submittedById:   { type: String, default: "" },
    submittedByName: { type: String, default: "" },

    // ── Admin notes ───────────────────────────────────────────────────────
    adminNote: { type: String, default: "" },
    replyDocument: { type: String, default: "" }, // ✅ ADD

    // In CitizenAppointment schema, add:
microStart:  { type: String, default: "" },
microEnd:    { type: String, default: "" },
microSlot:   { type: String, default: "" }, // "09:00 - 09:15"
  },
  { timestamps: true }
);

// ✅ After — remove next parameter, just use async/await
citizenAppointmentSchema.pre("save", async function () {
  if (!this.tokenId) {
    const today   = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
    const count   = await mongoose.model("CitizenAppointment").countDocuments();
    this.tokenId  = `VVCMC-${dateStr}-${String(count + 1).padStart(4, "0")}`;
  }
});

module.exports = mongoose.model("CitizenAppointment", citizenAppointmentSchema);






























