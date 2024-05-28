import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const projects = await prisma.axisform.findMany({
      where: {
        form_status: 'A', // Activo
      },
      include: {
        department: {
          select: {
            dep_name: true,
          },
        },
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

    const projectProgress = projects.map((project) => {
      const totalQuestions = project.section.reduce((acc, section) => acc + section.question.length, 0);
      const answeredQuestions = project.section.reduce((acc, section) => acc + section.question.filter((q) => q.answer.length > 0).length, 0);

      const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

      return {
        form_name: project.form_name,
        department: project.department?.dep_name,
        form_date_start: project.form_date_start,
        form_date_finish: project.form_date_finish,
        progress,
      };
    });

    return NextResponse.json(projectProgress);
  } catch (error) {
    console.error('Error fetching project progress:', error);
    return NextResponse.error();
  }
}
