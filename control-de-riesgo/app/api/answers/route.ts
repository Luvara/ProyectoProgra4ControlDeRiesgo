import { answer } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET() {
  try {
    const answers = await prisma.answer.findMany();
    return NextResponse.json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.error();
  }
}



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {  } = body as answer;

    

    const newAnswer = await prisma.answer.create({
      data: {
        ...(body as answer),
      },
    });

    return NextResponse.json(newAnswer);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { answ_id } = body as answer;

    // if (!usu_id || !usu_name || !usu_email) {
    //   return new NextResponse("Missing required fields", { status: 400 });
    // }

    const updatedAnswer = await prisma.answer.update({
      where: { answ_id: answ_id },
      data: {
        ...(body as answer),
      },
    });

    return NextResponse.json(updatedAnswer);
  } catch (error) {
    console.error("Error updating answer:", error);
    return NextResponse.error();
  }
}