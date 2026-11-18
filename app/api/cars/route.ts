import { NextResponse } from "next/server";

const cars = [
  {
    id: 1,
    manufacturer: "Tata",
    model: "Safari",
    isPetrol: false,
  },
  {
    id: 2,
    manufacturer: "Suzuki",
    model: "Baleno",
    isPetrol: true,
  },
];
export async function GET() {
  return NextResponse.json({ success: true, data: cars });
}
export async function POST(request: Request) {
  const body = await request.json();
  const newCar = {
    id: cars.length + 1,
    manufacturer: body.manufacturer,
    model: body.model,
    isPetrol: body.isPetrol,
  };
  cars.push(newCar);
  return NextResponse.json({ success: false, data: cars }, { status: 201 });
}
