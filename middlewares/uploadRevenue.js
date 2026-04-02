  // const multer = require("multer");
  // const { CloudinaryStorage } = require("multer-storage-cloudinary");
  // const cloudinary = require("../config/cloudinary");

  // // Cloudinary Storage
  // const storage = new CloudinaryStorage({
  //   cloudinary,
  //   params: {
  //     folder: "fund-tracker/revenue",

  //     allowed_formats: ["jpg", "jpeg", "png", "pdf", "webp"],

  //     transformation: [
  //       { width: 1000, height: 1000, crop: "limit" },
  //       { quality: "auto", fetch_format: "auto" }
  //     ],

  //     public_id: (req, file) => {
  //       return (
  //         "revenue_" +
  //         Date.now() +
  //         "_" +
  //         Math.round(Math.random() * 1e9)
  //       );
  //     },
  //   },
  // });

  // // Only allowed files
  // const fileFilter = (req, file, cb) => {
  //   const allowedTypes = [
  //     "image/jpeg",
  //     "image/jpg",
  //     "image/png",
  //     "image/webp",
  //     "application/pdf",
  //   ];

  //   if (allowedTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
  //   }
  // };

  // const uploadRevenue = multer({
  //   storage,
  //   fileFilter,
  //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  // });

  // module.exports = uploadRevenue;

// ======================================================

//   const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // ✅ Cloudinary Storage (PDF vs Image handled separately)
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {

//     // 🔹 PDF → RAW (NO transformation, all pages visible)
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw", // ⭐ MOST IMPORTANT
//         public_id:
//           "revenue_pdf_" +
//           Date.now() +
//           "_" +
//           Math.round(Math.random() * 1e9),
//       };
//     }

//     // 🔹 Images → Image with transformation
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id:
//         "revenue_img_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),
//     };
//   },
// });

// // ✅ File filter remains SAME
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
//   }
// };

// const uploadRevenue = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// module.exports = uploadRevenue;

// =============================

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {

//     // ================= PDF =================
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",

//         // ⭐ IMPORTANT — keeps .pdf extension
//         format: "pdf",

//         // ⭐ keeps readable filename
//         use_filename: true,
//         unique_filename: true,

//         // ⭐ forces browser to treat as PDF
//         content_type: "application/pdf",

//         public_id:
//           "revenue_pdf_" +
//           Date.now() +
//           "_" +
//           Math.round(Math.random() * 1e9),
//       };
//     }

//     // ================= IMAGES =================
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id:
//         "revenue_img_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),
//     };
//   },
// });

// // ✅ SAME filter (no change)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
//   }
// };

// const uploadRevenue = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// module.exports = uploadRevenue;


// ========================================

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {

//     // ================= PDF =================
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",

//         // ⭐ IMPORTANT — keeps .pdf extension
//         format: "pdf",

//         // ⭐ keeps readable filename
//         use_filename: true,
//         unique_filename: true,

//         // ⭐ forces browser to treat as PDF
//         content_type: "application/pdf",

//         public_id:
//           "revenue_pdf_" +
//           Date.now() +
//           "_" +
//           Math.round(Math.random() * 1e9),
//       };
//     }

//     // ================= IMAGES =================
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id:
//         "revenue_img_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),
//     };
//   },
// });

// // ✅ SAME filter (no change)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
//   }
// };

// const uploadRevenue = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// module.exports = uploadRevenue;

// ============================================

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {

//     // ================= PDF =================
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",

//           access_mode: "public",


//         // ✅ keep pdf extension
//         format: "pdf",

//         // ✅ FORCE DOWNLOAD (THIS FIXES ERROR)
//         flags: "attachment",

//         // optional (can keep)
//         content_type: "application/pdf",

//         public_id:
//           "revenue_pdf_" +
//           Date.now() +
//           "_" +
//           Math.round(Math.random() * 1e9),
//       };
//     }

//     // ================= IMAGES =================
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id:
//         "revenue_img_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),
//     };
//   },
// });

// // ✅ SAME filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
//   }
// };

// const uploadRevenue = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// module.exports = uploadRevenue;


// ========================================


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    // ================= PDF =================
    if (file.mimetype === "application/pdf") {
      return {
        folder: "panveljanSanwad/mayor-applications",
        resource_type: "raw",

        // ⭐ VERY IMPORTANT
        access_mode: "public",

        // ⭐ DO NOT FORCE ATTACHMENT
        content_type: "application/pdf",

        public_id:
          "revenue_pdf_" +
          Date.now() +
          "_" +
          Math.round(Math.random() * 1e9),
      };
    }



//     if (file.mimetype === "application/pdf") {
//   return {
//     folder: "fund-tracker/revenue",
//     resource_type: "raw",
//     access_mode: "public",
//     content_type: "application/pdf",

//     // ⭐ .pdf extension compulsory
//     public_id:
//       "revenue_pdf_" +
//       Date.now() +
//       "_" +
//       Math.round(Math.random() * 1e9) +
//       ".pdf",
//   };
// }




    // ================= IMAGES =================
    return {
      folder: "panveljanSanwad/mayor-applications",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [
        { width: 1000, height: 1000, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
      public_id:
        "revenue_img_" +
        Date.now() +
        "_" +
        Math.round(Math.random() * 1e9),
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
  }
};

const uploadRevenue = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = uploadRevenue;


// =============================


// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {

//     // ================= PDF =================
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",

//         // ⭐ REQUIRED
//         access_mode: "public",
//         content_type: "application/pdf",

//         // ✅ ADD .pdf HERE (THIS FIXES DOWNLOAD EXTENSION)
//         public_id:
//           "revenue_pdf_" +
//           Date.now() +
//           "_" +
//           Math.round(Math.random() * 1e9) +
//           ".pdf",
//       };
//     }

//     // ================= IMAGES =================
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id:
//         "revenue_img_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
//   }
// };

// const uploadRevenue = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// module.exports = uploadRevenue;


// ==========================


// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {

//     // ================= PDF =================
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "fund-tracker/revenue",
//         resource_type: "raw",

//         // ✅ REQUIRED for public access
//         access_mode: "public",

//         // ✅ correct mime
//         content_type: "application/pdf",

//         // ✅ keep .pdf extension for download
//         public_id:
//           "revenue_pdf_" +
//           Date.now() +
//           "_" +
//           Math.round(Math.random() * 1e9) +
//           ".pdf",
//       };
//     }

//     // ================= IMAGES =================
//     return {
//       folder: "fund-tracker/revenue",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id:
//         "revenue_img_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),
//     };
//   },
// });

// // ✅ File filter (correct)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
//   }
// };

// const uploadRevenue = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// module.exports = uploadRevenue;


