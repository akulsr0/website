import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default async function sendContactMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const authToken = <string>process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = <string>process.env.TWILIO_FROM;
    const toNumber = <string>process.env.TWILIO_TO;

    const notValidRequest =
      req.method !== "POST" ||
      req.body.from !== fromNumber ||
      req.body.to !== toNumber;

    if (notValidRequest) return;

    const message = `New Message From Website:\n\n ${req.body.message}`;

    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber,
    });

    return res.json({ success: true, message });
  } catch (error) {
    return res.json({ success: false, error });
  }
}
