import { axisform } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const axisforms = await prisma.axisform.findMany();
    return NextResponse.json(axisforms);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const forms = body as axisform[];

    const updatedForms = await prisma.$transaction(
      forms.map((form) =>
        prisma.axisform.update({
          where: { form_id: form.form_id },
          data: form,
        })
      )
    );

    return NextResponse.json(updatedForms);
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.error();
  }
}
