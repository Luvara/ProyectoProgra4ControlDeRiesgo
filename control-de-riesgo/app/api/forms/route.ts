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
