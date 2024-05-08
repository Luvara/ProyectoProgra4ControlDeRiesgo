import { section } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sections = await prisma.section.findMany();
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}
