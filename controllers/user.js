// const User = require("../models/user");
// const jwt = require("jsonwebtoken");


// // ✅ REGISTER USER
// exports.registerUser = async (req, res) => {
//   try {
//     let { fullName, userName, password, role, departmentName,office,departmentCategory } = req.body;

//     // ✅ sanitize
//     userName = userName?.trim().toLowerCase();
//     fullName = fullName?.trim();
//     departmentName = departmentName?.trim();

//     // ✅ validation
//     if (!fullName || !userName || !password || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required ❌",
//       });
//     }

//     // ✅ username unique check
//     const existingUser = await User.findOne({ userName });

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "Username already exists ❌",
//       });
//     }

//     // ✅ create user
//     const newUser = await User.create({
//       fullName,
//       userName,
//       password,
//       role,
//       departmentName,
//       office,
//       departmentCategory
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User Registered Successfully ✅",
//       user: {
//         id: newUser._id,
//         fullName: newUser.fullName,
//         userName: newUser.userName,
//         role: newUser.role,
//         departmentName: newUser.departmentName,
//         office:newUser.office,
//         departmentCategory:newUser.departmentCategory,
//       },
//     });

//   } catch (error) {
//     console.log("Register Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };



// // ✅ LOGIN USER
// exports.loginUser = async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     // ✅ basic validation
//     if (!userName || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Username आणि Password required आहे ❌",
//       });
//     }

//     // ✅ find user
//     const user = await User.findOne({ userName });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found ❌",
//       });
//     }

//     // ✅ password match
//     if (user.password !== password) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Password ❌",
//       });
//     }

//     // ✅ token generate
//     const token = jwt.sign(
//       {
//         id: user._id,
//         userName: user.userName,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // ✅ login success
//     return res.status(200).json({
//       success: true,
//       message: "Login Success ✅",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         userName: user.userName,
//         role: user.role,
//         departmentName: user.departmentName,
//         office:user.office,
//         departmentCategory: user.departmentCategory,
//       },
//     });

//   } catch (error) {
//     console.log("Login Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };



// // // ✅ UPDATE USER
// // exports.updateUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updatePayload = req.body;

// //     const user = await User.findByIdAndUpdate(id, updatePayload, {
// //       new: true,
// //       runValidators: true,
// //     });

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User Not Found ❌",
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "User Updated ✅",
// //       user,
// //     });

// //   } catch (error) {
// //     console.log("Update Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server Error ❌",
// //     });
// //   }
// // };


// // ✅ UPDATE USER
// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatePayload = req.body;

//     // ✅ Empty body check
//     if (!updatePayload || Object.keys(updatePayload).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Update data required ❌",
//       });
//     }

//     // ✅ Prevent password update from this route
//     delete updatePayload.password;

//     // ✅ Sanitize fields if present
//     if (updatePayload.userName) {
//       updatePayload.userName = updatePayload.userName.trim().toLowerCase();
//     }
//     if (updatePayload.fullName) {
//       updatePayload.fullName = updatePayload.fullName.trim();
//     }
//     if (updatePayload.departmentName) {
//       updatePayload.departmentName = updatePayload.departmentName.trim();
//     }

//     // ✅ Check if userName is already taken (by another user)
//     if (updatePayload.userName) {
//       const existingUser = await User.findOne({
//         userName: updatePayload.userName,
//         _id: { $ne: id },
//       });
//       if (existingUser) {
//         return res.status(409).json({
//           success: false,
//           message: "Username already taken ❌",
//         });
//       }
//     }

//     const user = await User.findByIdAndUpdate(id, updatePayload, {
//       new: true,            // updated document return कर
//       runValidators: true,  // schema validators run कर
//     }).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found ❌",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Updated Successfully ✅",
//       user,
//     });

//   } catch (error) {
//     console.log("Update Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };


// // ✅ GET ALL USERS
// exports.getUsers = async (req, res) => {
//   try {

//     const users = await User.find({})
//       .select("-password")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Users fetched successfully ✅",
//       count: users.length,
//       users,
//     });

//   } catch (error) {
//     console.log("Get Users Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };

// // ✅ DELETE USER
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found ❌",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Deleted Successfully ✅",
//       deletedUser: {
//         id: user._id,
//         fullName: user.fullName,
//         userName: user.userName,
//         role: user.role,
//       },
//     });

//   } catch (error) {
//     console.log("Delete Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };

// =========================

const User = require("../models/user");
const jwt = require("jsonwebtoken");


// // ✅ REGISTER USER
// exports.registerUser = async (req, res) => {
//   try {
//     let { fullName, userName, password, role, departmentName, office, departmentCategory } = req.body;

//     userName = userName?.trim().toLowerCase();
//     fullName = fullName?.trim();
//     departmentName = departmentName?.trim();

//     if (!fullName || !userName || !password || !role) {
//       return res.status(400).json({ success: false, message: "All fields required ❌" });
//     }

//     const existingUser = await User.findOne({ userName });
//     if (existingUser) {
//       return res.status(409).json({ success: false, message: "Username already exists ❌" });
//     }

//     const newUser = await User.create({
//       fullName, userName, password, role, departmentName, office, departmentCategory
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User Registered Successfully ✅",
//       user: {
//         id: newUser._id,
//         fullName: newUser.fullName,
//         userName: newUser.userName,
//         role: newUser.role,
//         departmentName: newUser.departmentName,
//         office: newUser.office,
//         departmentCategory: newUser.departmentCategory,
//       },
//     });

//   } catch (error) {
//     console.log("Register Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


// ✅ REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    let { fullName, userName, mobileNumber, email, password,departmentName} = req.body;

    // Trim & normalize
    fullName     = fullName?.trim();
    userName     = userName?.trim().toLowerCase();
    mobileNumber = mobileNumber?.trim();
    email = email?.trim().toLowerCase();
    departmentName = departmentName?.trim();  // <-- use departmentName, not email

    // Validation
    if (!fullName || !userName || !mobileNumber || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required ❌",
      });
    }

    // Mobile number format check (10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number ❌ (10 digits required)",
      });
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address ❌",
      });
    }

    // Check duplicate userName
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(409).json({
        success: false,
        message: "Username already exists ❌",
      });
    }

    // Check duplicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered ❌",
      });
    }

    // Check duplicate mobile
    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already registered ❌",
      });
    }

    // Create user
    const newUser = await User.create({
      fullName,
      userName,
      mobileNumber,
      email,
      password,
      departmentName
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully ✅",
      user: {
        id:           newUser._id,
        fullName:     newUser.fullName,
        userName:     newUser.userName,
        mobileNumber: newUser.mobileNumber,
        email:        newUser.email,
        departmentName:newUser.departmentName
      },
    });

  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
    });
  }
};


// ✅ LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ success: false, message: "Username आणि Password required आहे ❌" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found ❌" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid Password ❌" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ── office आणि departmentCategory पण return करा ──
    return res.status(200).json({
      success: true,
      message: "Login Success ✅",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        role: user.role,
        departmentName: user.departmentName,
        office: user.office,                         // ← ADD
        departmentCategory: user.departmentCategory, // ← ADD
      },
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


// ✅ LOGIN BY MOBILE (OTP verified → find user → return token)
// exports.loginByMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number required ❌",
//       });
//     }

//     // मोबाईल number DB मध्ये mobileNumber field मध्ये आहे
//     const user = await User.findOne({ mobileNumber: mobileNo.trim() });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "हे mobile number नोंदणीकृत नाही ❌",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.userName, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "OTP Login Success ✅",
//       token,
//       user: {
//         id:                 user._id,
//         fullName:           user.fullName,
//         userName:           user.userName,
//         role:               user.role,
//         departmentName:     user.departmentName,
//         office:             user.office,
//         departmentCategory: user.departmentCategory,
//       },
//     });

//   } catch (error) {
//     console.log("LoginByMobile Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };

// 📁 userController.js मध्ये loginByMobile हे replace करा

exports.loginByMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    console.log("📱 loginByMobile called:", mobileNo);

    if (!mobileNo) {
      return res.status(400).json({ success: false, message: "Mobile number required ❌" });
    }

    const trimmed = mobileNo.toString().trim();

    // mobileNumber OR mobileno — दोन्ही try करतो
    let user = await User.findOne({
      $or: [
        { mobileNumber: trimmed },
        { mobileno: trimmed },
        { mobile: trimmed },
        { phone: trimmed },
      ]
    });

    console.log("🔍 User found:", user ? user.userName : "NOT FOUND");

    // ✅ User नसला तर auto-register करतो
    if (!user) {
      console.log("🆕 User not found — auto registering:", trimmed);

      user = await User.create({
        mobileNumber: trimmed,
        mobileno: trimmed,
        mobile: trimmed,
        userName: `user_${trimmed.slice(-4)}`,   // शेवटचे 4 digits username
        fullName: `User ${trimmed.slice(-4)}`,
        role: "User",
        departmentName: "",
        office: "",
        departmentCategory: "",
      });

      console.log("✅ Auto-registered user:", user.userName);
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP Login Success ✅",
      token,
      user: {
        id:                 user._id,
        fullName:           user.fullName,
        userName:           user.userName,
        role:               user.role,
        departmentName:     user.departmentName,
        office:             user.office,
        departmentCategory: user.departmentCategory,
      },
    });

  } catch (error) {
    console.log("LoginByMobile Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};

// ✅ UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    if (!updatePayload || Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ success: false, message: "Update data required ❌" });
    }

    // Never allow password update from this route
    delete updatePayload.password;

    // Trim & normalize
    if (updatePayload.fullName)     updatePayload.fullName     = updatePayload.fullName.trim();
    if (updatePayload.userName)     updatePayload.userName     = updatePayload.userName.trim().toLowerCase();
    if (updatePayload.mobileNumber) updatePayload.mobileNumber = updatePayload.mobileNumber.trim();
    if (updatePayload.email)        updatePayload.email        = updatePayload.email.trim().toLowerCase();

    // Mobile format check
    if (updatePayload.mobileNumber && !/^\d{10}$/.test(updatePayload.mobileNumber)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number ❌ (10 digits required)" });
    }

    // Email format check
    if (updatePayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatePayload.email)) {
      return res.status(400).json({ success: false, message: "Invalid email address ❌" });
    }

    // Check duplicate userName
    if (updatePayload.userName) {
      const existing = await User.findOne({ userName: updatePayload.userName, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Username already taken ❌" });
      }
    }

    // Check duplicate email
    if (updatePayload.email) {
      const existing = await User.findOne({ email: updatePayload.email, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Email already registered ❌" });
      }
    }

    // Check duplicate mobileNumber
    if (updatePayload.mobileNumber) {
      const existing = await User.findOne({ mobileNumber: updatePayload.mobileNumber, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Mobile number already registered ❌" });
      }
    }

    const user = await User.findByIdAndUpdate(id, updatePayload, {
      new: true, runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found ❌" });
    }

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully ✅",
      user,
    });

  } catch (error) {
    console.log("Update Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


// ✅ GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully ✅",
      count: users.length,
      users,
    });
  } catch (error) {
    console.log("Get Users Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


// ✅ DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found ❌" });
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully ✅",
      deletedUser: {
        id:           user._id,
        fullName:     user.fullName,
        userName:     user.userName,
        mobileNumber: user.mobileNumber,
        email:        user.email,
      },
    });

  } catch (error) {
    console.log("Delete Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


