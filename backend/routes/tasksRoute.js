const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/add", taskController.createTask);
router.get("/user/:username", taskController.getTasksByUser);
router.patch("/status/:id", taskController.updateTaskStatus);
router.delete("/delete/:id", taskController.deleteTask);
router.get("/assigned/:username", taskController.getAssignedTasks);
router.patch("/assigned/:id", taskController.updateAssignedTask);
router.get("/assigned-tasks", taskController.getAllAssignedTasks);
router.get("/assigned/:username/done", taskController.getCompletedTasksByUser);
router.patch("/weekly/:id", taskController.appendWeeklyUpdate);

module.exports = router;
