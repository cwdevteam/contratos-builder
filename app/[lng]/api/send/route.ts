// import { EmailTemplate } from "../../../components/email-template";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   try {

//     const { data, error } = await resend.emails.send({
//       from: "Mesa <contracts@mesawallet.io>",
//       to: [
//         "nick@mesawallet.io",
//         //"andres@mesawallet.io",
//         //"thomas@mesawallet.io",
//       ],
//       subject: "Contract Payment Successful",
//       react: EmailTemplate({ songName:  }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { songName } = req.body; // Assuming the name is sent in the request body

  const { data, error } = await resend.emails.send({
    from: "Mesa <contracts@mesawallet.io>",
    to: [
      "nick@mesawallet.io",
      //"andres@mesawallet.io",
      //"thomas@mesawallet.io",
    ],
    subject: "Contract Download Successful",
    react: EmailTemplate({ songName }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
