import { createServerFn } from '@tanstack/react-start'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { get, put } from '@vercel/blob'
import type { Product } from '#/data/products'
import bundledProducts from '#/data/products.json'
import { getAdminSession, isAdminAuthenticated } from '#/server/admin-auth'

const BLOB_PATHNAME = 'products.json'
const LOCAL_PATH = path.join(process.cwd(), 'src/data/products.json')
const CACHE_TTL_MS = 15_000

let cache: { products: Product[]; expiresAt: number } | null = null

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

async function readFromBlob(): Promise<Product[]> {
  const result = await get(BLOB_PATHNAME, { access: 'private', useCache: false })
  if (!result) {
    // Ainda não existe nada gravado no Blob — semeia com o snapshot do build.
    const seed = structuredClone(bundledProducts) as Product[]
    await put(BLOB_PATHNAME, JSON.stringify(seed, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return seed
  }
  const text = await new Response(result.stream).text()
  return JSON.parse(text) as Product[]
}

/** Exportada (sem createServerFn) pra poder ser chamada fora do contexto de request do TanStack Start — ex: rotas Nitro puras como o sitemap.xml. */
export async function readProducts(): Promise<Product[]> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.products
  }

  let products: Product[]
  if (hasBlob()) {
    products = await readFromBlob()
  } else if (import.meta.env.DEV) {
    const raw = await fs.readFile(LOCAL_PATH, 'utf-8')
    products = JSON.parse(raw) as Product[]
  } else {
    products = structuredClone(bundledProducts) as Product[]
  }

  cache = { products, expiresAt: Date.now() + CACHE_TTL_MS }
  return products
}

async function writeProducts(products: Product[]): Promise<void> {
  if (hasBlob()) {
    await put(BLOB_PATHNAME, JSON.stringify(products, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    cache = { products, expiresAt: Date.now() + CACHE_TTL_MS }
    return
  }

  if (!import.meta.env.DEV) {
    throw new Error(
      'Não há Blob Store configurado (BLOB_READ_WRITE_TOKEN) e a edição local só funciona rodando o site com npm run dev.',
    )
  }

  await fs.writeFile(LOCAL_PATH, `${JSON.stringify(products, null, 2)}\n`, 'utf-8')
  cache = { products, expiresAt: Date.now() + CACHE_TTL_MS }
}

async function requireAuth(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error('UNAUTHORIZED')
  }
}

export const adminCheckAuth = createServerFn({ method: 'GET' }).handler(async () => {
  return { authenticated: await isAdminAuthenticated() }
})

export const adminLogin = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { password: string })
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD
    if (!expected) {
      throw new Error('ADMIN_PASSWORD não configurado no .env do projeto.')
    }
    if (data.password !== expected) {
      return { success: false as const }
    }
    const session = await getAdminSession()
    await session.update({ authenticated: true })
    return { success: true as const }
  })

export const adminLogout = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await getAdminSession()
  await session.clear()
  return { success: true as const }
})

/** Server function pública (sem auth) usada pelas rotas da loja para carregar o catálogo mais atual. */
export const getLiveProducts = createServerFn({ method: 'GET' }).handler(() => readProducts())

export const adminListProducts = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAuth()
  return readProducts()
})

export const adminGetProduct = createServerFn({ method: 'GET' })
  .validator((data: unknown) => data as { id: string })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProducts()
    const product = products.find((item) => item.id === data.id)
    if (!product) throw new Error('Produto não encontrado.')
    return product
  })

export const adminSaveProduct = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { product: Product; isNew: boolean })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProducts()

    if (data.isNew) {
      if (products.some((item) => item.slug === data.product.slug)) {
        throw new Error('Já existe um produto com esse slug.')
      }
      products.push(data.product)
    } else {
      const index = products.findIndex((item) => item.id === data.product.id)
      if (index === -1) throw new Error('Produto não encontrado.')
      if (products.some((item) => item.slug === data.product.slug && item.id !== data.product.id)) {
        throw new Error('Já existe outro produto com esse slug.')
      }
      products[index] = data.product
    }

    // Apenas um produto pode ser o "Achado da Semana" por vez.
    if (data.product.weeklyPick) {
      for (const item of products) {
        if (item.id !== data.product.id) item.weeklyPick = false
      }
    }

    await writeProducts(products)
    return { success: true as const }
  })

export const adminDeleteProduct = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { id: string })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProducts()
    await writeProducts(products.filter((item) => item.id !== data.id))
    return { success: true as const }
  })

export const adminToggleActive = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { id: string })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProducts()
    const index = products.findIndex((item) => item.id === data.id)
    if (index === -1) throw new Error('Produto não encontrado.')
    products[index] = { ...products[index], active: !products[index].active }
    await writeProducts(products)
    return { success: true as const }
  })
