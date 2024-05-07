import { user } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { usu_id, usu_name, usu_email } = body as user;

    if (!usu_id || !usu_name || !usu_email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { usu_id: usu_id },
      data: {
        ...(body as user),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.error();
  }
}
