import { createServerFn } from '@tanstack/react-start'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Product } from '#/data/products'
import { getAdminSession, isAdminAuthenticated } from '#/server/admin-auth'

const PRODUCTS_PATH = path.join(process.cwd(), 'src/data/products.json')

async function readProductsFile(): Promise<Product[]> {
  const raw = await fs.readFile(PRODUCTS_PATH, 'utf-8')
  return JSON.parse(raw) as Product[]
}

async function writeProductsFile(products: Product[]): Promise<void> {
  if (!import.meta.env.DEV) {
    throw new Error(
      'A edição de produtos pelo admin só funciona rodando o site localmente (npm run dev), pois grava direto no arquivo de dados.',
    )
  }
  await fs.writeFile(PRODUCTS_PATH, `${JSON.stringify(products, null, 2)}\n`, 'utf-8')
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

export const adminListProducts = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAuth()
  return readProductsFile()
})

export const adminGetProduct = createServerFn({ method: 'GET' })
  .validator((data: unknown) => data as { id: string })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProductsFile()
    const product = products.find((item) => item.id === data.id)
    if (!product) throw new Error('Produto não encontrado.')
    return product
  })

export const adminSaveProduct = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { product: Product; isNew: boolean })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProductsFile()

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

    await writeProductsFile(products)
    return { success: true as const }
  })

export const adminDeleteProduct = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { id: string })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProductsFile()
    await writeProductsFile(products.filter((item) => item.id !== data.id))
    return { success: true as const }
  })

export const adminToggleActive = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as { id: string })
  .handler(async ({ data }) => {
    await requireAuth()
    const products = await readProductsFile()
    const index = products.findIndex((item) => item.id === data.id)
    if (index === -1) throw new Error('Produto não encontrado.')
    products[index] = { ...products[index], active: !products[index].active }
    await writeProductsFile(products)
    return { success: true as const }
  })
