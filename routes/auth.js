const express = require("express");
const { userRegister, userLogin } = require("../controllers/authControllers/authControllers");
const { validateRegister, validateLogin, handleValidationErrors } = require("../helpers/validateUser/validateUser");
const router = express.Router();

router.post("/user/register", validateRegister, handleValidationErrors, userRegister)
router.post("/user/login", validateLogin, handleValidationErrors, userLogin)

module.exports = router;