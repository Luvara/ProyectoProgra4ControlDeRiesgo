import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {

    const { anwer } = await req.json();
    try {
      const updatedAnswer = await prisma.answer.update({
        where: { answ_id: anwer.answ_id },
        data: { answ_evidence: anwer.url },
      });
      return NextResponse.json({ message: 'URL guardada con éxito', updatedAnswer });
    } catch (error) {
        return NextResponse.json({ error: 'Error guardando el URL en la base de datos' });
    }
}