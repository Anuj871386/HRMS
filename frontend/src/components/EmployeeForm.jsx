import { useState } from "react";
import api from "../api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", form);
      alert("Employee added successfully");
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Error adding employee");
    }
  };

  return (
    <div className="card employee-form">
      <h2 className="form-title">ADD EMPLOYEE</h2>

      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>EMPLOYEE ID</label>
          <input
            name="employee_id"
            placeholder="EMP001"
            value={form.employee_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>FULL NAME</label>
          <input
            name="full_name"
            placeholder="John Doe"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>DEPARTMENT</label>
          <input
            name="department"
            placeholder="Engineering / HR"
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-primary" type="submit">
          ➕ Add Employee
        </button>
      </form>
    </div>
  );
}



