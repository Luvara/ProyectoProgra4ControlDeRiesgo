import { PrismaClient, usertype } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const types = await prisma.usertype.findMany();
    return NextResponse.json(types);
  } catch (error) {
    console.error("Error fetching types:", error);
    return NextResponse.error();
  }
}
