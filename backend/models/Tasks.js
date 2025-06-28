const { db } = require("../firebase/firebaseAdmin");

exports.createTask = async ({ title, deadline, remarks, status, createdBy, assignedTo = null }) => {
  const doc = await db.collection("tasks").add({
    title,
    deadline,
    remarks,
    status,
    createdBy,
    assignedTo,
    weeklyUpdates :[],
    createdAt: new Date()
  });

  return doc.id;
};


exports.getTasksByUser = async (username) => {
  const snapshot = await db.collection("tasks")
    .where("createdBy", "==", username)
    .where("assignedTo", "==", null)
    .orderBy("deadline")
    .limit(20)
    //.orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.updateTaskStatus = async (taskId, status) => {
  await db.collection("tasks").doc(taskId).update({ status });
};


exports.deleteTask = async (taskId) => {
  await db.collection("tasks").doc(taskId).delete();
};

exports.getAssignedTasks = async (username) => {
  const snapshot = await db.collection("tasks")
    .where("assignedTo", "==", username)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

};

exports.updateAssignedTask = async (taskId, updates) => {
  await db.collection("tasks").doc(taskId).update(updates);
};

exports.getAllAssignedTasks = async () => {
  const snapshot = await db.collection("tasks")
    .where("assignedTo", "!=", null) // Get tasks with assigned officers
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


exports.getCompletedtask = async (username) => {
  const assignedQuery = db.collection("tasks")
    .where("assignedTo", "==", username)
    .where("status", "==", "Completed");

  const createdQuery = db.collection("tasks")
    .where("createdBy", "==", username)
    .where("status", "==", "Completed");

  const [assignedSnapshot, createdSnapshot] = await Promise.all([
    assignedQuery.get(),
    createdQuery.get()
  ]);

  const assignedTasks = assignedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const createdTasks = createdSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


  const allTasks = [...assignedTasks, ...createdTasks];
  const uniqueTasks = Array.from(new Map(allTasks.map(task => [task.id, task])).values());

  return uniqueTasks;
};



exports.addWeeklyUpdate = async(taskId,newUpdate)=>{
  const taskRef = db.collection("tasks").doc(taskId);
  const taskDoc = await taskRef.get();

  if(!taskDoc.exists) throw new Error("Task not found");
  const taskData = taskDoc.data();
  const currentUpdates = taskData.weeklyUpdates||[];
   
  const updated = [...currentUpdates,newUpdate];
  await taskRef.update({weeklyUpdates:updated});
};