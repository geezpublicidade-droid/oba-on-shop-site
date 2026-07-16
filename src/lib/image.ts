const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.82

/** Redimensiona e comprime uma imagem no navegador antes de enviar pro servidor, pra manter o site rápido. */
export async function compressImageFile(
  file: File,
): Promise<{ base64: string; contentType: string }> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Não foi possível processar a imagem.')
  ctx.drawImage(bitmap, 0, 0, width, height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error('Falha ao comprimir imagem.'))),
      'image/jpeg',
      JPEG_QUALITY,
    )
  })

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '')
    reader.onerror = () => reject(new Error('Falha ao ler imagem.'))
    reader.readAsDataURL(blob)
  })

  return { base64, contentType: 'image/jpeg' }
}
