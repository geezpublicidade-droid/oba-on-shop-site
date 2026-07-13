// Dados reais ficam em products.json — editável pelo painel /admin ou manualmente.
import productsData from './products.json'

export type ProductType = 'physical' | 'digital' | 'business' | 'service'

export type ProductCategory = 'achados' | 'ofertas' | 'digital' | 'negocios'

export type ProductBadge =
  | 'Achado Oba'
  | 'Oferta'
  | 'Produto digital'
  | 'Para negócios'
  | 'Recomendado'
  | 'Mais procurado'
  | 'Novo'

export type ProductPlatform =
  | 'Shopee'
  | 'Mercado Livre'
  | 'Amazon'
  | 'Kiwify'
  | 'Hotmart'
  | 'Loja parceira'

export interface StoryItem {
  type: 'image' | 'video'
  src: string
  /** Legenda curta exibida sobre a mídia. */
  caption?: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  benefits: string[]
  image: string
  gallery: string[]
  /**
   * Mídias em formato vertical (estilo Stories/Status) para reforçar a divulgação do produto.
   * Aceita imagens e vídeos curtos (demonstração, unboxing, depoimento). Vazio até que
   * fotos/vídeos reais do produto sejam adicionados — a interface já está pronta para receber.
   */
  stories: StoryItem[]
  /** Ficha técnica exibida em produtos físicos (dimensões, material, voltagem etc.). */
  specs?: ProductSpec[]
  /** Passos customizados de "como funciona" para este produto. Se ausente, usa o padrão do tipo. */
  howItWorks?: string[]
  category: ProductCategory
  subcategory: string
  type: ProductType
  platform: ProductPlatform
  affiliateUrl: string
  currentPrice: number
  oldPrice?: number
  discountPercentage?: number
  tags: string[]
  badge: ProductBadge
  featured: boolean
  offer: boolean
  /** Destaque "Achado da Semana" — apenas um produto deve estar marcado por vez. */
  weeklyPick?: boolean
  active: boolean
  createdAt: string
}

export const products: Product[] = productsData as Product[]

export function getActiveProducts(): Product[] {
  return products.filter((product) => product.active)
}

export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((product) => product.featured)
}

export function getOfferProducts(): Product[] {
  return getActiveProducts().filter((product) => product.offer)
}

export function getWeeklyPick(): Product | undefined {
  return getActiveProducts().find((product) => product.weeklyPick)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return getActiveProducts().filter((product) => product.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug && product.active)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getActiveProducts()
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit)
}

const DEFAULT_HOW_IT_WORKS: Record<ProductType, string[]> = {
  physical: ['Escolha o produto', 'Compre com segurança na loja parceira', 'Receba no conforto da sua casa'],
  digital: ['Compre com segurança na loja parceira', 'Receba o acesso por e-mail', 'Comece a usar na hora'],
  business: ['Escolha a solução ideal', 'Contrate direto com o parceiro', 'Implemente no seu negócio'],
  service: ['Escolha o serviço', 'Combine os detalhes com o parceiro', 'Aproveite a solução'],
}

export function getHowItWorks(product: Product): string[] {
  return product.howItWorks && product.howItWorks.length > 0
    ? product.howItWorks
    : DEFAULT_HOW_IT_WORKS[product.type]
}
