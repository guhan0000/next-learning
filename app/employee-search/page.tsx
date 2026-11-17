"use client";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3OTQ4OTI3MzIsImV4cCI6MTc5NDg5NjMzMiwic3ViIjoiMyJ9.Us5xwhKMs9S8Pqphtcrb9Z1md-gjXJWo_cWGua2t7xU";
import { useEffect, useState } from "react";
type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  dept: string;
};
export default function EmployeeSearch() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getEmployees() {
      try {
        const response = await fetch(`http://localhost:9000/api/employees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Employees");
        }
        const result = await response.json();
        setEmployees(result.data);
      } catch (error) {
        setError("Error in fetching employees");
      } finally {
        setLoading(false);
      }
    }
    getEmployees();
  }, []);
  console.log(employees);

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading) {
    return <p>Loading Employees</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <main>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {filteredEmployees.map((emp) => (
        <div key={emp.id}>
          <h3>{`${emp.first_name}-${emp.last_name}-${emp.dept}`}</h3>
        </div>
      ))}
      {filteredEmployees.length === 0 && <p>No Employee Found</p>}
     
    </main>
  );
}
