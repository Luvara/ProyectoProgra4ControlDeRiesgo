import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");
    const page = parseInt(searchParams.get("page") || "0", 5);
    const pageSize = 5;

    if (!department) {
      return NextResponse.json(
        { message: "Invalid department" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        department: {
          dep_id: parseInt(department),
        },
        usu_torespond: "Y",
        userType_usut_id: {
          in: [4, 5],
        },
      },
      skip: page * pageSize,
      take: pageSize,
      select: {
        usu_id: true,
        usu_name: true,
        usu_email: true,
        usu_idnumber: true,
        usertype: {
          select: {
            usut_role: true,
          },
        },
        department: {
          select: {
            dep_name: true,
          },
        },
      },
      orderBy: {
        userType_usut_id: "asc",
      },
    });

    const totalCount = await prisma.user.count({
      where: {
        department: {
          dep_id: parseInt(department),
        },
        usu_torespond: "Y",
        userType_usut_id: {
          in: [4, 5],
        },
      },
    });

    return NextResponse.json({ users, totalCount });
  } catch (error) {
    console.error("Error fetching respondents by department:", error);
    return NextResponse.error();
  }
}
