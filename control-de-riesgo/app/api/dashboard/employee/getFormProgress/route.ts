import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const activeForm = await prisma.axisform.findFirst({
      where: {
        department: {
          user: {
            some: {
              usu_id: parseInt(id),
            },
          },
        },
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
      orderBy: {
        form_date_start: "desc",
      },
    });

    if (!activeForm) {
      return NextResponse.json({ message: "No active forms" }, { status: 404 });
    }

    const totalQuestions = activeForm.section.reduce(
      (acc, section) => acc + section.question.length,
      0
    );
    const answeredQuestions = activeForm.section.reduce(
      (acc, section) =>
        acc + section.question.filter((q) => q.answer.length > 0).length,
      0
    );

    return NextResponse.json({
      form_name: activeForm.form_name,
      answeredQuestions,
      totalQuestions,
    });
  } catch (error) {
    console.error("Error fetching form progress:", error);
    return NextResponse.error();
  }
}
