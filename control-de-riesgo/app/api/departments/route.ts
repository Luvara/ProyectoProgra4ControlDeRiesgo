import { department } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        axisform: {
          include: {
            section: {
              include: {
                question: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {} = body as department;

    const newQuestion = await prisma.department.create({
      data: {
        ...(body as department),
      },
    });

    return NextResponse.json(newQuestion);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { dep_id } = body as department;

    // if (!usu_id || !usu_name || !usu_email) {
    //   return new NextResponse("Missing required fields", { status: 400 });
    // }

    const updatedQuestion = await prisma.department.update({
      where: { dep_id: dep_id },
      data: {
        ...(body as department),
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating department:", error);
    return NextResponse.error();
  }
}
