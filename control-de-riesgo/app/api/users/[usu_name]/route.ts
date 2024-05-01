import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET(req: Request , context: any) {
    try {
        const {params} = context;
        console.log();
      const users = await prisma.user.findMany({
        where: {
          usu_name: params.usu_name,
        },
      });
      return NextResponse.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.error();
    }
  }