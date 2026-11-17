"use client";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3OTQ4OTgxMDcsImV4cCI6MTc5NDkwMTcwNywic3ViIjoiMyJ9.iSv9eNEUZmytKyU4KWNMWa0GcfhH92qczIqYJ_plEag";
import { useEffect, useState } from "react";
type Employee = {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  dept: string;
};
export default function EmployeeSearch() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dept, setDept] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:9000/api/employees", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, firstName, lastName, dept, email }),
      });
      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
      const newEmp: Employee = await response.json();

      setMessage("employee added successfully");
    } catch (err) {
      setMessage("error in adding emp");
    }
  }
  return (
    <main>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="emp id"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <select
          name=""
          id=""
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        >
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
        </select>
        <input type="submit" />
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
