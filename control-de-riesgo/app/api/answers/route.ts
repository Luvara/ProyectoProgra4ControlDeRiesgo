import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET() {
  try {
    const answers = await prisma.answer.findMany();
    return NextResponse.json(answers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}