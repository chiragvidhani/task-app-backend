const { body, validationResult } = require("express-validator");
const { sendErrorResponse } = require("../errorHandlers/errorHandlers");

const validateRegister = [
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 6 }),
  body("fullName", "Name is required").exists()
];

const validateLogin = [
  body("email", " Enter a valid Email").isEmail(),
  body("password", "Password cannot be blank").exists(),
];

const validatePassword = [
  body("password", "Password cannot be less than 6 character")
    .isLength({ min: 6 })
    .exists(),
];

const extractValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
    }));
  }
  return null;
};

// Function to handle validation errors centrally
const handleValidationErrors = (req, res, next) => {
  const errors = extractValidationErrors(req);
  if (errors) {
    return sendErrorResponse(res, 400, errors);
  }
  next();
};

module.exports = {
  validateRegister,
  handleValidationErrors,
  extractValidationErrors,
  validateLogin,
  validatePassword,
};
