import { REACT_LOADABLE_MANIFEST } from 'next/dist/shared/lib/constants';
import { Resend } from 'resend';

const resend = new Resend('re_5RzNsWFt_HV1DfwssVaBGC6f3A9ehn5sp');REACT_LOADABLE_MANIFEST
resend.emails.send({
    from: 'noreply@iic.islec.edu.in',
    to: 'fahadsyed7799@gmail.com',
    subject: 'Hello World',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ASPIRE 2026 – Registration Confirmed</title>
  <style>
    body {
      background-color: #f4f4f4; /* Replace with your color */
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color:#e2e8f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="background-color:#1e293b; border-radius:16px; overflow:hidden; border:1px solid #334155; box-shadow:0 25px 50px rgba(0,0,0,0.5);">

          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4); padding:36px 32px; text-align:center;">
              <h1 style="margin:0; font-size:28px; font-weight:800; color:#ffffff; letter-spacing:1px;">
                🚀 ASPIRE 2026
              </h1>
              <p style="margin:6px 0 0; font-size:14px; color:rgba(255,255,255,0.85); letter-spacing:2px;">
                Innovation &bull; Skills &bull; Leadership
              </p>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td align="center" style="padding:32px 32px 0;">
              <div style="display:inline-block; background-color:#065f46; border:1px solid #059669; border-radius:50px; padding:8px 24px;">
                <span style="color:#6ee7b7; font-size:14px; font-weight:600;">✅ &nbsp;Registration Confirmed</span>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:24px 32px 8px; text-align:center;">
              <h2 style="margin:0; font-size:22px; color:#f8fafc; font-weight:700;">
                Welcome aboard, Syed! 🎉
              </h2>
              <p style="margin:10px 0 0; font-size:15px; color:#94a3b8; line-height:1.6;">
                Your registration for <strong style="color:#ffffff;">ASPIRE 2026</strong> has been successfully recorded. Here are your details:
              </p>
            </td>
          </tr>

          <!-- Registration Details Card -->
          <tr>
            <td style="padding:20px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; border-radius:12px; border:1px solid #334155; overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #1e293b;">
                    <span style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Name</span><br/>
                    <span style="font-size:15px; color:#f1f5f9; font-weight:600;">Syed Ali Quadri</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #1e293b;">
                    <span style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Email</span><br/>
                    <span style="font-size:15px; color:#f1f5f9; font-weight:600;">syedaliquadri100@gmail.com</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #1e293b;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align:top;">
                          <span style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Department</span><br/>
                          <span style="font-size:15px; color:#f1f5f9; font-weight:600;">CSE</span>
                        </td>
                        <td width="50%" style="vertical-align:top;">
                          <span style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Year</span><br/>
                          <span style="font-size:15px; color:#f1f5f9; font-weight:600;">3rd</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align:top;">
                          <span style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Roll No</span><br/>
                          <span style="font-size:15px; color:#f1f5f9; font-weight:600;">160521733001</span>
                        </td>
                        <td width="50%" style="vertical-align:top;">
                          <span style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1px;">Section</span><br/>
                          <span style="font-size:15px; color:#f1f5f9; font-weight:600;">A</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info Note -->
          <tr>
            <td style="padding:4px 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1e1b4b; border:1px solid #3730a3; border-radius:10px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0; font-size:13px; color:#a5b4fc; line-height:1.5;">
                      💡 <strong>What's next?</strong> Keep an eye on your inbox for event updates, schedules, and important announcements. Make sure to arrive on time!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px; background-color:#334155;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px; text-align:center;">
              <p style="margin:0; font-size:13px; color:#64748b; line-height:1.6;">
                Organized by <strong style="color:#94a3b8;">Institution's Innovation Council (IIC)</strong>
              </p>
              <p style="margin:8px 0 0; font-size:12px; color:#475569;">
                For queries, reach out to the IIC team &bull; © 2026
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
});