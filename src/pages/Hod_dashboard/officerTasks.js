import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/dashboard-hod.css';

export default function OfficerTasks() {
  const [showModal, setShowModal] = useState(false);
  const [officers, setOfficers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    remarks: '',
    status: 'Pending',
    assignedTo: '',
  });

  const user = JSON.parse(localStorage.getItem("user")); // HOD
  const createdBy = user?.username || "hod";

  const toggleModal = () => setShowModal(!showModal);

  const fetchOfficers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/officers");
      setOfficers(res.data);
    } catch (err) {
      //console.error("Error fetching officers");
    }
  };

  const fetchAssignedTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assigned-tasks");
      setTasks(res.data);
    } catch (err) {
      // console.error("Error fetching assigned tasks");
    }
  };

  useEffect(() => {
    fetchOfficers();
    fetchAssignedTasks();
  }, []);


  const groupedTasks = tasks.reduce((acc, task) => {
    const officer = task.assignedTo;
    if (!acc[officer]) acc[officer] = [];
    acc[officer].push(task);
    return acc;
  }, {});


  const handleAssign = async () => {
    const { title, deadline, assignedTo } = formData;
    if (!title || !deadline || !assignedTo) {
      toast.warn("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/add", {
        ...formData,
        createdBy,
      });
      toast.success("Task assigned!");
      toggleModal();
      setFormData({ title: '', deadline: '', remarks: '', status: 'Pending', assignedTo: '' });
      await fetchAssignedTasks();
    } catch (err) {
      toast.error("Failed to assign task");
    }
  };


  const handleDeadlineUpdate = async (taskId, updateDate) => {
    try {
      await axios.patch(`http://localhost:5000/api/assigned/${taskId}`, {
        deadline: updateDate,
      });
      toast.success("Deadline updated");
      await fetchAssignedTasks();
    } catch (err) {
      toast.error("Failed to update deadline");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/delete/${taskId}`);
      toast.success("Task deleted successfully");
      await fetchAssignedTasks();
    } catch (err) {
      toast.error("Failed to delete task")
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>Officers</h2>
        <button className="assign-button" onClick={toggleModal}>Assign Task</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedTasks).map(([officer, officerTasks]) =>
            officerTasks.map((task, idx) => (
              <tr key={task.id}>
                <td>{idx === 0 ? officer : ""}</td>
                <td>{task.title}</td>
                <td><input type='date' value={task.deadline.slice(0, 10)} onChange={(e) => handleDeadlineUpdate(task.id, e.target.value)} /></td>
                <td className='remark-cell'>
                  <ul className="remarks-list">
                    {Array.isArray(task.remarks) ? (
                      task.remarks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))
                    ) : (
                      <li>{task.remarks}</li> // fallback for single string
                    )}
                  </ul>
                </td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Assign Task to Officer</h3>

            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
            <input
              placeholder="Remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            />

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            >
              <option value="">Select Officer</option>
              {officers.map((officer) => (
                <option key={officer.username} value={officer.username}>
                  {officer.username}
                </option>
              ))}
            </select>

            <div className="modal-buttons">
              <button className="assign-button" onClick={handleAssign}>Assign</button>
              <button className="cancel-button" onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
