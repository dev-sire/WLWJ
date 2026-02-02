import { NextResponse } from "next/server"
import { sendEmail } from "@/utils/emailservice"

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const sanitize = (str: string) =>
  str.replace(/[<>]/g, "").trim()

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = sanitize(body.name || "")
    const email = sanitize(body.email || "")
    const organization = sanitize(body.organization || "")
    const message = sanitize(body.message || "")

    // 🔒 Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // 🚀 Send email
    await sendEmail({
      name,
      email,
      organization,
      message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
