const express = require("express");
const { userRegister, userLogin } = require("../controllers/authControllers/authControllers");
const router = express.Router();

router.post("/user/register", userRegister)
router.post("/user/login", userLogin)

module.exports = router;