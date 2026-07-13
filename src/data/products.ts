// DADOS DEMONSTRATIVOS — substitua pelos produtos e links de afiliado reais da Oba On Shop.

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
  active: boolean
  createdAt: string
}

// Produtos demonstrativos para testar o layout. Substitua por itens e links reais antes de publicar.
export const products: Product[] = [
  {
    id: 'produto-001',
    slug: 'luminaria-decorativa',
    name: 'Luminária decorativa',
    shortDescription: 'Luz de apoio com toque moderno para qualquer ambiente.',
    description:
      'Uma luminária compacta e versátil, ideal para mesa de cabeceira, escritório ou sala de estar. Design discreto que combina com decorações variadas.',
    benefits: ['Fácil de instalar', 'Baixo consumo de energia', 'Design compacto e moderno'],
    image: 'placeholder:home',
    gallery: [],
    stories: [],
    specs: [
      { label: 'Material', value: 'ABS resistente' },
      { label: 'Alimentação', value: 'USB ou 3 pilhas AA' },
      { label: 'Dimensões', value: '18 x 12 x 12 cm' },
      { label: 'Cor', value: 'Branco fosco' },
    ],
    category: 'achados',
    subcategory: 'casa',
    type: 'physical',
    platform: 'Shopee',
    affiliateUrl: '',
    currentPrice: 49.9,
    oldPrice: 79.9,
    discountPercentage: 37,
    tags: ['casa', 'decoracao', 'iluminacao'],
    badge: 'Achado Oba',
    featured: true,
    offer: true,
    active: true,
    createdAt: '2026-07-01',
  },
  {
    id: 'produto-002',
    slug: 'organizador-domestico',
    name: 'Organizador doméstico multiuso',
    shortDescription: 'Organize gavetas, armários e prateleiras com praticidade.',
    description:
      'Conjunto de organizadores empilháveis que ajudam a aproveitar melhor o espaço em casa. Resistentes e fáceis de higienizar.',
    benefits: ['Empilhável', 'Resistente ao uso diário', 'Fácil de limpar'],
    image: 'placeholder:home',
    gallery: [],
    stories: [],
    category: 'achados',
    subcategory: 'casa',
    type: 'physical',
    platform: 'Mercado Livre',
    affiliateUrl: 'https://example.com/oba-demo/organizador-domestico',
    currentPrice: 34.9,
    tags: ['casa', 'organizacao'],
    badge: 'Recomendado',
    featured: true,
    offer: false,
    active: true,
    createdAt: '2026-06-20',
  },
  {
    id: 'produto-003',
    slug: 'suporte-para-celular',
    name: 'Suporte para celular ajustável',
    shortDescription: 'Praticidade para videochamadas, receitas e vídeos.',
    description:
      'Suporte ajustável compatível com a maioria dos smartphones. Ideal para home office, cozinha ou uso no dia a dia.',
    benefits: ['Ângulo ajustável', 'Compacto para levar na bolsa', 'Compatível com a maioria dos aparelhos'],
    image: 'placeholder:tech',
    gallery: [],
    stories: [],
    category: 'achados',
    subcategory: 'tecnologia',
    type: 'physical',
    platform: 'Shopee',
    affiliateUrl: '',
    currentPrice: 24.9,
    oldPrice: 39.9,
    discountPercentage: 38,
    tags: ['tecnologia', 'acessorios'],
    badge: 'Mais procurado',
    featured: true,
    offer: true,
    active: true,
    createdAt: '2026-06-15',
  },
  {
    id: 'produto-004',
    slug: 'kit-utensilios-de-cozinha',
    name: 'Kit utensílios de cozinha',
    shortDescription: 'Conjunto essencial para o dia a dia na cozinha.',
    description:
      'Kit com utensílios básicos para o preparo de refeições, em material resistente e fácil de higienizar. Combina praticidade e economia de espaço.',
    benefits: ['Conjunto completo', 'Material resistente', 'Fácil de guardar'],
    image: 'placeholder:kitchen',
    gallery: [],
    stories: [],
    category: 'achados',
    subcategory: 'cozinha',
    type: 'physical',
    platform: 'Amazon',
    affiliateUrl: '',
    currentPrice: 89.9,
    tags: ['cozinha', 'utensilios'],
    badge: 'Novo',
    featured: false,
    offer: false,
    active: true,
    createdAt: '2026-07-05',
  },
  {
    id: 'produto-005',
    slug: 'produto-para-home-office',
    name: 'Organizador de mesa para home office',
    shortDescription: 'Deixe sua mesa de trabalho mais organizada e produtiva.',
    description:
      'Organizador de mesa com divisórias para cabos, canetas e acessórios. Pensado para quem trabalha em home office e quer mais produtividade.',
    benefits: ['Reduz a bagunça de cabos', 'Design discreto', 'Fácil de montar'],
    image: 'placeholder:office',
    gallery: [],
    stories: [],
    category: 'achados',
    subcategory: 'home office',
    type: 'physical',
    platform: 'Mercado Livre',
    affiliateUrl: '',
    currentPrice: 59.9,
    oldPrice: 89.9,
    discountPercentage: 33,
    tags: ['home office', 'produtividade'],
    badge: 'Oferta',
    featured: false,
    offer: true,
    active: true,
    createdAt: '2026-06-28',
  },
  {
    id: 'produto-006',
    slug: 'ebook-de-vendas',
    name: 'E-book de técnicas de vendas',
    shortDescription: 'Guia prático para vender mais todos os dias.',
    description:
      'Material digital com técnicas práticas de vendas para pequenos negócios e vendedores autônomos, direto ao ponto e sem enrolação.',
    benefits: ['Linguagem simples e direta', 'Aplicável a qualquer segmento', 'Acesso imediato após a compra'],
    image: 'placeholder:digital',
    gallery: [],
    stories: [],
    howItWorks: [
      'Compre com segurança na plataforma parceira',
      'Receba o acesso por e-mail na hora',
      'Baixe o material e comece a aplicar',
    ],
    category: 'digital',
    subcategory: 'e-books',
    type: 'digital',
    platform: 'Hotmart',
    affiliateUrl: 'https://example.com/oba-demo/ebook-de-vendas',
    currentPrice: 27.0,
    tags: ['vendas', 'ebook', 'negocios'],
    badge: 'Produto digital',
    featured: true,
    offer: false,
    active: true,
    createdAt: '2026-06-10',
  },
  {
    id: 'produto-007',
    slug: 'curso-de-inteligencia-artificial',
    name: 'Curso de inteligência artificial na prática',
    shortDescription: 'Aprenda a usar IA no seu trabalho e no seu negócio.',
    description:
      'Curso online com aulas objetivas sobre como aplicar inteligência artificial em tarefas do dia a dia, marketing e atendimento.',
    benefits: ['Aulas em vídeo objetivas', 'Exemplos práticos', 'Certificado de conclusão'],
    image: 'placeholder:digital',
    gallery: [],
    stories: [],
    category: 'digital',
    subcategory: 'cursos',
    type: 'digital',
    platform: 'Kiwify',
    affiliateUrl: '',
    currentPrice: 97.0,
    oldPrice: 147.0,
    discountPercentage: 34,
    tags: ['inteligencia-artificial', 'curso'],
    badge: 'Recomendado',
    featured: true,
    offer: true,
    active: true,
    createdAt: '2026-06-25',
  },
  {
    id: 'produto-008',
    slug: 'ferramenta-para-pequenos-negocios',
    name: 'Ferramenta de organização para pequenos negócios',
    shortDescription: 'Organize pedidos, clientes e financeiro em um só lugar.',
    description:
      'Ferramenta digital pensada para pequenos negócios organizarem pedidos, clientes e financeiro sem complicação, com plano de entrada acessível.',
    benefits: ['Simples de configurar', 'Ideal para quem está começando', 'Suporte via chat'],
    image: 'placeholder:business',
    gallery: [],
    stories: [],
    category: 'negocios',
    subcategory: 'ferramentas',
    type: 'business',
    platform: 'Loja parceira',
    affiliateUrl: 'https://example.com/oba-demo/ferramenta-pequenos-negocios',
    currentPrice: 39.9,
    tags: ['negocios', 'organizacao', 'ferramenta'],
    badge: 'Para negócios',
    featured: true,
    offer: false,
    active: true,
    createdAt: '2026-07-08',
  },
]

export function getActiveProducts(): Product[] {
  return products.filter((product) => product.active)
}

export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((product) => product.featured)
}

export function getOfferProducts(): Product[] {
  return getActiveProducts().filter((product) => product.offer)
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
