import { createServerFn } from '@tanstack/react-start'
import { put } from '@vercel/blob'
import { isAdminAuthenticated } from '#/server/admin-auth'

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024 // 8MB — já vem comprimida do navegador antes de chegar aqui.
const ALLOWED_CONTENT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function sanitizeFilename(filename: string): string {
  const base = filename.split(/[/\\]/).pop() ?? 'imagem'
  return base.replace(/[^a-zA-Z0-9.-]/g, '-').slice(0, 80) || 'imagem'
}

export const adminUploadProductImage = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { filename: string; contentType: string; dataBase64: string })
  .handler(async ({ data }) => {
    if (!(await isAdminAuthenticated())) {
      throw new Error('UNAUTHORIZED')
    }

    if (!ALLOWED_CONTENT_TYPES.has(data.contentType)) {
      throw new Error('Formato de imagem não suportado. Use JPEG, PNG ou WebP.')
    }
    const token = process.env.BLOB_IMAGES_READ_WRITE_TOKEN
    if (!token) {
      throw new Error('Não há Blob Store de imagens configurado (BLOB_IMAGES_READ_WRITE_TOKEN) para guardar fotos.')
    }

    const buffer = Buffer.from(data.dataBase64, 'base64')
    if (buffer.byteLength > MAX_UPLOAD_BYTES) {
      throw new Error('Imagem muito grande (máximo 8MB).')
    }

    const result = await put(`products/${sanitizeFilename(data.filename)}`, buffer, {
      access: 'public',
      contentType: data.contentType,
      addRandomSuffix: true,
      token,
    })

    return { url: result.url }
  })
