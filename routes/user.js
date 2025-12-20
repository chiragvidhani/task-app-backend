const express = require("express");
const { getProfile } = require("../controllers/userControllers/userControllers");
const checkToken = require("../helpers/checkToken/checkToken");
const { getTask, createTask, editTask, deleteTask, getTaskSummary } = require("../controllers/taskControllers/taskControllers");
const router = express.Router();

router.get("/getProfile", checkToken, getProfile);
router.get("/getTask", checkToken, getTask);
router.post("/createTask", checkToken, createTask);
router.put("/editTask", checkToken, editTask);
router.delete("/deleteTask", checkToken, deleteTask);
router.get("/getTaskSummary", checkToken, getTaskSummary)

module.exports = router;