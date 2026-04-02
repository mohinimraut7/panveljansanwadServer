const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  loginByMobile,
  updateUser,
  getUsers,
  deleteUser
} = require("../controllers/user");

// ✅ Register
router.post("/register", registerUser);

// ✅ Login
router.post("/login", loginUser);
router.post("/loginByMobile",loginByMobile);



// ✅ Update user by id
router.patch("/users/:id", updateUser);

router.get("/getUsers", getUsers);

router.delete("/deleteUser/:id",deleteUser);

module.exports = router;
