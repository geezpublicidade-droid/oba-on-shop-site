import { createServerFn } from '@tanstack/react-start'
import type { ProductPlatform, ProductSpec } from '#/data/products'
import { isAdminAuthenticated } from '#/server/admin-auth'

const FETCH_TIMEOUT_MS = 15_000
const MAX_HTML_CHARS = 60_000
const GEMINI_MODEL = 'gemini-2.5-flash'

export interface ImportedProductData {
  name: string
  shortDescription: string
  description: string
  benefits: string[]
  image: string
  gallery: string[]
  currentPrice: number
  oldPrice?: number
  platform: ProductPlatform
  tags: string[]
  specs: ProductSpec[]
}

function detectPlatform(url: string): ProductPlatform {
  const host = new URL(url).hostname.replace(/^www\./, '')
  if (host.includes('shopee')) return 'Shopee'
  if (host.includes('mercadolivre') || host.includes('mercadolibre') || host.includes('mlstatic')) return 'Mercado Livre'
  if (host.includes('amazon') || host.includes('amzn')) return 'Amazon'
  if (host.includes('kiwify')) return 'Kiwify'
  if (host.includes('hotmart')) return 'Hotmart'
  return 'Loja parceira'
}

async function fetchProductPage(url: string): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    })
    if (!response.ok) {
      throw new Error(`A página respondeu com status ${response.status}.`)
    }
    return await response.text()
  } finally {
    clearTimeout(timeout)
  }
}

/** Extrai os sinais mais úteis do HTML (meta tags, JSON-LD, título) para reduzir ruído antes de mandar pra IA. */
function extractSignals(html: string): string {
  const metaTags = [...html.matchAll(/<meta\s+[^>]*(?:property|name)=["']([^"']+)["'][^>]*content=["']([^"']*)["'][^>]*>/gi)]
    .filter(([, key]) =>
      /^(og:|twitter:|product:|description$|title$)/i.test(key) || key.toLowerCase().includes('price'),
    )
    .map(([, key, value]) => `${key}: ${value}`)
    .join('\n')

  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .join('\n')

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const title = titleMatch ? `title: ${titleMatch[1].trim()}` : ''

  const combined = [title, metaTags, jsonLd].filter(Boolean).join('\n\n')
  return combined.slice(0, MAX_HTML_CHARS) || html.slice(0, MAX_HTML_CHARS)
}

async function extractWithGemini(url: string, signals: string): Promise<ImportedProductData> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurado no .env do projeto.')
  }

  const prompt = `Você recebe metadados extraídos da página de um produto (${url}) e deve devolver APENAS um JSON válido (sem markdown, sem comentários) no formato:
{
  "name": string,
  "shortDescription": string (até 120 caracteres, curta e vendedora),
  "description": string (2-4 frases),
  "benefits": string[] (2-5 bullets curtos, sem o "- "),
  "image": string (URL da imagem principal, vazio se não encontrar),
  "gallery": string[] (outras URLs de imagem encontradas, pode ser vazio),
  "currentPrice": number (preço atual em reais, só número, 0 se não encontrar),
  "oldPrice": number opcional (preço "de", omitir se não houver),
  "tags": string[] (2-5 palavras-chave curtas),
  "specs": [{"label": string, "value": string}] (ficha técnica se houver, pode ser vazio)
}

Metadados da página:
${signals}`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    },
  )

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Falha ao consultar a IA (${response.status}): ${errText.slice(0, 200)}`)
  }

  const result = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('A IA não retornou um JSON reconhecível.')
  }

  const parsed = JSON.parse(jsonMatch[0]) as Partial<ImportedProductData>

  return {
    name: parsed.name ?? '',
    shortDescription: parsed.shortDescription ?? '',
    description: parsed.description ?? '',
    benefits: Array.isArray(parsed.benefits) ? parsed.benefits : [],
    image: parsed.image ?? '',
    gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
    currentPrice: typeof parsed.currentPrice === 'number' ? parsed.currentPrice : 0,
    oldPrice: typeof parsed.oldPrice === 'number' ? parsed.oldPrice : undefined,
    platform: detectPlatform(url),
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    specs: Array.isArray(parsed.specs) ? parsed.specs : [],
  }
}

export const adminImportProductFromUrl = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { url: string })
  .handler(async ({ data }) => {
    if (!(await isAdminAuthenticated())) {
      throw new Error('UNAUTHORIZED')
    }

    let url: URL
    try {
      url = new URL(data.url)
    } catch {
      throw new Error('Link inválido.')
    }
    if (!/^https?:$/.test(url.protocol)) {
      throw new Error('Link inválido.')
    }

    const html = await fetchProductPage(url.toString())
    const signals = extractSignals(html)
    return extractWithGemini(url.toString(), signals)
  })
