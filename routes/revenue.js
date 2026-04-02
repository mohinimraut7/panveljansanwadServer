// const express = require("express");
// const router = express.Router();

// const { getRevenue, addRevenue,addRevenueActivity,getSanctionedOrder,updateRevenueActivityByOrderNo,getFYByOrderNo} = require("../controllers/revenue");
// const uploadRevenue = require("../middlewares/uploadRevenue");
// const authMiddleware = require("../middlewares/auth");
// const uploadExcel = require("../middlewares/uploadExcel");



// // ✅ GET (http://localhost:5000/api/revenue)
// router.get("/revenue",authMiddleware,getRevenue);

// // ✅ POST (http://localhost:5000/api/addRevenue)
// // router.post("/addRevenue",authMiddleware,uploadRevenue.single("attachment"), addRevenue);

// router.post(
//   "/addRevenue",
//   authMiddleware, // ✅ MUST (req.user मिळेल)
//   (req, res, next) => {
//     uploadRevenue.single("attachment")(req, res, (err) => {
//       if (err) {
//         if (err.code === "LIMIT_FILE_SIZE") {
//           return res.status(400).json({
//             success: false,
//             message: "File size जास्त आहे ❌ (Max 50MB allowed)",
//           });
//         }

//         return res.status(400).json({
//           success: false,
//           message: err.message || "File upload failed ❌",
//         });
//       }
//       next();
//     });
//   },
//   addRevenue
// );




// // ================= ADD REVENUE ACTIVITY =================

// // ADD revenue activity
// // router.post(
// //   "/revenue/activity",
// //   authMiddleware,
// //   (req, res, next) => {
// //     uploadRevenue.single("attachment")(req, res, (err) => {
// //       if (err) {
// //         if (err.code === "LIMIT_FILE_SIZE") {
// //           return res.status(400).json({
// //             success: false,
// //             message: "File size जास्त आहे ❌ (Max 50MB allowed)",
// //           });
// //         }

// //         return res.status(400).json({
// //           success: false,
// //           message: err.message || "File upload failed ❌",
// //         });
// //       }
// //       next();
// //     });
// //   },
// //   addRevenueActivity
// // );





// router.post(
//   "/revenue/activity",
//   authMiddleware,

//   // PDF / Image (existing – as it is)
//   (req, res, next) => {
//     uploadRevenue.single("attachment")(req, res, (err) => {
//       if (err) {
//         if (err.code === "LIMIT_FILE_SIZE") {
//           return res.status(400).json({
//             success: false,
//             message: "File size जास्त आहे ❌ (Max 50MB allowed)",
//           });
//         }

//         return res.status(400).json({
//           success: false,
//           message: err.message || "File upload failed ❌",
//         });
//       }
//       next();
//     });
//   },

//   // 🆕 Excel upload (JUST ADD THIS LINE)
//   uploadExcel.single("excelFile"),

//   addRevenueActivity
// );





// router.get("/revenue/:sanctionedOrderNo",authMiddleware,getSanctionedOrder);



// // ================= UPDATE REVENUE ACTIVITY =================
// router.put(
//   "/revenue/activity/:orderNo",
//   authMiddleware,
//   (req, res, next) => {
//     uploadRevenue.single("billUcUpload")(req, res, (err) => {
//       if (err) {
//         if (err.code === "LIMIT_FILE_SIZE") {
//           return res.status(400).json({
//             success: false,
//             message: "File size जास्त आहे ❌ (Max 50MB allowed)",
//           });
//         }
//         return res.status(400).json({
//           success: false,
//           message: err.message || "File upload failed ❌",
//         });
//       }
//       next();
//     });
//   },
//   updateRevenueActivityByOrderNo
// );

// router.get("/revenue/fy/:orderNo", authMiddleware, getFYByOrderNo);


// module.exports = router;



// =====================================



const express = require("express");
const router = express.Router();

const { 
  getRevenue, 
  addRevenue,
  addRevenueActivity,
  getSanctionedOrder,
  updateRevenueActivityByOrderNo,
  getFYByOrderNo
} = require("../controllers/revenue");

const uploadRevenue = require("../middlewares/uploadRevenue");
const authMiddleware = require("../middlewares/auth");
const { handleUploadBoth } = require("../middlewares/uploadBoth");

router.get("/revenue", authMiddleware, getRevenue);

router.post(
  "/addRevenue",
  authMiddleware,
  (req, res, next) => {
    uploadRevenue.single("attachment")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size जास्त आहे ❌ (Max 50MB allowed)",
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message || "File upload failed ❌",
        });
      }
      next();
    });
  },
  addRevenue
);

router.post(
  "/revenue/activity",
  authMiddleware,
  handleUploadBoth,
  addRevenueActivity
);

router.get("/revenue/:sanctionedOrderNo", authMiddleware, getSanctionedOrder);

router.put(
  "/revenue/activity/:orderNo",
  authMiddleware,
  (req, res, next) => {
    uploadRevenue.single("billUcUpload")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size जास्त आहे ❌ (Max 50MB allowed)",
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message || "File upload failed ❌",
        });
      }
      next();
    });
  },
  updateRevenueActivityByOrderNo
);

router.get("/revenue/fy/:orderNo", authMiddleware, getFYByOrderNo);

module.exports = router;
