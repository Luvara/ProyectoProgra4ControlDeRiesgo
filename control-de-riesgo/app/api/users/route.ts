import { PrismaClient, user } from "@prisma/client";
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
  try {
    const body = await req.json();
    const { usu_id, usu_name, usu_email } = body as user;

    if (!usu_name || !usu_email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        ...(body as user),
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
