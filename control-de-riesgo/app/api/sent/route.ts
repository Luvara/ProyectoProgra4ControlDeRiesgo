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

    const forms = await prisma.axisform.findMany({
      where: {
        form_date_finish: twoDaysBefore,
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
        text: 'This is the text content of the email.', 
      })) : []
    );

    for (const email of emails) {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email.to],
        subject: email.subject,
        react: email.react,
        text: email.text, 
      });
    }
    return NextResponse.json({ message: 'Emails sent successfully'} , {status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send emails'},  {status: 500 });
  }
}

