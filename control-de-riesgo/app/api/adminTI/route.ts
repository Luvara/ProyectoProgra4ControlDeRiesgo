import prisma from "@/lib/prisma"; 
import { NextResponse, NextRequest } from 'next/server';

async function getUsersByUserType(userTypeId: number) {
  try {
    const users = await prisma.user.findMany({
      where: {
        userType_usut_id: userTypeId,
        usu_permissons: 'A',
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users by user type:", error);
    return NextResponse.error();
  }
}
async function getUsersByPermissionAndType() {
  try {
    const users = await prisma.user.findMany({
      where: {
        userType_usut_id: {
          in: [2, 3],
        },
        usu_permissons: 'P',
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
    console.error("Error fetching users by permission and type:", error);
    return NextResponse.error();
  }
}
async function updateUserPermission(userId: number, permissons: string) {
  try {
    const user = await prisma.user.update({
      where: { usu_id: userId },
      data: { usu_permissons: permissons },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user permissions:", error);
    return NextResponse.error();
  }
}

async function deleteUser(userId: number) {
  try {
    await prisma.user.delete({
      where: { usu_id: userId },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.error();
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userTypeId = url.searchParams.get('userTypeId');
  const permissionCheck = url.searchParams.get('checkPermissions');

  if (permissionCheck === 'true') {
    return getUsersByPermissionAndType();
  }

  if (!userTypeId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return getUsersByUserType(parseInt(userTypeId, 10));
}

export async function PUT(req: NextRequest) {
  const { userId, permissons } = await req.json();

  if (!userId || permissons === undefined) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return updateUserPermission(userId, permissons);
}

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return deleteUser(userId);
}
