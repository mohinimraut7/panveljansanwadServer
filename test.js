const Citizen            = require("../models/Citizen");
const CitizenAppointment = require("../models/CitizenAppointment");
const Availability       = require("../models/Availability");
const bcrypt             = require("bcryptjs");
const QRCode             = require("qrcode");
const jwt                = require("jsonwebtoken");


const { generate15MinSlots } = require("../utils/slotUtils");

// ── Helper: parse slotTime "10:00 - 11:00" → { start, end } ─────────────────
function parseSlotTime(slotTime) {
  const parts = slotTime.split(" - ");
  return { start: parts[0]?.trim(), end: parts[1]?.trim() };
}

// ── Helper: check slot overlap ────────────────────────────────────────────────
function slotsOverlap(start1, end1, start2, end2) {
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  return toMin(start1) < toMin(end2) && toMin(end1) > toMin(start2);
}


exports.registerCitizen = async (req, res) => {
  try {
    let { fullName, userName, mobileNumber, email, password, pincode, address } = req.body;

    fullName     = fullName?.trim();
    userName     = userName?.trim() || null;
    mobileNumber = mobileNumber?.trim();
    email        = email?.trim().toLowerCase() || "";
    pincode      = pincode?.trim() || "";
    address      = address?.trim() || "";

    if (!fullName || !mobileNumber || !password) {
      return res.status(400).json({ success: false, message: "सर्व fields required ❌" });
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ success: false, message: "Mobile number 10 digits असावा ❌" });
    }

    const existing = await Citizen.findOne({ mobileNumber });
    if (existing) {
      return res.status(409).json({ success: false, message: "हा mobile number already registered आहे ❌" });
    }

    const citizen = await Citizen.create({
      fullName,
      username:     userName,
      mobileNumber,
      email,
      password,
      pincode,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful ✅",
      citizen: {
        _id:          citizen._id,
        fullName:     citizen.fullName,
        username:     citizen.username,
        mobileNumber: citizen.mobileNumber,
        email:        citizen.email,
        pincode:      citizen.pincode,
        address:      citizen.address,
      },
    });
  } catch (error) {
    console.error("Citizen Register Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};



exports.loginCitizen = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username?.trim();

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username आणि Password required ❌" });
    }

    const user = await Citizen.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account सापडले नाही ❌" });
    }

    // ✅ plain text compare (bcrypt नाही)
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: "Password चुकीचा आहे ❌" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      citizen: {
        _id:      user._id,
        fullName: user.fullName,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ LOGIN BY MOBILE (OTP style) — Citizen model vaprto, auto-register karto
// ══════════════════════════════════════════════════════════════════════════════
exports.citizenLoginByMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    console.log("📱 citizenLoginByMobile called:", mobileNo);

    if (!mobileNo) {
      return res.status(400).json({ success: false, message: "Mobile number required ❌" });
    }

    const trimmed = mobileNo.toString().trim();

    if (!/^\d{10}$/.test(trimmed)) {
      return res.status(400).json({ success: false, message: "Valid 10 digit mobile number द्या ❌" });
    }

    // Citizen शोधा
    let citizen = await Citizen.findOne({ mobileNumber: trimmed });

    console.log("🔍 Citizen found:", citizen ? citizen.fullName : "NOT FOUND");

    // नसेल तर auto-register
    if (!citizen) {
      console.log("🆕 Auto registering citizen:", trimmed);

      citizen = await Citizen.create({
        fullName:     `नागरिक ${trimmed.slice(-4)}`,
        mobileNumber: trimmed,
        email:        "",
        password:     trimmed,   // ← bcrypt नाही, plain — User model सारखाच
      });

      console.log("✅ Auto-registered:", citizen.fullName);
    }

    const token = jwt.sign(
      { id: citizen._id, mobileNumber: citizen.mobileNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP Login Success ✅",
      token,
      citizen: {
        _id:          citizen._id,
        fullName:     citizen.fullName,
        mobileNumber: citizen.mobileNumber,
        email:        citizen.email,
      },
    });

  } catch (error) {
    console.error("CitizenLoginByMobile Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};



exports.bookAppointment = async (req, res) => {
  try {
    const {
      citizenId,
      fullName, mobileNumber, email, address, pincode,
      preferredDate, slotTime,
      microSlot,
      purpose, numberOfVisitors, visitedBefore, ward,
      submittedById, submittedByName,
    } = req.body;

    if (!fullName || !mobileNumber || !preferredDate || !slotTime || !microSlot || !purpose) {
      return res.status(400).json({ success: false, message: "Required fields missing ❌" });
    }

    const { start: slotStart, end: slotEnd } = parseSlotTime(slotTime);
    if (!slotStart || !slotEnd) {
      return res.status(400).json({ success: false, message: "Invalid slot time format ❌" });
    }

    const { start: microStart, end: microEnd } = parseSlotTime(microSlot);
    if (!microStart || !microEnd) {
      return res.status(400).json({ success: false, message: "Invalid micro slot format ❌" });
    }

    const allMicroSlots = generate15MinSlots(slotStart, slotEnd);
    const validMicro = allMicroSlots.find(s => s.start === microStart && s.end === microEnd);
    if (!validMicro) {
      return res.status(400).json({ success: false, message: "हा 15-minute slot valid नाही ❌" });
    }

    const availRecord = await Availability.findOne({ date: preferredDate });
    if (!availRecord) {
      return res.status(400).json({ success: false, message: "त्या date साठी availability नाही ❌" });
    }
    const slotExists = availRecord.timeSlots.find(s => s.start === slotStart && s.end === slotEnd);
    if (!slotExists) {
      return res.status(400).json({ success: false, message: "हा slot available नाही ❌" });
    }

    const microSlotTaken = await CitizenAppointment.findOne({
      preferredDate,
      microStart,
      microEnd,
      status: { $nin: ["rejected", "expired"] },
    });
    if (microSlotTaken) {
      return res.status(409).json({
        success: false,
        message: `${microSlot} हा slot आधीच बुक झाला आहे ❌`,
      });
    }

    const existingBookings = await CitizenAppointment.find({
      mobileNumber,
      preferredDate,
      status: { $nin: ["rejected", "expired"] },
    });
    if (existingBookings.length > 0) {
      return res.status(409).json({
        success: false,
        message: "त्याच date साठी आधीच booking आहे ❌",
      });
    }

    const totalMicroSlots = allMicroSlots.length;
    const bookedCount = await CitizenAppointment.countDocuments({
      preferredDate,
      slotTime,
      status: { $nin: ["rejected", "expired"] },
    });
    if (bookedCount >= totalMicroSlots) {
      return res.status(409).json({
        success: false,
        message: "हा slot पूर्णपणे भरला आहे ❌ (All 15-min slots booked)",
      });
    }

    const visitorPhoto = req.file ? req.file.path : "";

    const appt = new CitizenAppointment({
      citizenId:        citizenId || null,
      fullName:         fullName.trim(),
      mobileNumber:     mobileNumber.trim(),
      email:            email?.trim().toLowerCase() || "",
      address:          address?.trim()  || "",
      pincode:          pincode?.trim()  || "",
      preferredDate,
      slotStart,
      slotEnd,
      slotTime,
      microStart,
      microEnd,
      microSlot,
      purpose:          purpose.trim(),
      numberOfVisitors: numberOfVisitors || "1",
      visitedBefore:    visitedBefore === "true" || visitedBefore === true,
      ward:             ward?.trim() || "",
      visitorPhoto,
      submittedById:    submittedById   || "",
      submittedByName:  submittedByName || "",
      status:           "pending",
    });

    await appt.save();

    const cardUrl = `${process.env.BACKEND_URL || "http://localhost:5000"}/api/citizen/appointment-card/${appt._id}`;
    appt.qrCode = await QRCode.toDataURL(cardUrl);
    await appt.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully ✅",
      data: {
        _id:           appt._id,
        tokenId:       appt.tokenId,
        preferredDate: appt.preferredDate,
        slotTime:      appt.slotTime,
        microSlot:     appt.microSlot,
        status:        appt.status,
        qrCode:        appt.qrCode,
      },
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// GET /api/citizen/micro-slots?date=2026-03-19&slotTime=09:00 - 12:00
exports.getMicroSlots = async (req, res) => {
  try {
    const { date, slotTime } = req.query;
    if (!date || !slotTime) {
      return res.status(400).json({ success: false, message: "date and slotTime required" });
    }

    const { start, end } = parseSlotTime(slotTime);
    if (!start || !end) {
      return res.status(400).json({ success: false, message: "Invalid slotTime format" });
    }

    const allMicro = generate15MinSlots(start, end);

    const booked = await CitizenAppointment.find({
      preferredDate: date,
      slotTime,
      status: { $nin: ["rejected", "expired"] },
    }).select("microStart microEnd");

    const bookedSet = new Set(booked.map(b => `${b.microStart}-${b.microEnd}`));

    const result = allMicro.map(slot => ({
      microSlot: `${slot.start} - ${slot.end}`,
      start: slot.start,
      end:   slot.end,
      booked: bookedSet.has(`${slot.start}-${slot.end}`),
    }));

    const allFull = result.every(s => s.booked);

    return res.json({
      success: true,
      data: {
        date,
        slotTime,
        totalSlots:     result.length,
        availableSlots: result.filter(s => !s.booked).length,
        allFull,
        slots: result,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};



exports.getMyAppointments = async (req, res) => {
  try {
    const { mobileNumber, citizenId } = req.query;

    let appointments = [];

    if (citizenId) {
      appointments = await CitizenAppointment.find({ citizenId }).sort({ createdAt: -1 });
    } else if (mobileNumber) {
      appointments = await CitizenAppointment.find({ mobileNumber }).sort({ createdAt: -1 });
    }

    return res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error("Get My Appointments Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ GET APPOINTMENT CARD (QR scan)
// ══════════════════════════════════════════════════════════════════════════════
exports.getAppointmentCard = async (req, res) => {
  try {
    const { id } = req.params;
    const appt   = await CitizenAppointment.findById(id);
    if (!appt) {
      return res.status(404).json({ success: false, message: "Appointment Not Found ❌" });
    }
    const today = new Date().toISOString().split("T")[0];
    if (appt.preferredDate < today && appt.status === "pending") {
      appt.status = "expired";
      await appt.save();
    }
    return res.status(200).json({ success: true, appointment: appt });
  } catch (error) {
    console.error("Get Appointment Card Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ GET ALL APPOINTMENTS (Admin)
// ══════════════════════════════════════════════════════════════════════════════
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (date)                        filter.preferredDate = date;
    const appointments = await CitizenAppointment.find(filter).sort({ preferredDate: 1, createdAt: -1 });
    return res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error("Get All Appointments Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ UPDATE APPOINTMENT STATUS (Admin)
// ══════════════════════════════════════════════════════════════════════════════
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id }                = req.params;
    const { status, adminNote } = req.body;

    if (!["pending", "approved", "rejected", "expired"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status ❌" });
    }

    const appt = await CitizenAppointment.findByIdAndUpdate(
      id,
      { status, adminNote: adminNote || "" },
      { new: true }
    );
    if (!appt) {
      return res.status(404).json({ success: false, message: "Appointment Not Found ❌" });
    }

    return res.status(200).json({ success: true, message: "Status Updated ✅", appointment: appt });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ GET CITIZEN BY USERNAME (kept for backward compatibility)
// ══════════════════════════════════════════════════════════════════════════════
exports.getCitizenByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username required ❌" });
    }

    const citizen = await Citizen.findOne({ username: username.trim() }).select("-password");

    if (!citizen) {
      return res.status(404).json({ success: false, message: "Citizen सापडले नाही ❌" });
    }

    return res.status(200).json({
      success: true,
      citizen: {
        _id:          citizen._id,
        username:     citizen.username,
        fullName:     citizen.fullName,
        mobileNumber: citizen.mobileNumber,
        email:        citizen.email,
        pincode:      citizen.pincode,
        address:      citizen.address,
        createdAt:    citizen.createdAt,
        updatedAt:    citizen.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get Citizen By Username Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ NEW: GET CITIZEN BY ID — returns citizen data + last appointment's ward & photo
// ══════════════════════════════════════════════════════════════════════════════
exports.getCitizenById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Citizen ID required ❌" });
    }

    // ── Step 1: Get citizen from Citizen collection ───────────────────────
    const citizen = await Citizen.findById(id).select("-password");

    if (!citizen) {
      return res.status(404).json({ success: false, message: "Citizen सापडले नाही ❌" });
    }

    // ── Step 2: Get total appointment count (= visit count) ───────────────
    const totalAppointments = await CitizenAppointment.countDocuments({ citizenId: id });

    // ── Step 3: Get last appointment for ward + visitorPhoto ──────────────
    const lastAppointment = await CitizenAppointment.findOne({ citizenId: id })
      .sort({ createdAt: -1 })
      .select("ward visitorPhoto");

    return res.status(200).json({
      success: true,
      citizen: {
        _id:          citizen._id,
        username:     citizen.username,
        fullName:     citizen.fullName,
        mobileNumber: citizen.mobileNumber,
        email:        citizen.email,
        pincode:      citizen.pincode,
        address:      citizen.address,
        createdAt:    citizen.createdAt,
        updatedAt:    citizen.updatedAt,
      },
      // ✅ From last CitizenAppointment via citizenId reference
      lastWard:        lastAppointment?.ward         || "",
      lastPhoto:       lastAppointment?.visitorPhoto || "",
      visitCount:      totalAppointments,              // past visits
      nextVisitNumber: totalAppointments + 1,          // this will be their next visit
    });
  } catch (error) {
    console.error("Get Citizen By ID Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};












