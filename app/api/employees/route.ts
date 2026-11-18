import pool from "@/app/lib/db";
import { ResultSetHeader } from "mysql2";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM employees");
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching employees",
      },
      { status: 500 },
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { employeeId, firstName, lastName, email, dept } = body;
    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO employees (employee_id, first_name, last_name, email, dept) VALUES (?, ?, ?, ?, ?) ",
      [employeeId, firstName, lastName, email, dept],
    );
    return NextResponse.json(
      {
        success: true,
        message: "emp created successfully",
        id: result.insertId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "error in creating employee",
    },{status:500});
  }
}
