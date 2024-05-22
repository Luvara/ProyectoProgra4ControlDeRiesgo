import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Función para obtener todos los usuarios
async function getAllUsuarios() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}

// Función para obtener usuarios según el tipo de usuario
async function getUsuariosByType(userTypes: number[]) {
  try {
    const users = await prisma.user.findMany({
      where: {
        userType_usut_id: {
          in: userTypes,
        },
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users by type:", error);
    return NextResponse.error();
  }
}

// Handler principal para manejar diferentes casos basados en los parámetros de consulta
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === '2-3') {
    return getUsuariosByType([2, 3]);
  } else if (type === '4-5') {
    return getUsuariosByType([4, 5]);
  } else if (type === '5') {
    return getUsuariosByType([5]);
  } else {
    return getAllUsuarios();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usu_name, usu_email } = body;

    if (!usu_name || !usu_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: body,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { usu_id, usu_name, usu_email } = body;

    if (!usu_id || !usu_name || !usu_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { usu_id },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
