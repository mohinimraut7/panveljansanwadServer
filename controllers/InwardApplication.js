


const InwardApplication = require("../models/InwardApplication");
const CitizenAppointment = require("../models/CitizenAppointment"); // ✅ import at top


// ─────────────────────────────────────────────
//  ADD INWARD APPLICATION
// ─────────────────────────────────────────────

const generateToken = async () => {
  const today = new Date();
  const day   = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year  = today.getFullYear();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const count = await InwardApplication.countDocuments({
    createdAt: { $gte: startOfDay }
  });

  const serial = String(count + 1).padStart(3, "0");
  return `VVCMC${day}${month}${year}${serial}`;
};





// exports.addInwardApplication = async (req, res) => {
//   try {
//     const {
//       inwardNo, submissionDate, fullName, mobile, email, wardNo,ward,address,
//       pincode, category, identityType, identityNumber, taluka, district,
//       subject, description, office, mainDepartment, subDepartment, priority,
//       followUp, status,
//       submittedById, submittedByName, submittedByRole, submittedByUserName, submittedByDept,
//     } = req.body;

//     const existingApplication = await InwardApplication.findOne({ inwardNo });
//     if (existingApplication) {
//       return res.status(400).json({ success: false, message: "Inward Number already exists" });
//     }

//     let tagTo = req.body.tagTo || [];
//     if (typeof tagTo === "string") tagTo = [tagTo];

//     const documentPath = req.file ? req.file.path : null;

//     const newApplication = new InwardApplication({
//       inwardNo, submissionDate, fullName, mobile, email, wardNo,ward,address,
//       pincode, category, identityType, identityNumber, taluka, district,
//       subject, description, office, mainDepartment, subDepartment, priority,
//       tagTo, followUp, status, documents: documentPath,
//       submittedById:       submittedById       || "",
//       submittedByName:     submittedByName     || "",
//       submittedByRole:     submittedByRole     || "",
//       submittedByUserName: submittedByUserName || "",
//       submittedByDept:     submittedByDept     || "",
//     });

//     await newApplication.save();

//     res.status(201).json({
//       success: true,
//       message: "Inward Application Added Successfully",
//       data: newApplication,
//     });

//   } catch (error) {
//     console.error("Add Inward Error:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };



exports.addInwardApplication = async (req, res) => {
  try {
    const {
      inwardNo, submissionDate, fullName, mobile, email, wardNo, ward, address,
      pincode, category, identityType, identityNumber, taluka, district,
      subject, description, office, mainDepartment, subDepartment, priority,
      followUp, status,
      submittedById, submittedByName, submittedByRole, submittedByUserName, submittedByDept,
      existingTokenNo,   // ✅ citizen चा existing token
    } = req.body;

    const existingApplication = await InwardApplication.findOne({ inwardNo });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "Inward Number already exists" });
    }

    let tagTo = req.body.tagTo || [];
    if (typeof tagTo === "string") tagTo = [tagTo];

    // const documentPath = req.file ? req.file.path : null;
    // const visitorPhotoPath = req.files?.visitorPhoto?.[0]?.path || null;


    const documentPath     = req.files?.documents?.[0]?.path    || null;
const visitorPhotoPath = req.files?.visitorPhoto?.[0]?.path || null;

    // ✅ Token generate करा
    
    // const tokenNo = await generateToken();
        const tokenNo = existingTokenNo ? existingTokenNo : await generateToken();


    const newApplication = new InwardApplication({
      inwardNo, submissionDate, fullName, mobile, email, wardNo, ward, address,
      pincode, category, identityType, identityNumber, taluka, district,
      subject, description, office, mainDepartment, subDepartment, priority,
      tagTo, followUp, status, documents: documentPath,
      visitorPhoto: visitorPhotoPath,   // ✅ added
      tokenNo, // ✅ add केला
      submittedById:       submittedById       || "",
      submittedByName:     submittedByName     || "",
      submittedByRole:     submittedByRole     || "",
      submittedByUserName: submittedByUserName || "",
      submittedByDept:     submittedByDept     || "",
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Inward Application Added Successfully",
      tokenNo, // ✅ frontend ला पाठवा
      data: newApplication,
    });

  } catch (error) {
    console.error("Add Inward Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

// DB: ["[\"CEO\",\"BDO\"]"] → flat array: ["CEO","BDO"]
// const parseTagTo = (tagTo = []) => {
//   try {
//     const flat = [];
//     for (const item of tagTo) {
//       if (typeof item === "string" && item.trim().startsWith("[")) {
//         const parsed = JSON.parse(item);
//         if (Array.isArray(parsed)) flat.push(...parsed);
//       } else if (item) {
//         flat.push(item);
//       }
//     }
//     return flat;
//   } catch {
//     return tagTo;
//   }
// };

// const isRoleMatch = (userRole = "", tagToList = []) => {
//   const normalizedUserRole = userRole.toLowerCase().trim();
//   return tagToList.some((tag) => {
//     const normalizedTag = tag.toLowerCase().trim();
//     if (normalizedTag === normalizedUserRole)       return true;
//     if (normalizedTag.includes(normalizedUserRole)) return true;
//     if (normalizedUserRole.includes(normalizedTag)) return true;
//     return false;
//   });
// };


// // ─────────────────────────────────────────────
// //  GET ALL APPLICATIONS
// // ─────────────────────────────────────────────
// exports.getAllApplications = async (req, res) => {
//   try {
//     const { role, userId, userOffice, userDepartmentCategory } = req.query;

//     const fullAccessRoles = ["Super Admin"];

//     if (fullAccessRoles.includes(role)) {
//       const applications = await InwardApplication.find({}).sort({ createdAt: -1 });
//       return res.status(200).json({
//         success: true,
//         message: "Applications Fetched Successfully",
//         data: applications,
//       });
//     }

//     const allApps = await InwardApplication.find({}).sort({ createdAt: -1 });

//     const filtered = allApps.filter((app) => {
//       if (userId && app.submittedById === userId) return true;

//       const parsedTagTo  = parseTagTo(app.tagTo);
//       const roleMatch    = role                   ? isRoleMatch(role, parsedTagTo)                                                             : false;
//       const officeMatch  = userOffice             ? app.office?.toLowerCase().trim() === userOffice.toLowerCase().trim()                       : false;
//       const deptCatMatch = userDepartmentCategory ? app.mainDepartment?.toLowerCase().trim() === userDepartmentCategory.toLowerCase().trim()   : false;

//       return roleMatch && officeMatch && deptCatMatch;
//     });

//     res.status(200).json({
//       success: true,
//       message: "Applications Fetched Successfully",
//       data: filtered,
//     });

//   } catch (error) {
//     console.error("Get All Applications Error:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };





// ─────────────────────────────────────────────────────────────
//  Helper: parse tagTo field
//  tagTo is stored as an array that may contain a JSON-stringified
//  inner array, e.g.:
//    ["[\"Special Planning Authority Department HO\",\"Disaster Management Department HO\"]"]
//  OR a plain flat array:
//    ["Special Planning Authority Department HO", "Disaster Management Department HO"]
//  This helper always returns a clean flat string array.
// ─────────────────────────────────────────────────────────────
function parseTagTo(tagTo) {
  if (!Array.isArray(tagTo) || tagTo.length === 0) return [];

  const result = [];

  for (const item of tagTo) {
    if (typeof item === "string") {
      const trimmed = item.trim();

      // Looks like a JSON array string → parse it
      if (trimmed.startsWith("[")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            parsed.forEach((v) => {
              if (typeof v === "string" && v.trim()) result.push(v.trim());
            });
            continue;
          }
        } catch (_) {
          // not valid JSON — fall through and treat as plain string
        }
      }

      if (trimmed) result.push(trimmed);
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────
//  Helper: check if a role keyword exists in the parsed tagTo
//  (kept exactly as before)
// ─────────────────────────────────────────────────────────────
function isRoleMatch(role, parsedTagTo) {
  if (!role || !Array.isArray(parsedTagTo)) return false;
  return parsedTagTo.some(
    (tag) => tag.toLowerCase().trim() === role.toLowerCase().trim()
  );
}

// ─────────────────────────────────────────────────────────────
//  NEW Helper: check if user's departmentName is in tagTo
//  (case-insensitive)
// ─────────────────────────────────────────────────────────────
function isDepartmentTagMatch(userDepartmentName, parsedTagTo) {
  if (!userDepartmentName || !Array.isArray(parsedTagTo)) return false;
  const userDeptLower = userDepartmentName.toLowerCase().trim();
  return parsedTagTo.some(
    (tag) => tag.toLowerCase().trim() === userDeptLower
  );
}

// ─────────────────────────────────────────────────────────────
//  Controller
// ─────────────────────────────────────────────────────────────
// Original
// exports.getAllApplications = async (req, res) => {
//   try {
//     const {
//       role,
//       userId,
//       userOffice,
//       userDepartmentCategory,
//       userDepartmentName,      // ← NEW param sent from frontend
//     } = req.query;

//     // ── Super Admin: full access (unchanged) ──
//     const fullAccessRoles = ["Super Admin"];
//     if (fullAccessRoles.includes(role)) {
//       const applications = await InwardApplication.find({}).sort({ createdAt: -1 });
//       return res.status(200).json({
//         success: true,
//         message: "Applications Fetched Successfully",
//         data: applications,
//       });
//     }

//     // ── All other roles: apply filters ──
//     const allApps = await InwardApplication.find({}).sort({ createdAt: -1 });

//     const filtered = allApps.filter((app) => {
//       // 1. Always show applications submitted by this user
//       if (userId && app.submittedById === userId) return true;

//       const parsedTagTo = parseTagTo(app.tagTo);

//       // 2. Existing filters (unchanged)
//       const roleMatch    = role                   ? isRoleMatch(role, parsedTagTo)                                                           : false;
//       const officeMatch  = userOffice             ? app.office?.toLowerCase().trim() === userOffice.toLowerCase().trim()                     : false;
//       const deptCatMatch = userDepartmentCategory ? app.mainDepartment?.toLowerCase().trim() === userDepartmentCategory.toLowerCase().trim() : false;

//       // 3. NEW: case-insensitive departmentName match against tagTo
//       const deptTagMatch = userDepartmentName
//         ? isDepartmentTagMatch(userDepartmentName, parsedTagTo)
//         : false;

//       // Original condition (unchanged): roleMatch && officeMatch && deptCatMatch
//       // Additional condition (NEW):     deptTagMatch (user's dept is tagged)
//       return (roleMatch && officeMatch && deptCatMatch) || deptTagMatch;
//     });

//     res.status(200).json({
//       success: true,
//       message: "Applications Fetched Successfully",
//       data: filtered,
//     });

//   } catch (error) {
//     console.error("Get All Applications Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };



exports.getAllApplications = async (req, res) => {
  try {
    const {
      role,
      userId,
      userOffice,
      userDepartmentCategory,
      userDepartmentName,      // ← NEW param sent from frontend
      page  = 1,        // ← ADD
      limit = 20,       // ← ADD
    } = req.query;

      const pageNum  = parseInt(page);    // ← ADD
    const limitNum = parseInt(limit);   // ← ADD
    const skip     = (pageNum - 1) * limitNum;  // ← ADD

    // ── Super Admin: full access (unchanged) ──
    const fullAccessRoles = ["Super Admin"];
    if (fullAccessRoles.includes(role)) {
      const total = await InwardApplication.countDocuments({});  // ← ADD
      const applications = await InwardApplication.find({})
      .sort({ createdAt: -1 })
      .skip(skip)       // ← ADD
        .limit(limitNum); // ← ADD
      return res.status(200).json({
        success: true,
        message: "Applications Fetched Successfully",
        data: applications,
        total,                              // ← ADD
        totalPages: Math.ceil(total / limitNum), // ← ADD
        page:       pageNum,                // ← ADD
      });
    }

    // ── All other roles: apply filters ──
    const allApps = await InwardApplication.find({}).sort({ createdAt: -1 });

    const filtered = allApps.filter((app) => {
      // 1. Always show applications submitted by this user
      if (userId && app.submittedById === userId) return true;

      const parsedTagTo = parseTagTo(app.tagTo);

      // 2. Existing filters (unchanged)
      const roleMatch    = role                   ? isRoleMatch(role, parsedTagTo)                                                           : false;
      const officeMatch  = userOffice             ? app.office?.toLowerCase().trim() === userOffice.toLowerCase().trim()                     : false;
      const deptCatMatch = userDepartmentCategory ? app.mainDepartment?.toLowerCase().trim() === userDepartmentCategory.toLowerCase().trim() : false;

      // 3. NEW: case-insensitive departmentName match against tagTo
      const deptTagMatch = userDepartmentName
        ? isDepartmentTagMatch(userDepartmentName, parsedTagTo)
        : false;

      // Original condition (unchanged): roleMatch && officeMatch && deptCatMatch
      // Additional condition (NEW):     deptTagMatch (user's dept is tagged)
      return (roleMatch && officeMatch && deptCatMatch) || deptTagMatch;
    });

    const total     = filtered.length;                          // ← ADD
    const paginated = filtered.slice(skip, skip + limitNum);    // ← ADD

    res.status(200).json({
      success: true,
      message: "Applications Fetched Successfully",
      data:       paginated,       // ← CHANGE: was `filtered`
      total,                       // ← ADD
      totalPages: Math.ceil(total / limitNum), // ← ADD
      page:       pageNum,         // ← ADD
    });

  } catch (error) {
    console.error("Get All Applications Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



// exports.getAllApplications = async (req, res) => {
//   try {
//     const {
//       role,
//       userId,
//       userOffice,
//       userDepartmentCategory,
//       userDepartmentName,
//       page  = 1,
//       limit = 20,
//     } = req.query;

//     const pageNum  = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip     = (pageNum - 1) * limitNum;

//     const fullAccessRoles = ["Super Admin"];
//     if (fullAccessRoles.includes(role)) {
//       const total        = await InwardApplication.countDocuments({});
//       const applications = await InwardApplication.find({})
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limitNum);
//       return res.status(200).json({
//         success: true,
//         message: "Applications Fetched Successfully",
//         data:        applications,
//         total,
//         page:        pageNum,
//         limit:       limitNum,
//         totalPages:  Math.ceil(total / limitNum),
//       });
//     }

//     // All other roles: fetch all, filter, then paginate in memory
//     const allApps = await InwardApplication.find({}).sort({ createdAt: -1 });

//     const filtered = allApps.filter((app) => {
//       if (userId && app.submittedById === userId) return true;
//       const parsedTagTo  = parseTagTo(app.tagTo);
//       const roleMatch    = role                   ? isRoleMatch(role, parsedTagTo)                                                           : false;
//       const officeMatch  = userOffice             ? app.office?.toLowerCase().trim() === userOffice.toLowerCase().trim()                     : false;
//       const deptCatMatch = userDepartmentCategory ? app.mainDepartment?.toLowerCase().trim() === userDepartmentCategory.toLowerCase().trim() : false;
//       const deptTagMatch = userDepartmentName     ? isDepartmentTagMatch(userDepartmentName, parsedTagTo)                                    : false;
//       return (roleMatch && officeMatch && deptCatMatch) || deptTagMatch;
//     });

//     const total     = filtered.length;
//     const paginated = filtered.slice(skip, skip + limitNum);

//     res.status(200).json({
//       success:    true,
//       message:    "Applications Fetched Successfully",
//       data:       paginated,
//       total,
//       page:       pageNum,
//       limit:      limitNum,
//       totalPages: Math.ceil(total / limitNum),
//     });

//   } catch (error) {
//     console.error("Get All Applications Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error:   error.message,
//     });
//   }
// };



// ─────────────────────────────────────────────
//  REPLY APPLICATION  →  POST /api/replyApplication
// ─────────────────────────────────────────────
// exports.replyApplication = async (req, res) => {
//   try {
//     const {
//       applicationId,   // _id of InwardApplication
//       replyMessage,    // reply text (required)
//       status,          // new status
//       priority,        // new priority
//       repliedBy,       // userId of admin/minister
//       repliedByName,   // display name
//       repliedByRole,   // role
//     } = req.body;

//     // ── Validation ──
//     if (!applicationId) {
//       return res.status(400).json({ success: false, message: "applicationId is required" });
//     }
//     if (!replyMessage || !replyMessage.trim()) {
//       return res.status(400).json({ success: false, message: "replyMessage is required" });
//     }

//     // ── Application शोधा ──
//     const application = await InwardApplication.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found" });
//     }


//     // ✅ replyDocument file path (if uploaded)
//     // const replyDocumentPath = req.file ? req.file.path : null;
//     const replyDocumentPath = req.files?.replyDocument?.[0]?.path || null;

//     // ── नवीन reply push करा ──
//     const newReply = {
//       replyMessage: replyMessage.trim(),
//       repliedBy:    repliedBy    || "",
//       repliedByName:repliedByName|| "",
//       repliedByRole:repliedByRole|| "",
//       status:       status       || application.status,
//       priority:     priority     || application.priority,
//      replyDocument: replyDocumentPath || "",  // ✅ save file path
 
//     };

//     application.replies.push(newReply);

//     // ── Status आणि Priority update करा ──
//     if (status)   application.status   = status;
//     if (priority) application.priority = priority;

//     await application.save();

//     res.status(200).json({
//       success: true,
//       message: "Reply Added Successfully",
//       data: {
//         applicationId: application._id,
//         inwardNo:      application.inwardNo,
//         status:        application.status,
//         priority:      application.priority,
//         latestReply:   application.replies[application.replies.length - 1],
//         totalReplies:  application.replies.length,
//       },
//     });

//   } catch (error) {
//     console.error("Reply Application Error:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };



exports.replyApplication = async (req, res) => {
  try {
    const { tokenNo } = req.params;  // ✅ from URL like updateAppointmentStatus uses :id

    const {
      replyMessage,
      status,
      priority,
      repliedBy,
      repliedByName,
      repliedByRole,
    } = req.body;

    if (!tokenNo) {
      return res.status(400).json({ success: false, message: "tokenNo is required ❌" });
    }
    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ success: false, message: "replyMessage is required ❌" });
    }

    // ✅ Find InwardApplication by tokenNo (like findByIdAndUpdate pattern)
    const application = await InwardApplication.findOne({ tokenNo });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found ❌" });
    }

    const replyDocumentPath = req.files?.replyDocument?.[0]?.path || null;

    const newReply = {
      replyMessage:  replyMessage.trim(),
      repliedBy:     repliedBy     || "",
      repliedByName: repliedByName || "",
      repliedByRole: repliedByRole || "",
      status:        status        || application.status,
      priority:      priority      || application.priority,
      replyDocument: replyDocumentPath || "",
    };

    application.replies.push(newReply);
    if (status)   application.status   = status;
    if (priority) application.priority = priority;
    await application.save();

    // ✅ Sync CitizenAppointment by tokenId (same as updateAppointmentStatus pattern)
    if (["pending", "approved", "rejected", "expired"].includes(status?.toLowerCase())) {
      await CitizenAppointment.findOneAndUpdate(
        { tokenId: tokenNo },
        {
          status:    status.toLowerCase(),
          adminNote: replyMessage.trim(),
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Reply Added Successfully ✅",
      data: {
        tokenNo:      application.tokenNo,
        status:       application.status,
        priority:     application.priority,
        latestReply:  application.replies[application.replies.length - 1],
        totalReplies: application.replies.length,
      },
    });

  } catch (error) {
    console.error("Reply Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};