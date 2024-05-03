import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;
    const users = await prisma.user.delete({
      where: {
        usu_id: params.usu_id,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}
