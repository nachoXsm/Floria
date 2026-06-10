import { Resend } from 'resend'

const FROM = 'Floria <hola@floria.app>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendConfirmationEmail(to: string, confirmUrl: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: 'Confirmá tu cuenta en Floria 🌿',
    html: buildConfirmationEmail(confirmUrl),
  })
}

export async function sendWelcomeEmail(to: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: 'Bienvenido a Floria 🌿',
    html: buildWelcomeEmail(to),
  })
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: 'Recuperá tu contraseña de Floria',
    html: buildPasswordResetEmail(resetUrl),
  })
}

// ─── Templates ───────────────────────────────────────────────────────────────

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body { margin:0; padding:0; background:#F9FCF8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#1E3D2B; }
    .container { max-width:560px; margin:0 auto; padding:40px 20px; }
    .card { background:white; border-radius:24px; padding:40px; border:1px solid #E7EFE6; box-shadow:0 8px 30px rgba(30,61,43,0.07); }
    .logo { font-size:28px; font-weight:600; color:#1E3D2B; margin-bottom:32px; display:block; text-decoration:none; letter-spacing:-0.5px; }
    h1 { font-size:26px; font-weight:600; color:#1E3D2B; margin:0 0 14px; line-height:1.3; }
    p { font-size:15px; color:#4C7F5B; line-height:1.7; margin:0 0 20px; }
    .btn { display:inline-block; background:#1E3D2B; color:white !important; padding:14px 32px; border-radius:999px; text-decoration:none; font-size:15px; font-weight:600; margin:8px 0 24px; }
    .footer { text-align:center; margin-top:32px; font-size:12px; color:#A7C4A1; }
    .footer a { color:#4C7F5B; text-decoration:none; }
    .divider { height:1px; background:#E7EFE6; margin:24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <a href="https://floria.app" class="logo">🌿 Floria</a>
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Floria · Tu espacio, tu naturaleza.</p>
      <p>Si no creaste esta cuenta, ignorá este email.</p>
    </div>
  </div>
</body>
</html>`
}

function buildConfirmationEmail(confirmUrl: string) {
  return emailWrapper(`
    <h1>Confirmá tu cuenta</h1>
    <p>Gracias por registrarte en Floria. Hacé clic en el botón para confirmar tu dirección de email y acceder a tu cuenta.</p>
    <a href="${confirmUrl}" class="btn">Confirmar mi cuenta</a>
    <div class="divider"></div>
    <p style="font-size:13px">Si el botón no funciona, copiá y pegá este enlace en tu navegador:<br/>
    <a href="${confirmUrl}" style="color:#4C7F5B;word-break:break-all">${confirmUrl}</a></p>
    <p style="font-size:13px;margin:0">Este enlace expira en 24 horas.</p>
  `)
}

function buildWelcomeEmail(email: string) {
  return emailWrapper(`
    <h1>¡Bienvenido a Floria! 🌱</h1>
    <p>Tu cuenta <strong>${email}</strong> está lista. Ya podés explorar el catálogo, identificar plantas con IA y armar tu jardín digital.</p>
    <a href="https://floria.app/explore" class="btn">Explorar plantas</a>
    <div class="divider"></div>
    <p style="font-size:13px;margin:0">¿Querés sacarle el máximo partido a Floria? Probá el <a href="https://floria.app/jardinero">Jardinero IA</a> o consultá el <a href="https://floria.app/luna">Calendario lunar</a>.</p>
  `)
}

function buildPasswordResetEmail(resetUrl: string) {
  return emailWrapper(`
    <h1>Recuperá tu contraseña</h1>
    <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Floria. Hacé clic en el botón para crear una nueva.</p>
    <a href="${resetUrl}" class="btn">Restablecer contraseña</a>
    <div class="divider"></div>
    <p style="font-size:13px;margin:0">Este enlace expira en 1 hora. Si no pediste restablecer tu contraseña, ignorá este email.</p>
  `)
}
