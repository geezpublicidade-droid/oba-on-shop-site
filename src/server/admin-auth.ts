import { useSession } from '@tanstack/react-start/server'

interface AdminSessionData {
  authenticated?: boolean
}

function sessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      'ADMIN_SESSION_SECRET não configurado (ou tem menos de 32 caracteres). Defina no arquivo .env.',
    )
  }
  return secret
}

export function getAdminSession() {
  return useSession<AdminSessionData>({
    password: sessionSecret(),
    name: 'oba-admin-session',
    maxAge: 60 * 60 * 8, // 8 horas
  })
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession()
  return session.data.authenticated === true
}
