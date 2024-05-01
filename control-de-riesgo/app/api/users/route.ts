import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  // try {
  //   const user = await prisma.user.create({
  //     data: req.body,
  //   });
  //   return NextResponse.json(user);
  // } catch (error) {
  //   console.error("Error creating user:", error);
  //   return NextResponse.error();
  // }
}

