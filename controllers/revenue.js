  // const uploadExcel = require("../middlewares/uploadExcel");
const Revenue = require("../models/revenue");



//   exports.addRevenueActivity = async (req, res) => {
//     try {

//  let excelName = "";
// let excelUrl = "";


//       const {
//         orderNo,
//         sanctionedOrderDate,
//         disburseAmount,
//         subject,
//         details,
//       } = req.body;

//       if (!orderNo || !disburseAmount) {
//         return res.status(400).json({
//           success: false,
//           message: "orderNo & disburseAmount required ❌",
//         });
//       }



//       let attachmentName = "";
//       let attachmentUrl = "";

//       if (req.file) {
//         attachmentName = req.file.originalname;
//         attachmentUrl = req.file.path || req.file.secure_url;
//       }

//       const spend = Number(disburseAmount);

//       if (spend <= 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid disburse amount ❌",
//         });
//       }

//       // ✅ Find revenue
//       const revenue = await Revenue.findOne({ orderNo });

//       if (!revenue) {
//         return res.status(404).json({
//           success: false,
//           message: "Revenue not found ❌",
//         });
//       }

//       /* ---------- LAST PENDING ---------- */
//       let pendingBefore = revenue.totalRevenue;

//       if (revenue.activities.length > 0) {
//         pendingBefore =
//           revenue.activities[revenue.activities.length - 1].pendingAmount;
//       }

//       if (spend > pendingBefore) {
//         return res.status(400).json({
//           success: false,
//           message: `Insufficient balance ❌ Remaining ₹${pendingBefore}`,
//         });
//       }

//       const pendingAfter = pendingBefore - spend;

//       /* ---------- PUSH ACTIVITY ---------- */
//       // revenue.activities.push({
//       //   orderNo,
//       //   sanctionedOrderDate,
//       //   disburseAmount: spend,
//       //   pendingAmount: pendingAfter,
//       //   subject: subject || "",
//       //   details: details || "",
//       // attachmentName,
//       //   attachmentUrl,
//       //   createdAt: new Date(),
//       // });

//       revenue.activities.push({
//   orderNo,
//   sanctionedOrderDate,
//   disburseAmount: spend,
//   pendingAmount: pendingAfter,
//   subject: subject || "",
//   details: details || "",
//   excelName,
//   excelUrl,
//   attachmentName,
//   attachmentUrl,
//   createdAt: new Date(),
// });

//       await revenue.save();

//       return res.status(201).json({
//         success: true,
//         message: "Activity added successfully ✅",
//         data: {
//           orderNo,
//           pendingAmount: pendingAfter,
//           latestActivity:
//             revenue.activities[revenue.activities.length - 1],
//         },
//       });
//     } catch (error) {
//       console.log("addRevenueActivity error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Server error ❌",
//       });
//     }
//   };



// exports.addRevenueActivity = async (req, res) => {
//   try {
//     let excelName = "";
//     let excelUrl = "";
//     let attachmentName = "";
//     let attachmentUrl = "";

//     const { orderNo, sanctionedOrderDate, disburseAmount, subject, details } = req.body;

//     if (!orderNo || !disburseAmount) {
//       return res.status(400).json({
//         success: false,
//         message: "orderNo & disburseAmount required ❌",
//       });
//     }

//     // ✅ req.files वापरो (fields() मुळे)
//     if (req.files) {
//       if (req.files.attachment?.[0]) {
//         attachmentName = req.files.attachment[0].originalname;
//         attachmentUrl = req.files.attachment[0].secure_url || req.files.attachment[0].path;
//       }

//       if (req.files.excelFile?.[0]) {
//         excelName = req.files.excelFile[0].originalname;
//         excelUrl = req.files.excelFile[0].path;
//       }
//     }

//     const spend = Number(disburseAmount);

//     if (spend <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid disburse amount ❌",
//       });
//     }

//     const revenue = await Revenue.findOne({ orderNo });

//     if (!revenue) {
//       return res.status(404).json({
//         success: false,
//         message: "Revenue not found ❌",
//       });
//     }

//     let pendingBefore = revenue.totalRevenue;

//     if (revenue.activities.length > 0) {
//       pendingBefore = revenue.activities[revenue.activities.length - 1].pendingAmount;
//     }

//     if (spend > pendingBefore) {
//       return res.status(400).json({
//         success: false,
//         message: `Insufficient balance ❌ Remaining ₹${pendingBefore}`,
//       });
//     }

//     const pendingAfter = pendingBefore - spend;

//     revenue.activities.push({
//       orderNo,
//       sanctionedOrderDate,
//       disburseAmount: spend,
//       pendingAmount: pendingAfter,
//       subject: subject || "",
//       details: details || "",
//       attachmentName,
//       attachmentUrl,
//       excelName,
//       excelUrl,
//       createdAt: new Date(),
//     });

//     await revenue.save();

//     return res.status(201).json({
//       success: true,
//       message: "Activity added successfully ✅",
//       data: {
//         orderNo,
//         pendingAmount: pendingAfter,
//         latestActivity: revenue.activities[revenue.activities.length - 1],
//       },
//     });
//   } catch (error) {
//     console.log("addRevenueActivity error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error ❌",
//     });
//   }
// };





// exports.addRevenueActivity = async (req, res) => {
//   try {
//     // let excelName = "";
//     // let excelUrl = "";
//     let attachmentName = "";
//     let attachmentUrl = "";

//     const { orderNo, sanctionedOrderDate, disburseAmount, subject, details } = req.body;

//     if (!orderNo || !disburseAmount) {
//       return res.status(400).json({
//         success: false,
//         message: "orderNo & disburseAmount required ❌",
//       });
//     }

//     // ✅ Handle attachment (from Cloudinary)
//     if (req.files?.attachment?.[0]) {
//       attachmentName = req.files.attachment[0].originalname;
//       attachmentUrl = req.files.attachment[0].secure_url;
//     }

//     // ✅ Handle Excel file (from local disk)
//     // if (req.files?.excelFile?.[0]) {
//     //   excelName = req.files.excelFile[0].originalname;
//     //   const baseUrl = process.env.API_BASE_URL || "http://localhost:5000";
//     //   excelUrl = `${baseUrl}/uploads/excel/${req.files.excelFile[0].filename}`;
//     // }

//     // // ✅ Handle single file upload (when used with .single())
//     // if (req.file && req.file.fieldname === "excelFile") {
//     //   excelName = req.file.originalname;
//     //   const baseUrl = process.env.API_BASE_URL || "http://localhost:5000";
//     //   excelUrl = `${baseUrl}/uploads/excel/${req.file.filename}`;
//     // }

//     const spend = Number(disburseAmount);

//     if (spend <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid disburse amount ❌",
//       });
//     }

//     const revenue = await Revenue.findOne({ orderNo });

//     if (!revenue) {
//       return res.status(404).json({
//         success: false,
//         message: "Revenue not found ❌",
//       });
//     }

//     let pendingBefore = revenue.totalRevenue;

//     if (revenue.activities.length > 0) {
//       pendingBefore = revenue.activities[revenue.activities.length - 1].pendingAmount;
//     }

//     if (spend > pendingBefore) {
//       return res.status(400).json({
//         success: false,
//         message: `Insufficient balance ❌ Remaining ₹${pendingBefore}`,
//       });
//     }

//     const pendingAfter = pendingBefore - spend;

//     revenue.activities.push({
//       orderNo,
//       sanctionedOrderDate,
//       disburseAmount: spend,
//       pendingAmount: pendingAfter,
//       subject: subject || "",
//       details: details || "",
//       attachmentName,
//       attachmentUrl,
//       // excelName,
//       // excelUrl,
//       createdAt: new Date(),
//     });

//     await revenue.save();

//     return res.status(201).json({
//       success: true,
//       message: "Activity added successfully ✅",
//       data: {
//         orderNo,
//         pendingAmount: pendingAfter,
//         latestActivity: revenue.activities[revenue.activities.length - 1],
//       },
//     });
//   } catch (error) {
//     console.log("addRevenueActivity error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error ❌",
//     });
//   }
// };


exports.addRevenueActivity = async (req, res) => {
  try {

    let attachmentName = "";
    let attachmentUrl = "";

    // ✅ ADD THIS
    let excelName = "";
    let excelUrl = "";

    const { orderNo, sanctionedOrderDate, disburseAmount, subject, details } = req.body;

    if (!orderNo || !disburseAmount) {
      return res.status(400).json({
        success: false,
        message: "orderNo & disburseAmount required ❌",
      });
    }

    // ✅ Handle attachment (from Cloudinary)
    if (req.files?.attachment?.[0]) {
      attachmentName = req.files.attachment[0].originalname;
      attachmentUrl = req.files.attachment[0].secure_url;
    }

    // ✅ HANDLE EXCEL (Cloudinary)
    if (req.files?.excelFile?.[0]) {
      excelName = req.files.excelFile[0].originalname;
      excelUrl = req.files.excelFile[0].secure_url;
    }

    const spend = Number(disburseAmount);

    if (spend <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid disburse amount ❌",
      });
    }

    const revenue = await Revenue.findOne({ orderNo });

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: "Revenue not found ❌",
      });
    }

    let pendingBefore = revenue.totalRevenue;

    if (revenue.activities.length > 0) {
      pendingBefore =
        revenue.activities[revenue.activities.length - 1].pendingAmount;
    }

    if (spend > pendingBefore) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance ❌ Remaining ₹${pendingBefore}`,
      });
    }

    const pendingAfter = pendingBefore - spend;

    revenue.activities.push({
      orderNo,
      sanctionedOrderDate,
      disburseAmount: spend,
      pendingAmount: pendingAfter,
      subject: subject || "",
      details: details || "",
      attachmentName,
      attachmentUrl,

      // ✅ ADD THESE TWO
      excelName,
      excelUrl,

      createdAt: new Date(),
    });

    await revenue.save();

    return res.status(201).json({
      success: true,
      message: "Activity added successfully ✅",
      data: {
        orderNo,
        pendingAmount: pendingAfter,
        latestActivity:
          revenue.activities[revenue.activities.length - 1],
      },
    });
  } catch (error) {
    console.log("addRevenueActivity error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};


// --------------------------------------






// exports.addRevenueActivity = async (req, res) => {
//   console.log("req>>>>>>>>>>",req.file)
//     console.log("req>>>>>>>>>>",req.files)
//   try {
//     let excelName = "";
//     let excelUrl = "";
//     let attachmentName = "";
//     let attachmentUrl = "";

//     const { orderNo, sanctionedOrderDate, disburseAmount, subject, details } = req.body;

//     if (!orderNo || !disburseAmount) {
//       return res.status(400).json({
//         success: false,
//         message: "orderNo & disburseAmount required ❌",
//       });
//     }

//     // ✅ Handle attachment (from Cloudinary)
//     if (req.files?.attachment?.[0]) {
//       attachmentName = req.files.attachment[0].originalname;
//       attachmentUrl = req.files.attachment[0].secure_url;
//     }

//     // ✅ Handle Excel file (from local disk)
//     if (req.files?.excelFile?.[0]) {
//       excelName = req.files.excelFile[0].originalname;

      
//       const baseUrl = process.env.API_BASE_URL || "http://localhost:5000";
//       //  const baseUrl = process.env.API_BASE_URL || "https://tribalserver.onrender.com";


// console.log("process.env.API_BASE_URL",process.env.API_BASE_URL)

//       excelUrl = `${baseUrl}/uploads/excel/${req.files.excelFile[0].filename}`;
//     }

//     // ✅ Handle single file upload (when used with .single())
//     if (req.file && req.file.fieldname === "excelFile") {
//       excelName = req.file.originalname;
//       const baseUrl = process.env.API_BASE_URL || "http://localhost:5000";
//       // Use filename if available, otherwise generate from originalname
//       const filename = req.file.filename || req.file.originalname.replace(/\s+/g, '_');
//       excelUrl = `${baseUrl}/uploads/excel/${filename}`;
//     }

//     const spend = Number(disburseAmount);

//     if (spend <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid disburse amount ❌",
//       });
//     }

//     const revenue = await Revenue.findOne({ orderNo });

//     if (!revenue) {
//       return res.status(404).json({
//         success: false,
//         message: "Revenue not found ❌",
//       });
//     }

//     let pendingBefore = revenue.totalRevenue;

//     if (revenue.activities.length > 0) {
//       pendingBefore = revenue.activities[revenue.activities.length - 1].pendingAmount;
//     }

//     if (spend > pendingBefore) {
//       return res.status(400).json({
//         success: false,
//         message: `Insufficient balance ❌ Remaining ₹${pendingBefore}`,
//       });
//     }

//     const pendingAfter = pendingBefore - spend;

//     revenue.activities.push({
//       orderNo,
//       sanctionedOrderDate,
//       disburseAmount: spend,
//       pendingAmount: pendingAfter,
//       subject: subject || "",
//       details: details || "",
//       attachmentName,
//       attachmentUrl,
//       excelName,
//       excelUrl,
//       createdAt: new Date(),
//     });

//     await revenue.save();

//     return res.status(201).json({
//       success: true,
//       message: "Activity added successfully ✅",
//       data: {
//         orderNo,
//         pendingAmount: pendingAfter,
//         latestActivity: revenue.activities[revenue.activities.length - 1],
//       },
//     });
//   } catch (error) {
//     console.log("addRevenueActivity error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error ❌",
//     });
//   }
// };





exports.getFYByOrderNo = async (req, res) => {
  try {
    const { orderNo } = req.params;

    if (!orderNo) {
      return res.status(400).json({
        success: false,
        message: "orderNo required ❌",
      });
    }

    const revenue = await Revenue.findOne(
      { orderNo },
      { financialYear: 1 } // only FY fetch
    );

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: "Order not found ❌",
      });
    }

    return res.status(200).json({
      success: true,
      orderNo,
      financialYear: revenue.financialYear,
    });
  } catch (error) {
    console.log("getFYByOrderNo error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};


/* =====================================================
   GET SANCTIONED ORDER
===================================================== */
exports.getSanctionedOrder = async (req, res) => {
  try {
    const { sanctionedOrderNo } = req.params;

    if (!sanctionedOrderNo) {
      return res.status(400).json({
        success: false,
        message: "sanctionedOrderNo required ❌",
      });
    }

    let query = {};
    if (req.user.role !== "Super Admin") {
      query.userId = req.user.id;
    }

    const revenues = await Revenue.find({
      ...query,
      "activities.sanctionedOrderNo": sanctionedOrderNo,
    }).sort({ createdAt: -1 });

    if (!revenues.length) {
      return res.status(404).json({
        success: false,
        message: "Sanctioned Order No not found ❌",
      });
    }

    const result = revenues.map(rev => {
      const matchedActivity = rev.activities.find(
        a => a.sanctionedOrderNo === sanctionedOrderNo
      );

      return {
        revenueId: rev._id,
        financialYear: rev.financialYear,
        role: rev.role,
        totalRevenue: rev.totalRevenue,
        utilizedAmount: rev.utilizedAmount,
        remainingAmount: rev.remainingAmount,
        activity: matchedActivity,
      };
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("getSanctionedOrder error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};


exports.updateRevenueActivityByOrderNo = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const {
      disburseAmount,
      activityName,
      vendorBeneficiaryDetails,
      disburseDate,
    } = req.body;

    if (!orderNo || !disburseAmount) {
      return res.status(400).json({
        success: false,
        message: "orderNo & disburseAmount required ❌",
      });
    }

    const spend = Number(disburseAmount);

    if (spend <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid disburse amount ❌",
      });
    }

    // ✅ Find revenue
    const revenue = await Revenue.findOne({ orderNo });

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: "Revenue not found ❌",
      });
    }

    if (spend > revenue.remainingAmount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance ❌ Remaining ₹${revenue.remainingAmount}`,
      });
    }

    const pendingAfter = revenue.remainingAmount - spend;

    // ✅ Push activity
    revenue.activities.push({
      orderNo,
      disburseAmount: spend,
      pendingAmount: pendingAfter,
      activityName: activityName || "",
      vendorBeneficiaryDetails: vendorBeneficiaryDetails || "",
      billUcUpload: req.file ? req.file.path : "",
      disburseDate: disburseDate || new Date(),
    });

    // ✅ Update totals
    revenue.utilizedAmount += spend;
    revenue.remainingAmount = pendingAfter;

    await revenue.save();

    return res.status(200).json({
      success: true,
      message: "Amount disbursed successfully ✅",
      data: {
        orderNo,
        disbursedAmount: spend,
        remainingAmount: pendingAfter,
      },
    });
  } catch (error) {
    console.log("updateRevenueActivityByOrderNo error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

/* =====================================================
   GET REVENUE
===================================================== */
exports.getRevenue = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "Super Admin") {
      query.userId = req.user.id;
    }

    const data = await Revenue.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("GET revenue error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =====================================================
   ADD REVENUE
===================================================== */
exports.addRevenue = async (req, res) => {
  try {
    const { orderNo,totalRevenue, financialYear, role, departmentName } = req.body;

    if (!totalRevenue || !financialYear || !role) {
      return res.status(400).json({
        success: false,
        message: "totalRevenue, role required ❌",
      });
    }



    const alreadyExists = await Revenue.findOne({
      orderNo,
      financialYear,
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message:
          `Order No ${orderNo} already exists for FY ${financialYear} ❌`,
      });
    }


    let attachmentName = "";
    let attachmentUrl = "";

    if (req.file) {
      attachmentName = req.file.originalname;
      attachmentUrl = req.file.path;
    }

    const newRevenue = await Revenue.create({
      userId: req.user.id,
      orderNo:orderNo,
      totalRevenue: Number(totalRevenue),
      financialYear,
      departmentName,
      role,
      attachmentName,
      attachmentUrl,
      utilizedAmount: 0,
      remainingAmount: Number(totalRevenue),
    });

    return res.status(201).json({
      success: true,
      message: "Revenue saved ✅",
      data: newRevenue,
    });
  } catch (error) {
    console.log("POST revenue error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

