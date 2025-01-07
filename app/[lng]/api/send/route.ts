import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ song }: { song: string }) {
  const toEmails = [
    "nick@mesawallet.io",
    "thomas@mesawallet.io",
    "andres@mesawallet.io",
  ];
  try {
    const { data, error } = await resend.emails.send({
      from: "Mesa <contracts@mesawallet.io>",
      to: toEmails,
      subject: "Successful Contract purchase",
      react: EmailTemplate({ songName: song }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
