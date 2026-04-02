// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder: "jan-sanwad/mayor-applications",
//         resource_type: "raw",
//         access_mode: "public",
//          format: "pdf",                    // ✅ force .pdf extension in URL
//         flags: "attachment:false",        // ✅ open in browser instead of download
//         content_type: "application/pdf",
//         public_id: "inward_pdf_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//       };
//     }
//     return {
//       folder: "janata-darbar/inward-applications",
//       resource_type: "image",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//       public_id: "inward_img_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg","image/jpg","image/png","image/webp","application/pdf"];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
// };

// const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } });

// // ✅ Single export only
// module.exports = upload.fields([
//   { name: "documents",    maxCount: 1 },
//   { name: "visitorPhoto", maxCount: 1 },
//    { name: "replyDocument", maxCount: 1 },  // ✅ NEW
// ]);





const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
   if (file.mimetype === "application/pdf") {
  return {
    folder: "panveljanSanwad/mayor-applications",
    resource_type: "raw",        // ✅ back to raw
    access_mode: "public",
    public_id: "inward_pdf_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
  };
}
    return {
      folder: "panveljanSanwad/mayor-applications",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [
        { width: 1000, height: 1000, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
      public_id: "inward_img_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg","image/jpg","image/png","image/webp","application/pdf"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } });

module.exports = upload.fields([
  { name: "documents",     maxCount: 1 },
  { name: "visitorPhoto",  maxCount: 1 },
  { name: "replyDocument", maxCount: 1 },
]);