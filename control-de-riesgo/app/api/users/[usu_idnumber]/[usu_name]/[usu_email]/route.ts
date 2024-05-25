import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    const user = await prisma.user.findUnique({
      where: {
        usu_email: params.usu_email,
      },
      include: {
        usertype: true, // Asegúrate de incluir la relación con UserType
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
