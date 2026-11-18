import pool from "@/app/lib/db";
import { ResultSetHeader } from "mysql2";
import { NextResponse } from "next/server";

type RouteParams = { params: Promise<{ id: string }> };
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // console.log(params);
    const { id } = await params;
    console.log(id);
    const body = await request.json();
    const { lastName, email, dept, city } = body;
    if (!lastName || !email || !dept || !city) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }
    const [result] = await pool.execute<ResultSetHeader>(
      "UPDATE employees SET last_name=?, email=?, dept=?, city=? WHERE id=?",
      [lastName, email, dept, city, Number(id)],
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee Not Found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.log("Update Error", error);
    return NextResponse.json(
      {
        success: false,
        message: "error in updating employee",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM employees WHERE id=?",
      [Number(id)],
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Emp not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "emp deleted successfully",
    });
  } catch (error) {
    console.log("Delete Error", error);
    return NextResponse.json(
      { success: false, message: "Error deleting emp" },
      { status: 500 },
    );
  }
}
