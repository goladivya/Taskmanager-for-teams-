const taskModel = require("../models/Tasks");

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, deadline, remarks, status = "Pending", createdBy , assignedTo = null} = req.body;

    if (!title || !deadline || !createdBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const taskId = await taskModel.createTask({ title, deadline, remarks, status, createdBy , assignedTo,});
    res.status(201).json({ message: "Task created", taskId });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Get tasks by user
exports.getTasksByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const tasks = await taskModel.getTasksByUser(username);
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.getAssignedTasks = async (req, res) => {
  try {
    const username = req.params.username;
    const tasks = await taskModel.getAssignedTasks(username);
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching assigned tasks:", err);
    res.status(500).json({ error: "Failed to fetch assigned tasks" });
  }
};


exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;
    await taskModel.updateTaskStatus(taskId, status);
    res.status(200).json({ message: "Task status updated" });
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ error: "Failed to update task status" });
  }
};


exports.updateAssignedTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body; 
    await taskModel.updateAssignedTask(taskId, updates);
    res.status(200).json({ message: "Assigned task updated" });
  } catch (err) {
    console.error("Error updating assigned task:", err);
    res.status(500).json({ error: "Failed to update assigned task" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await taskModel.deleteTask(taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};


exports.getAllAssignedTasks = async (req, res) => {
  try {
    const tasksSnapshot = await taskModel.getAllAssignedTasks();
    res.status(200).json(tasksSnapshot);
  } catch (err) {
    console.error("Error fetching all assigned tasks:", err);
    res.status(500).json({ error: "Failed to fetch all assigned tasks" });
  }
};

exports.getCompletedTasksByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const tasks = await taskModel.getCompletedtask(username);
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching completed tasks:", err);
    res.status(500).json({ error: "Failed to fetch completed tasks" });
  }
};


exports.appendWeeklyUpdate = async (req,res)=>{
  const {id} = req.params;
  const{date,text} = req.body;

  if(!text||!date){
     return res.status(400).json({error:"Both 'text' and 'date' are required"})
  }
  try{
    await taskModel.addWeeklyUpdate(id,{date,text});
    res.status(200).json({message:"Weekly update added successfully"});
  }catch(err){
    console.error("error apending weekly update:",err);
    res.status(500).json({error:"Failed to add weekly update"});
  }
};