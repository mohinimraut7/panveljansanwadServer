const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema(
  {
    orderNo: {
          type: String,
      },
    totalRevenue: {
      type: Number,
      required: true,
    },
    
    departmentName:{
      type: String
     
    },

    
    financialYear:{
      type: String,
      required: true,
    },

    
    // date: {
    //   type: String,
      
    // },

   
    role: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Logged in user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // ✅ Attachment info
    attachmentName: {
      type: String,
      default: "",
    },

    // ✅ Uploaded file path
    attachmentUrl: {
      type: String,
      default: "",
    },

    // ADD THESE TWO FIELDS
        // excelName: {
        //   type: String,
        //   default: "",
        // },
        // excelUrl: {
        //   type: String,
        //   default: "",
        // },

    // 🆕 ACTIVITIES ARRAY (inside revenue itself)
    activities: [
      {
         orderNo: {
          type: String,
        },
        // sanctionedOrderNo: {
        //   type: String,
        // },
        sanctionedOrderDate: {
          type: Date,
          required: true,
        },

        amountSanctioned: {
          type: Number,
        },
         disburseAmount: {
          type: Number,
        },
          disburseDate: {
         type: Date,
           default: Date.now,   // ✅ optional, fallback
        },
          subject: {
            type: String,
            default: "",
          },

           pendingAmount: {          // ✅ THIS WAS MISSING
      type: Number,
    },

        details: {
          type: String,
          default: "",
        },

        billUcUpload: {
          type: String, // file path
          // required: true,
        },

        attachmentName: {
  type: String,
  default: "",
},
attachmentUrl: {
  type: String,
  default: "",
},

    excelName: { type: String, default: "" },
    excelUrl: { type: String, default: "" },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("revenue", revenueSchema);

