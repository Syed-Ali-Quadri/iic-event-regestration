import { Resend } from "resend";

const resend = new Resend("re_5RzNsWFt_HV1DfwssVaBGC6f3A9ehn5sp");

export default async function sendEmail(to: string, url: string) {
    let value;
    try {
        value = await resend.emails.send({
            from: 'noreply@iic.islec.edu.in',
            to: to,
            subject: "You're registered! — AI Automation Masterclass",
            html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#1e293b;border-radius:12px;overflow:hidden;">

          <!-- Accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(to right,#4f46e5,#7c3aed,#c026d3);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">

              <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">
                AI Automation Masterclass
              </h1>
              <p style="margin:0 0 24px;font-size:13px;color:#94a3b8;">
                By Ali Asgar &nbsp;·&nbsp; IIC ISLEC
              </p>

              <p style="margin:0 0 8px;font-size:15px;color:#e2e8f0;">
                Hi there 👋
              </p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#cbd5e1;">
                You've been successfully registered. Use the button below to access your event ticket &amp; QR code.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background-color:#4f46e5;border-radius:8px;padding:14px 28px;">
                    <a href="${url}" target="_blank"
                       style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;display:inline-block;">
                      View My Ticket →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:0 0 0;font-size:12px;color:#64748b;word-break:break-all;">
                Or copy this link:
                <a href="${url}" style="color:#818cf8;text-decoration:underline;">${url}</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #334155;">
              <p style="margin:0;font-size:11px;color:#475569;text-align:center;">
                Institution's Innovation Council · ISLEC · Hyderabad
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
            `
        })

        return {
            data: value.data,
            error: value.error,
            success: true
        }
    } catch (error) {
        return {
            data: null,
            error,
            success: false
        }
    }
}
