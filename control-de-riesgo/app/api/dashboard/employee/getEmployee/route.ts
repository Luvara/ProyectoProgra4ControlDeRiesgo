import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const employee = await prisma.user.findUnique({
      where: { usu_id: parseInt(id) },
      include: {
        department: true,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      usu_name: employee.usu_name,
      usu_idnumber: employee.usu_idnumber,
      department: employee.department?.dep_name,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.error();
  }
}
