import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { EmailTemplateDesactivateForm } from "@/components/emailTemplate/templateDesactivateForm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { formId } = await req.json();

    // Buscar el formulario en la base de datos
    const form = await prisma.axisform.findUnique({
      where: { form_id: formId },
      include: {
        department: {
          include: {
            user: true, // Incluir usuarios relacionados al departamento
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    // Buscar el usuario que necesita responder el formulario
    const userToRespond = form.department?.user.find(user => user.usu_torespond === "Y");

    if (!userToRespond) {
      return NextResponse.json(
        { error: "No user found to respond the form" },
        { status: 404 }
      );
    }

    // Enviar el correo electrónico
    const { data, error } = await resend.emails.send({
      from: "Your Company <noreply@proyectoprogracuatro.site>",
      to: userToRespond.usu_email,
      subject: "Form Update",
      react: EmailTemplateDesactivateForm({ firstName: userToRespond.usu_name }),
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
