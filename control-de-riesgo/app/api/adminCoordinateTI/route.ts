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

async function updateUserState(userId: number, state: string) {
  try {
    const user = await prisma.user.update({
      where: { usu_id: userId },
      data: { usu_state: state},
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user state:", error);
    return NextResponse.error();
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userTypeId = url.searchParams.get('userTypeId');

  if (!userTypeId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }


  return getUsersByUserType(parseInt(userTypeId, 10));
}

export async function PUT(req: NextRequest) {
  const { userId, state, toRespond } = await req.json();

  if (!userId || state === undefined ) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  return updateUserState(userId, state);
}
