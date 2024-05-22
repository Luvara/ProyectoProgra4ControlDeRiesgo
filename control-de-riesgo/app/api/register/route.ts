import prisma from "@/lib/prisma"; 
import { NextResponse, NextRequest } from 'next/server';




export async function POST(req: NextRequest) {
    try {
      const data = await req.json();
  
      const { cedula, nombre, apellido1, apellido2, correo, rol } = data;
  
      // Determina el userType_usut_id basado en el rol
      let userType_usut_id;
      switch (rol) {
        case 'TI':
          userType_usut_id = 2;
          break;
        case 'Coordinador interno':
          userType_usut_id = 3;
          break;
        case 'Empleado de area':
          userType_usut_id = 5;
          break;
        case 'Jefe de area':
          userType_usut_id = 4;
          break;
        default:
          return NextResponse.json({ error: 'Rol inválido' }, { status: 400 });
      }
  
      const newUser = await prisma.user.create({
        data: {
          usu_idnumber: cedula,
          usu_name: nombre,
          usu_lastname: apellido1,
          usu_slastname: apellido2,
          usu_email: correo,
          userType_usut_id,
          usu_torespond: 'n',
          usu_state: 'A',
          usu_version: 1,
          department_dep_id: 1, // Asegúrate de ajustar esto según tus necesidades
        },
      });
  
      return NextResponse.json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
  }