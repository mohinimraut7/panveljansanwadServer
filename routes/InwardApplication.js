const express = require("express");
const router  = express.Router();

const {
  addInwardApplication,
  getAllApplications,
  replyApplication,          // ← NEW
} = require("../controllers/InwardApplication");

const uploadInwardApplication = require("../middlewares/uploadInwardApplication");

// ── Inward Add ──
router.post(
  "/inwardAdd",
  // uploadInwardApplication.single("documents"),
    uploadInwardApplication,
  addInwardApplication
);

// ── Get All Applications ──
router.get(
  "/getAllApplications",
  getAllApplications
);

// ── Reply Application ──   POST /api/replyApplication
// router.post(
//   "/replyApplication",
//    uploadInwardApplication,   // ✅ same middleware handles replyDocument too
//   replyApplication
// );


// ✅ After
router.patch(
  "/replyApplication/:tokenNo",
  uploadInwardApplication,
  replyApplication
);

module.exports = router;