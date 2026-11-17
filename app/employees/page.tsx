
type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  dept: string;
};

type EmployeeResponse = {
  data: Employee[];
};

export default async function EmployeePage() {
  const response = await fetch(
    `${process.env.API_URL}/employees`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3OTQ4MjYyMTUsImV4cCI6MTc5NDgyOTgxNSwic3ViIjoiMyJ9.-L3ZRP-v23g51eAu_CtoxQF2N8UCbQNMOH4uuJh9Oh0`,
      },
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching employees: ${response.status}`
    );
  }

  const result: EmployeeResponse = await response.json();
  const employees = result.data;

  return (
    <main>
      <h1>Employees List</h1>

      {employees.map((emp) => (
        <div key={emp.id}>
          <h3>
            {emp.id} -- {emp.first_name} {emp.last_name} -- {emp.dept}
          </h3>
        </div>
      ))}
    </main>
  );
}
