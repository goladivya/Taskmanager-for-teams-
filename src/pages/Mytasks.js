import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/mytasks.css";
import { toast } from "react-toastify";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [weeklyInput, setWeeklyInput] = useState({});
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [selectedTaskForWeekly, setSelectedTaskForWeekly] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${user.username}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };


  const handleDeadlineUpdate = async (taskId, updateDate) => {
    try {
      await axios.patch(`http://localhost:5000/api/assigned/${taskId}`, {
        deadline: updateDate,
      });
      toast.success("Deadline updated");
      await fetchTasks();
    } catch (err) {
      toast.error("Failed to update deadline");
    }
  };

  const handleAddTask = async () => {
    if (!title || !deadline) {
      toast.warn("Please enter title and deadline");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/add", {
        title,
        deadline,
        remarks,
        status,
        createdBy: user.username,
      });

      setTitle("");
      setDeadline("");
      setRemarks("");
      setStatus("Pending");
      fetchTasks();
      toast.success("Task added!");
    } catch (err) {
      console.error("Error adding task:", err.response || err);
      toast.error("Failed to add task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/status/${taskId}`, { status: newStatus });
      setTasks(prev => prev.map(task => (task.id === taskId ? { ...task, status: newStatus } : task)));
    } catch (err) {
      console.error("Error updating status:", err.response || err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/delete/${taskId}`);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task", err.response || err);
      toast.error("Failed to delete the task");
    }
  };

  const handleAddWeeklyWork = async (taskId, currentList, newEntryRaw) => {
    const newEntry = newEntryRaw?.trim?.() || "";
    if (!newEntry.trim()) return;

    const newUpdate = {
      date: new Date().toISOString().slice(0, 10),
      text: newEntry
    };

    try {
      await axios.patch(`http://localhost:5000/api/weekly/${taskId}`, newUpdate, {
        headers: { "Content-Type": "application/json" },
      });
      setWeeklyInput(prev => ({ ...prev, [taskId]: "" }));
      setShowWeeklyModal(false);
      fetchTasks();
      toast.success("Weekly update added!");
    } catch (err) {
      toast.error("Failed to add weekly update");
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, []);

  const visibleTasks = tasks.filter(task => task.status !== "Completed");

  return (
    <div className="section" id="my-tasks">
      <div className="section-header">
        <h2>My Tasks</h2>
      </div>

      <div className="task-form">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        <input type="text" placeholder="Remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button onClick={handleAddTask} className="assign-button">Add Task</button>
      </div>

      {loading ? <div className="soinner">Loading...</div> : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
              <th>Remarks</th>
              <th>Weekly Work</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {visibleTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td><input type='date' value={task.deadline.slice(0, 10)} onChange={(e) => handleDeadlineUpdate(task.id, e.target.value)} /></td>
                <td className="remarks-cell"><pre>{task.remarks}</pre></td>
                <td className="weekly-cell">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Weekly</strong>
                    <button
                      className="plus-button"
                      onClick={() => {
                        setSelectedTaskForWeekly(task);
                        setShowWeeklyModal(true);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <ul className="weekly-list scrollable-weekly">
                    {(task.weeklyUpdates || []).map((entry, idx) => (
                      <li key={idx}><strong>{entry.date}:</strong> {entry.text}</li>
                    ))}
                  </ul>
                </td>
                <td className={`status-${task.status.toLowerCase().replace(" ", "")}`}>
                  <select
                    className={`status-select status-${task.status.toLowerCase().replace(" ", "")}`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showWeeklyModal && selectedTaskForWeekly && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Weekly Update for: <em>{selectedTaskForWeekly.title}</em></h3>
            <input
              type="text"
              placeholder="Enter weekly update"
              value={weeklyInput[selectedTaskForWeekly.id] || ""}
              onChange={(e) =>
                setWeeklyInput(prev => ({
                  ...prev,
                  [selectedTaskForWeekly.id]: e.target.value
                }))
              }
            />
            <div className="modal-buttons">
              <button className="assign-button" onClick={() => handleAddWeeklyWork(
                selectedTaskForWeekly.id,
                selectedTaskForWeekly.weeklyUpdates || [],
                weeklyInput[selectedTaskForWeekly.id]
              )}>Add</button>
              <button className="cancel-button" onClick={() => setShowWeeklyModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
