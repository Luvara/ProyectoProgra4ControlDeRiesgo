import { question } from "@prisma/client";
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
    const newQuestion = await prisma.question.create({
      data: body,
    });

    return NextResponse.json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.error();
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const question = body as question;

    const updatedQuestion = await prisma.question.update({
      where: { quest_id: question.quest_id },
      data: question,
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating questions:", error);
    return NextResponse.error();
  }
}
