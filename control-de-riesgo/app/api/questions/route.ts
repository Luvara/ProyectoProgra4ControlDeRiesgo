import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}