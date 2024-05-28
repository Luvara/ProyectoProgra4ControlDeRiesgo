import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const form = await prisma.axisform.findFirst({
      where: {
        department: {
          user: {
            some: {
              usu_id: parseInt(id),
            },
          },
          axisform: {
            some: {
              form_status: {
                not: "Pendiente",
              },
            },
          },
        },
      },
      select: {
        form_name: true,
        form_status: true,
      },
    });

    if (form !== null) {
      return NextResponse.json({
        form_name: form.form_name,
        form_status: form.form_status,
      });
    } else {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user form data:", error);
    return NextResponse.error();
  }
}
