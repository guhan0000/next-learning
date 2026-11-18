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
type RouteParams = { params: Promise<{ id: string }> };
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const car = cars.find((car) => car.id === Number(id));
  if (!car) {
    return NextResponse.json(
      { success: false, message: "Car not found" },
      { status: 400 },
    );
  }
  return NextResponse.json({ success: true, car });
}
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const carIndex = cars.findIndex((car) => car.id === Number(id));
  if (carIndex === -1) {
    return NextResponse.json(
      { success: false, message: "car not found" },
      { status: 400 },
    );
  }
  cars.splice(carIndex, 1);
  return NextResponse.json({
    success: true,
    message: "car deleted successfully",
  });
}
