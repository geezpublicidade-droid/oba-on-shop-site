import { createServerFn } from '@tanstack/react-start'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { products } from '#/data/products'
import { isAdminAuthenticated } from '#/server/admin-auth'

const ANALYTICS_PATH = path.join(process.cwd(), 'src/data/analytics.json')

type ClickCounts = Record<string, number>

async function readClickCounts(): Promise<ClickCounts> {
  try {
    const raw = await fs.readFile(ANALYTICS_PATH, 'utf-8')
    return JSON.parse(raw) as ClickCounts
  } catch {
    return {}
  }
}

// Contador simples em arquivo local. Funciona de forma confiável em servidor próprio
// (Node/VPS/Railway) rodando continuamente; em hospedagem serverless/edge (Vercel,
// Cloudflare) cada requisição pode rodar em uma instância efêmera e a contagem não
// se acumula de forma confiável entre deploys. Para métricas de verdade em produção
// serverless, o caminho recomendado é GA4/Meta Pixel (já integrados em trackAffiliateClick)
// ou migrar para um banco de dados real.
async function writeClickCounts(counts: ClickCounts): Promise<void> {
  await fs.writeFile(ANALYTICS_PATH, `${JSON.stringify(counts, null, 2)}\n`, 'utf-8')
}

export const recordAffiliateClick = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { productId: string })
  .handler(async ({ data }) => {
    const counts = await readClickCounts()
    counts[data.productId] = (counts[data.productId] ?? 0) + 1
    await writeClickCounts(counts)
    return { success: true as const }
  })

export interface ProductClickStat {
  id: string
  name: string
  slug: string
  clicks: number
}

export const adminGetClickStats = createServerFn({ method: 'GET' }).handler(async () => {
  if (!(await isAdminAuthenticated())) {
    throw new Error('UNAUTHORIZED')
  }

  const counts = await readClickCounts()
  const stats: ProductClickStat[] = products
    .map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      clicks: counts[product.id] ?? 0,
    }))
    .sort((a, b) => b.clicks - a.clicks)

  const totalClicks = stats.reduce((sum, item) => sum + item.clicks, 0)

  return { stats, totalClicks }
})
