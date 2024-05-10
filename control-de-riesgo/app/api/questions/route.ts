import {  question } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {  } = body as question;
    const newQuestion = await prisma.question.create({
      data: {
        ...(body as question),
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
    const questions = body as question[];

    const updatedQuestions = await prisma.$transaction(
      questions.map(question =>
        prisma.question.update({
          where: { quest_id: question.quest_id },
          data: question,
        })
      )
    );

    return NextResponse.json(updatedQuestions);
  } catch (error) {
    console.error("Error updating questions:", error);
    return NextResponse.error();
  }
}