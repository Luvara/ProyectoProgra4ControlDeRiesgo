import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { EmailTemplateFormUpdate } from "@/components/emailTemplate/templateUpdateForm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Your Company <noreply@proyectoprogracuatro.site>",
      to: [],
      subject: "Form Update",
      react: EmailTemplateFormUpdate({ firstName: "John" }),
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
