import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



const prisma = new PrismaClient();

export async function GET() {
  try {
    const departments = await prisma.department.findMany();
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}