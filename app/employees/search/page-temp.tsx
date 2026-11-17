"use client";

import React, { useEffect, useState } from "react";

type Employee = {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
};
export default function EmployeeSearchPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  useEffect(() => {
    async function getEmployees() {
      try {
        const response = await fetch(`${process.env.API_URL}/employees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const result = await response.json();
        const data: Employee[] = result.data;
        setEmployees(data);
      } catch (error) {
        setError("unable to load employees");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getEmployees();
  }, []);
  const filteredEmployees = employees.filter((emp) =>
    emp.first_name.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading) {
    return <p>Loading......</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId,
          firstName,
          lastName,
          email,
        }),
      });
      console.log({ employeeId, firstName, lastName, email });

      if (!response.ok) {
        throw new Error("Error Creating Employee");
      }
      const result = await response.json();
      const newEmployee: Employee = result.data;
      setEmployees([...employees, newEmployee]);
      console.log(response);

      console.log(result);
    } catch (error) {
      setError("Unable to create employee");
    }
  };
  return (
    <main>
      <h1>Employee Search</h1>
      <input
        type="text"
        placeholder="Search Name"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      {filteredEmployees.map((emp) => (
        <div key={emp.employee_id}>
          <h3>{`${emp.employee_id}-${emp.first_name}-${emp.last_name}`}</h3>
        </div>
      ))}
      {filteredEmployees.length === 0 && <p>No Emp Found</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="firstName"
          value={firstName}
          name="firstName"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="employeeId"
          value={employeeId}
          onChange={(e) => {
            setEmployeeId(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </main>
  );
}
