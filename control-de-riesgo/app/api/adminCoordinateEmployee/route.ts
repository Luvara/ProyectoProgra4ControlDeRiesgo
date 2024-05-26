import prisma from "@/lib/prisma"; 
import { NextResponse, NextRequest } from 'next/server';

async function getUsersByDepartmentAndPermission(departmentId: number) {
  try {
    const users = await prisma.user.findMany({
      where: {
        department_dep_id: departmentId,
        userType_usut_id: 5,  // Coordinadores Internos
        usu_permissons: 'A',  // Activos
      },
      include: {
        usertype: {
          select: {
            usut_role: true,
          },
        },
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users by department and permission:", error);
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
  const departmentId = parseInt(url.searchParams.get('departmentId') || '0', 10);

  if (!departmentId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return getUsersByDepartmentAndPermission(departmentId);
}

export async function PUT(req: NextRequest) {
  const { userId, state, toRespond } = await req.json();

  if (!userId || state === undefined || toRespond === undefined) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return updateUserState(userId, state, toRespond);
}
