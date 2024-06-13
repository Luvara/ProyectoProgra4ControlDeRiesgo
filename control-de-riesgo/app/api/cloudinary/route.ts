import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";


export default async function POST(req: NextRequest) {

    const { anwer } = await req.json();
    try {
      const updatedAnswer = await prisma.answer.update({
        where: { answ_id: anwer.answ_id },
        data: { answ_evidence: anwer.url },
      });
      NextResponse.json({ message: 'URL guardada con éxito', updatedAnswer });
    } catch (error) {
        NextResponse.json({ error: 'Error guardando el URL en la base de datos' });
    }
}