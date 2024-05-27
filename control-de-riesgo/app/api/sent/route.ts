import { EmailTemplate } from "@/components/emailTemplate/template";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const today = new Date();
    const twoDaysBefore = new Date();
    twoDaysBefore.setDate(today.getDate() + 2);

    const twoDaysBeforeFormatted = `${twoDaysBefore.toISOString().split('T')[0]}T00:00:00.000Z`;

    const forms = await prisma.axisform.findMany({
      where: {
        form_date_finish: twoDaysBeforeFormatted,
      },
      include: {
        department: {
          include: {
            user: true,
          },
        },
      },
    });

    const emails = forms.flatMap(form =>
      form.department && form.department.user ? form.department.user.map(user => ({
        to: user.usu_email,
        subject: `Reminder: Form ${form.form_name} is due soon`,
        react: EmailTemplate({ firstName: user.usu_name }),
        text: `Hello ${user.usu_name},\n\nThis is a reminder that the form "${form.form_name}" is due soon.\n\nBest regards,\nYour Company`,
      })) : []
    );
    console.log('Emails to send:', emails);

    for (const email of emails) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Your Company <noreply@proyectoprogracuatro.site>',
          to: [email.to],
          subject: email.subject,
          react: email.react,
          text: email.text, 
        });
        
        if (error) {
          console.error('Error al enviar correo a', email.to + ':', error);
        } else {
          console.log('Correo enviado a', email.to);
        }
      } catch (emailError) {
        console.error('Error al enviar correo a', email.to + ':', emailError);
      }
    }
    return NextResponse.json({ message: 'Emails sent successfully'}, { status: 200 });
  } catch (error) {
    console.error('Error en la API de correos:', error);
    return NextResponse.json({ error: 'Failed to send emails'}, { status: 500 });
  }
}
