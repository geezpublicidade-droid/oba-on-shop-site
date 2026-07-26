// Aplica a regra de oferta (offer/discountPercentage derivados de oldPrice x currentPrice)
// sobre o catálogo já existente. Roda contra o Vercel Blob (produção) se BLOB_READ_WRITE_TOKEN
// estiver no ambiente, senão contra src/data/products.json local.
//
// Uso:
//   BLOB_READ_WRITE_TOKEN=xxx node scripts/migrate-offer-rule.mjs        (aplica no Blob)
//   node scripts/migrate-offer-rule.mjs                                  (aplica no arquivo local)
//   node scripts/migrate-offer-rule.mjs --dry-run                        (só mostra o que mudaria)

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dryRun = process.argv.includes('--dry-run')
const localPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/products.json')

function applyOfferRule(product) {
  const current = product.currentPrice
  const old = product.oldPrice
  const hasDiscount = typeof old === 'number' && old > 0 && current > 0 && old > current

  return {
    ...product,
    discountPercentage: hasDiscount
      ? Math.round(((old - current) / old) * 100)
      : product.discountPercentage,
    offer: hasDiscount ? true : product.offer,
  }
}

async function loadProducts() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { get } = await import('@vercel/blob')
    const result = await get('products.json', { access: 'private', useCache: false })
    if (!result) throw new Error('Nada encontrado no Blob em products.json.')
    const text = await new Response(result.stream).text()
    return { source: 'blob', products: JSON.parse(text) }
  }
  const raw = await readFile(localPath, 'utf-8')
  return { source: 'local', products: JSON.parse(raw) }
}

async function saveProducts(source, products) {
  if (source === 'blob') {
    const { put } = await import('@vercel/blob')
    await put('products.json', JSON.stringify(products, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return
  }
  await writeFile(localPath, `${JSON.stringify(products, null, 2)}\n`, 'utf-8')
}

const { source, products } = await loadProducts()
let changed = 0

const next = products.map((product) => {
  const updated = applyOfferRule(product)
  if (updated.offer !== product.offer || updated.discountPercentage !== product.discountPercentage) {
    changed++
    console.log(
      `- ${product.name} (${product.slug}): oldPrice=${product.oldPrice} currentPrice=${product.currentPrice} -> offer=${updated.offer} discountPercentage=${updated.discountPercentage}`,
    )
  }
  return updated
})

console.log(`\nFonte: ${source}. Produtos afetados: ${changed} de ${products.length}.`)

if (dryRun) {
  console.log('--dry-run: nada foi salvo.')
} else if (changed > 0) {
  await saveProducts(source, next)
  console.log('Salvo com sucesso.')
} else {
  console.log('Nada a salvar.')
}
