import { axisform } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    console.log();
    const form = await prisma.axisform.findFirst({
      where: {
        DEPARTMENT_dep_id: Number(params.DEPARTMENT_dep_id),
        form_status: "a",
      },
      include: {
        section: {
          include: {
            question: {
              include: {
                answer: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(form);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}
