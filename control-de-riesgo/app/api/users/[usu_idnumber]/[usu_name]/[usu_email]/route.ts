import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    console.log();
    const user = await prisma.user.findUnique({
      where: {
        usu_email: params.usu_email,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
