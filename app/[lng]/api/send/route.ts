import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import useQuestion2 from "../../store/useQuestion2";

const resend = new Resend(process.env.RESEND_API_KEY);
const song = useQuestion2((state) => state.song);

export async function POST() {
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
