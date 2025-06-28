import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard-hod.css"; 
import { toast } from "react-toastify";

export default function DoneTasks() {
    const [doneTasks, setDoneTasks] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchDoneTasks = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/assigned/${user.username}/done`);
            setDoneTasks(res.data);
        } catch (err) {
            toast.error("Error fetching done tasks");
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/status/${taskId}`, {
                status: newStatus
            });
            fetchDoneTasks();
        } catch (err) {
            toast.error("Failed to update status");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDoneTasks();
    }, []);

    return (
        <div className="main-content" style={{ padding: "30px" }}>
            <div className="section">
                <div className="section-header" style={{ justifyContent: "space-between" }}>
                    <h2>✅ Done Tasks</h2>
                    <button className="assign-button" onClick={() => navigate(-1)}>
                        ⬅ Back to Dashboard
                    </button>
                </div>

                {doneTasks.length === 0 ? (
                    <p style={{ padding: "10px", color: "#666" }}>No completed tasks yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Deadline</th>
                                <th>Remarks</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doneTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                    <td className="remarks-cell">{task.remarks}</td>
                                    
                                    <td>
                                        <select
                                            className={`status-select ${task.status === "In Progress"
                                                    ? "status-inprogress"
                                                    : task.status === "Completed"
                                                        ? "status-completed"
                                                        : "status-pending"
                                                }`}
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
