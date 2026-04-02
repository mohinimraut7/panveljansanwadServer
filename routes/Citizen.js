const express    = require("express");
const router     = express.Router();
const multer     = require("multer");
const path       = require("path");
const {
  registerCitizen,
  loginCitizen,
  bookAppointment,
  getMyAppointments,
  getAppointmentCard,
  getAllAppointments,
  updateAppointmentStatus,
  citizenLoginByMobile,
  getMicroSlots,
  getCitizenByUsername,
  getCitizenById,
  getDataByTokenId
} = require("../controllers/Citizen");
const uploadInwardApplication = require("../middlewares/uploadInwardApplication");
const uploadCitizenPhoto = require("../middlewares/uploadCitizenPhoto");





// ── Multer config for citizen photos ─────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/citizenPhotos/"),
  filename:    (req, file, cb) => cb(null, `photo-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
});

// ── Citizen Auth ──────────────────────────────────────────────────────────────
router.post("/register",registerCitizen);
router.post("/login",loginCitizen);
router.post("/citizenLoginByMobile",    citizenLoginByMobile);

// ── Appointments ──────────────────────────────────────────────────────────────
// router.post("/book-appointment",        upload.single("visitorPhoto"), bookAppointment);
router.post("/book-appointment", uploadCitizenPhoto, bookAppointment);  // ✅ Cloudinary now
router.get("/my-appointments",          getMyAppointments);
router.get("/appointment-card/:id",     getAppointmentCard);

// ── Admin routes ──────────────────────────────────────────────────────────────
router.get("/admin/all-appointments",          getAllAppointments);
// router.patch("/admin/update-status/:id",       updateAppointmentStatus);

router.patch("/admin/update-status/:id", uploadInwardApplication, updateAppointmentStatus);

// routes/availability.js — add:
router.get("/micro-slots", getMicroSlots);
router.get("/by-username/:username", getCitizenByUsername);
router.get("/by-id/:id", getCitizenById);  // ✅ ADD THIS

router.get("/appointment/token/:tokenId", getDataByTokenId);
module.exports = router;