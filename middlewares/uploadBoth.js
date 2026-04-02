// const multer = require("multer");
// const path = require("path");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // ✅ CLOUDINARY - PDF/Image
// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",
//         access_mode: "public",
//         content_type: "application/pdf",
//         public_id: "revenue_pdf_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//       };
//     }

//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       public_id: "revenue_img_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// // ✅ LOCAL DISK - Excel
// const localStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/excel");
//   },
//   filename: (req, file, cb) => {
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, unique + path.extname(file.originalname));
//   },
// });

// // ✅ FILE FILTER
// const fileFilter = (req, file, cb) => {
//   const allowedPDF = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
//   const allowedExcel = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];

//   if (file.fieldname === "attachment" && allowedPDF.includes(file.mimetype)) {
//     cb(null, true);
//   } else if (file.fieldname === "excelFile" && allowedExcel.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type ❌"), false);
//   }
// };

// // ✅ CUSTOM STORAGE (conditionally choose storage)
// const storage = {
//   _storage: null,
//   _fileFilter: null,

//   _chooseStorage(file) {
//     if (file.fieldname === "attachment") {
//       return cloudinaryStorage;
//     }
//     return multer.diskStorage({
//       destination: localStorage._destination,
//       filename: localStorage._filename,
//     });
//   },

//   _resolveFromRequest(req, file, callback) {
//     const chosenStorage = this._chooseStorage(file);
//     return chosenStorage._resolveFromRequest(req, file, callback);
//   },
// };

// const uploadBoth = multer({
//   storage: multer.memoryStorage(), // मेमोरी में रख के बाद decide करेंगे
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// });

// module.exports = { uploadBoth, cloudinaryStorage, localStorage };



// ===============================




// const multer = require("multer");
// const path = require("path");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");

// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",
//         access_mode: "public",
//         public_id: "revenue_pdf_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//       };
//     }
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       public_id: "revenue_img_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedPDF = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
//   const allowedExcel = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];

//   if (file.fieldname === "attachment" && allowedPDF.includes(file.mimetype)) {
//     cb(null, true);
//   } else if (file.fieldname === "excelFile" && allowedExcel.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error(`Invalid file type ❌`), false);
//   }
// };

// const uploadBoth = multer({
//   storage: multer.memoryStorage(),
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// });

// const handleUploadBoth = (req, res, next) => {
//   uploadBoth.fields([
//     { name: "attachment", maxCount: 1 },
//     { name: "excelFile", maxCount: 1 },
//   ])(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({
//         success: false,
//         message: err.message || "File upload failed ❌",
//       });
//     }

//     // if (req.files?.excelFile?.[0]) {
//     //   try {
//     //     const excelFile = req.files.excelFile[0];
//     //     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     //     const filename = unique + path.extname(excelFile.originalname);
        
//     //     if (!fs.existsSync("uploads/excel")) {
//     //       fs.mkdirSync("uploads/excel", { recursive: true });
//     //     }
        
//     //     fs.writeFileSync(`uploads/excel/${filename}`, excelFile.buffer);
//     //     req.files.excelFile[0].path = `/uploads/excel/${filename}`;
//     //   } catch (err) {
//     //     console.error("Excel save error:", err);
//     //   }
//     // }


//     // ---------------------------------


//     if (req.files?.excelFile?.[0]) {
//   try {
//     const excelFile = req.files.excelFile[0];
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const filename = unique + path.extname(excelFile.originalname);
    
//     if (!fs.existsSync("uploads/excel")) {
//       fs.mkdirSync("uploads/excel", { recursive: true });
//     }
    
//     fs.writeFileSync(`uploads/excel/${filename}`, excelFile.buffer);
//     req.files.excelFile[0].filename = filename;
//   } catch (err) {
//     console.error("Excel save error:", err);
//   }
// }


//     if (req.files?.attachment?.[0]) {
//       try {
//         const file = req.files.attachment[0];
//         return new Promise((resolve) => {
//           const stream = cloudinary.uploader.upload_stream(
//             {
//               folder: "fund-tracker/revenue",
//               resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
//               access_mode: "public",
//             },
//             (error, result) => {
//               if (error) {
//                 return res.status(400).json({
//                   success: false,
//                   message: "Cloudinary upload failed ❌",
//                 });
//               }
//               req.files.attachment[0].secure_url = result.secure_url;
//               next();
//               resolve();
//             }
//           );
//           stream.end(file.buffer);
//         });
//       } catch (err) {
//         return res.status(400).json({
//           success: false,
//           message: err.message,
//         });
//       }
//     } else {
//       next();
//     }
//   });
// };

// module.exports = { handleUploadBoth };



// =======================




// const multer = require("multer");
// const path = require("path");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");

// // Cloudinary storage for PDF/Images only
// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const timestamp = Date.now();
//     const random = Math.round(Math.random() * 1e9);

//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue/attachments",
//         resource_type: "raw",
//         access_mode: "public",
//         public_id: `pdf_${timestamp}_${random}`,
//       };
//     }

//     return {
//       folder: "fund-tracker/revenue/attachments",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       access_mode: "public",
//       public_id: `image_${timestamp}_${random}`,
//     };
//   },
// });

// // Local disk storage for Excel files
// const excelStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(process.cwd(), "uploads/excel");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const filename = unique + path.extname(file.originalname);
//     cb(null, filename);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedAttachment = [
//     "application/pdf",
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//   ];
//   const allowedExcel = [
//     "application/vnd.ms-excel",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     "text/csv",
//   ];

//   if (file.fieldname === "attachment" && allowedAttachment.includes(file.mimetype)) {
//     cb(null, true);
//   } else if (file.fieldname === "excelFile" && allowedExcel.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error(`Invalid file type ❌`), false);
//   }
// };

// const uploadAttachment = multer({
//   storage: cloudinaryStorage,
//   fileFilter: (req, file, cb) => fileFilter(req, { ...file, fieldname: "attachment" }, cb),
//   limits: { fileSize: 50 * 1024 * 1024 },
// });

// const uploadExcel = multer({
//   storage: excelStorage,
//   fileFilter: (req, file, cb) => fileFilter(req, { ...file, fieldname: "excelFile" }, cb),
//   limits: { fileSize: 50 * 1024 * 1024 },
// });

// const handleUploadBoth = (req, res, next) => {
//   const uploadAttachmentMiddleware = uploadAttachment.single("attachment");
//   const uploadExcelMiddleware = uploadExcel.single("excelFile");

//   uploadAttachmentMiddleware(req, res, (err1) => {
//     if (err1) {
//       return res.status(400).json({
//         success: false,
//         message: err1.message || "Attachment upload failed ❌",
//       });
//     }

//     uploadExcelMiddleware(req, res, (err2) => {
//       if (err2) {
//         return res.status(400).json({
//           success: false,
//           message: err2.message || "Excel file upload failed ❌",
//         });
//       }

//       // Convert local path to URL
//       if (req.file && req.file.fieldname === "excelFile") {
//         const baseUrl = process.env.API_BASE_URL || "http://localhost:5000";
//         req.file.secure_url = `${baseUrl}/uploads/excel/${req.file.filename}`;
//       }

//       next();
//     });
//   });
// };

// module.exports = { handleUploadBoth };


// ---------------------------------------------------------



const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype === "application/pdf") {
      return {
        folder: "panveljanSanwad/mayor-applications",
        resource_type: "raw",
        access_mode: "public",
        public_id:
          "revenue_pdf_" +
          Date.now() +
          "_" +
          Math.round(Math.random() * 1e9),
      };
    }
    return {
      folder: "panveljanSanwad/mayor-applications",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id:
        "revenue_img_" +
        Date.now() +
        "_" +
        Math.round(Math.random() * 1e9),
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedPDF = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const allowedExcel = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];

  if (file.fieldname === "attachment" && allowedPDF.includes(file.mimetype)) {
    cb(null, true);
  } else if (
    file.fieldname === "excelFile" &&
    allowedExcel.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type ❌`), false);
  }
};

const uploadBoth = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

const handleUploadBoth = (req, res, next) => {
  uploadBoth.fields([
    { name: "attachment", maxCount: 1 },
    { name: "excelFile", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed ❌",
      });
    }

    // =============================
    // ✅ EXCEL UPLOAD TO CLOUDINARY
    // =============================

    if (req.files?.excelFile?.[0]) {
      try {
        const file = req.files.excelFile[0];

        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "panveljanSanwad/mayor-applications",
              resource_type: "raw", // Excel must be raw
              use_filename: true,   // keep original filename
              unique_filename: false,
              access_mode: "public",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                req.files.excelFile[0].secure_url = result.secure_url;
                resolve(result);
              }
            }
          );

          stream.end(file.buffer);
        });
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Excel upload failed ❌",
        });
      }
    }

    // =============================
    // ✅ ATTACHMENT UPLOAD (UNCHANGED)
    // =============================

    if (req.files?.attachment?.[0]) {
      try {
        const file = req.files.attachment[0];
        return new Promise((resolve) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "panveljanSanwad/mayor-applications",
              resource_type:
                file.mimetype === "application/pdf" ? "raw" : "image",
              access_mode: "public",
            },
            (error, result) => {
              if (error) {
                return res.status(400).json({
                  success: false,
                  message: "Cloudinary upload failed ❌",
                });
              }
              req.files.attachment[0].secure_url = result.secure_url;
              next();
              resolve();
            }
          );
          stream.end(file.buffer);
        });
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    } else {
      next();
    }
  });
};

module.exports = { handleUploadBoth };


