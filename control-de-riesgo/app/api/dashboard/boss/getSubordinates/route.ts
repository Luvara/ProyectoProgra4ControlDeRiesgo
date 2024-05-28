import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");

    if (!department) {
      return NextResponse.json({ message: "Invalid department" }, { status: 400 });
    }

    const subordinates = await prisma.user.findMany({
    where: {
        userType_usut_id: 5,
        usu_torespond: "y",
        department_dep_id: parseInt(department)
    },
    });

    return NextResponse.json(subordinates);
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return NextResponse.error();
  }
}
