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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { departmentId } = body;

    const existingForms = await prisma.axisform.findMany({
      where: { DEPARTMENT_dep_id: departmentId },
      include: {
        section: {
          include: {
            question: true,
          },
        },
      },
    });

    if (existingForms.length === 0) {
      return NextResponse.json({ error: "No forms found for the department" }, { status: 404 });
    }

    const templateForm = existingForms[0];

    const newForm = await prisma.axisform.create({
      data: {
        form_name: templateForm.form_name,
        form_status: "d",
        form_description: templateForm.form_description,
        form_version: templateForm.form_version,
        DEPARTMENT_dep_id: departmentId,
        section: {
          create: templateForm.section.map((section) => ({
            sect_name: section.sect_name,
            sect_version: section.sect_version,
            question: {
              create: section.question.map((question) => ({
                quest_ordern: question.quest_ordern,
                quest_question: question.quest_question,
                quest_deactivationdate: question.quest_deactivationdate,
                quest_version: question.quest_version,
              })),
            },
          })),
        },
      },
      include: {
        section: {
          include: {
            question: true,
          },
        },
      },
    });

    return NextResponse.json(newForm);
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.error();
  }
}