import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request , context: any) {
    try {
        const {params} = context;
        console.log();
      const users = await prisma.user.findFirst({
        where: {
          usu_email: params.usu_email,
        },
      });
      return NextResponse.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.error();
    }
  }