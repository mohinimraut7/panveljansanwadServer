
const mongoose = require("mongoose");

// ── Reply Schema ──
const replySchema = new mongoose.Schema(
  {
    replyMessage: { type: String},
    repliedBy:    { type: String, default: "" },   // userId
    repliedByName:{ type: String, default: "" },   // user name
    repliedByRole:{ type: String, default: "" },   // role
    status:       { type: String, default: "" },   // status at time of reply
    priority:     { type: String, default: "" },   // priority at time of reply
    replyDocument: { type: String, }, 
  },
  { timestamps: true }
);

const inwardApplicationSchema = new mongoose.Schema(
  {
    tokenNo: {
  type:   String,
  unique: true,
  default: "",
},
    inwardNo: {
      type: String,
      required: true,
      unique: true,
    },

    submissionDate: {
      type: Date,
      required: true,
    },

    // Citizen Details
    fullName: String,
    mobile:   String,
    email:    String,
    wardNo:   String,
     ward:   String,
    address:  String,
    pincode:  String,
    category: String,

    // Identity
    identityType:   String,
    identityNumber: String,
    taluka:         String,
    district:       String,

    // Complaint
    subject:     String,
    description: String,

    // Office & Workflow
    office:          String,
    mainDepartment:  String,
    subDepartment:   String,

    priority: {
      type:    String,
      default: "Normal",
    },

    tagTo: [String],

    followUp: {
      type:    String,
      enum:    ["Yes", "No"],
      default: "Yes",
    },

    status: {
      type:    String,
      default: "Pending",
    },

    documents: {
      type: String, // file path
    },
      visitorPhoto: {
      type: String, // file path
    },


    // ── Submitted By (authUser) ──
    submittedById:       { type: String, default: "" },
    submittedByName:     { type: String, default: "" },
    submittedByRole:     { type: String, default: "" },
    submittedByUserName: { type: String, default: "" },
    submittedByDept:     { type: String, default: "" },

    // ── Replies ──
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("InwardApplication", inwardApplicationSchema);