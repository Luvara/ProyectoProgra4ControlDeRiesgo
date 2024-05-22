import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

async function getUsuariosByDepartmentAndType(departmentId: number) {
  try {
    const users = await prisma.user.findMany({
      where: {
        department_dep_id: departmentId,
        userType_usut_id: 5,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users by department and type:", error);
    return NextResponse.error();
  }
}

async function updateUserState(userId: number, state: string, toRespond: string) {
  try {
    const user = await prisma.user.update({
      where: { usu_id: userId },
      data: { usu_state: state, usu_torespond: toRespond },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user state:", error);
    return NextResponse.error();
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const departmentId = url.searchParams.get('departmentId');

  if (!departmentId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return getUsuariosByDepartmentAndType(parseInt(departmentId, 10));
}

export async function PUT(req: NextRequest) {
  const { userId, state, toRespond } = await req.json();

  if (!userId || state === undefined || toRespond === undefined) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return updateUserState(userId, state, toRespond);
}
