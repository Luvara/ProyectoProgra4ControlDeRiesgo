import { usertype } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET() {
  try {
    const types = await prisma.usertype.findMany();
    return NextResponse.json(types);
  } catch (error) {
    console.error("Error fetching types:", error);
    return NextResponse.error();
  }
}
