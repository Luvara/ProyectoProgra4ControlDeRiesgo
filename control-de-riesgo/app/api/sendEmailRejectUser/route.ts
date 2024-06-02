import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { EmailTemplateUserReject } from "@/components/emailTemplate/templeteRejectUser";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { usu_id } = await req.json();

    const user = await prisma.user.findUnique({
      where: { usu_id: usu_id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    // Enviar el correo electrónico
    const { data, error } = await resend.emails.send({
      from: "Your Company <noreply@proyectoprogracuatro.site>",
      to: user.usu_email,
      subject: "Form Update",
      react: EmailTemplateUserReject({ firstName: user.usu_name }),
      text: `This is the text content of the email.`,
    });

    if (error) {
      console.error("Error en la API de correos:", error);
      return NextResponse.json(
        { error: "Failed to send emails" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error en la API de correos:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
