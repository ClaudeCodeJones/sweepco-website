import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // TODO: wire up email delivery (e.g. Resend, Nodemailer)
  console.log("Contact form submission:", { name, email, phone, message });

  return Response.json({ success: true }, { status: 200 });
}
