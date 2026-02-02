// Another place for Miss Sofia Little to leave her mark :)

interface EmailPayload {
  name: string
  email: string
  organization?: string
  message: string
}

export async function sendEmail(data: EmailPayload) {
  // 🚀 Using fetch API to call EmailJS REST API directly (works on server)
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    accessToken: process.env.EMAILJS_PRIVATE_KEY!, // Private key for server-side

      template_params: {
        name: data.name,
        email: data.email,
        organization: data.organization || "N/A",
        message: data.message,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`EmailJS Error: ${error}`)
  }

  const result = await response.text()
  
  // If response is just "OK", return success object
  if (result === "OK") {
    return { success: true }
  }
  
  // Otherwise try to parse as JSON
  try {
    return JSON.parse(result)
  } catch {
    return { success: true, message: result }
  }  
} 