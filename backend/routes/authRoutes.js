const express = require("express");
const router = express.Router();
const { signup, login,getAllOfficers, resetpassword } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/officers", getAllOfficers);
router.post("/reset-password",resetpassword);


module.exports = router;
