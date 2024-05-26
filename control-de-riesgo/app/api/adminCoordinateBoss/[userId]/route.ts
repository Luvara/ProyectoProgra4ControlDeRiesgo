import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Manejar solicitudes GET para obtener detalles del usuario
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { usu_id: Number(userId) },
      include: {
        department: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Manejar solicitudes PUT para actualizar detalles del usuario
export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const data = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { usu_id: Number(userId) },
      data: {
        usu_idnumber: data.usu_idnumber,
        usu_name: data.usu_name,
        usu_lastname: data.usu_lastname,
        usu_slastname: data.usu_slastname,
        usu_email: data.usu_email,
        department_dep_id: data.department_dep_id,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
