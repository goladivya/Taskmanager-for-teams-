import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/mytasks.css";
import { toast } from "react-toastify";

export default function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, setEditedTasks] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAssignedTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assigned/${user.username}`);
      setTasks(res.data);

      // Initialize editable state
      const initialEdits = {};
      res.data.forEach((task) => {
        initialEdits[task.id] = {
          status: task.status || "Pending",
          remarks: task.remarks || "",
        };
      });
      setEditedTasks(initialEdits);
    } catch (err) {
     toast.error("Error fetching assigned tasks");
    }
  };

  const handleUpdate = async (taskId) => {
    const { status, remarks } = editedTasks[taskId];
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/assigned/${taskId}`, {
        status,
        remarks,
      });
      fetchAssignedTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleChange = (taskId, field, value) => {
    setEditedTasks((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  return (
    <div className="section" id="assigned-tasks">
      <div className="section-header">
        <h2>Assigned Tasks</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const taskEdits = editedTasks[task.id] || {};
            return (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.deadline}</td>
                <td>
                  <textarea
                    rows={3}
                    value={taskEdits.remarks}
                    onChange={(e) => handleChange(task.id, "remarks", e.target.value)}
                    placeholder="Enter remarks"
                    className="remarks-textarea"
                  />
                </td>
                <td>
                  <select
                    className={`status-select ${taskEdits.status === "In Progress"
                        ? "status-inprogress"
                        : taskEdits.status === "Completed"
                          ? "status-completed"
                          : "status-pending"
                      }`}
                    value={taskEdits.status}
                    onChange={(e) => handleChange(task.id, "status", e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="assign-button"
                    style={{ padding: "8px 14px", fontWeight: "bold" }}
                  >
                    Save
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
