import { useState } from "react";
import api from "../api";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);

  const markAttendance = async () => {
    if (!employeeId || !date) {
      alert("Employee ID and Date are required");
      return;
    }

    await api.post("/attendance", {
      employee_id: employeeId,
      date,
      status,
    });

    alert("Attendance marked successfully");
  };

  const loadAttendance = async () => {
    if (!employeeId) {
      alert("Enter Employee ID");
      return;
    }
    const res = await api.get(`/attendance/${employeeId}`);
    setRecords(res.data);
  };

  return (
    <div className="card attendance">
      <h2 className="section-title">ATTENDANCE</h2>

      <div className="attendance-form">
        <div className="form-group">
          <label>Employee ID</label>
          <input
            placeholder="EMP001"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Present</option>
            <option>Absent</option>
          </select>
        </div>

        <div className="attendance-actions">
          <button className="btn-primary" onClick={markAttendance}>
            ✔ Mark Attendance
          </button>
          <button className="btn-secondary" onClick={loadAttendance}>
            📄 View Records
          </button>
        </div>
      </div>

      {records.length === 0 ? (
        <p className="empty-state">No attendance records found</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>
                  <span
                    className={
                      r.status === "Present" ? "status-present" : "status-absent"
                    }
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
