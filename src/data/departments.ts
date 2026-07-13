import type { ProductCategory } from '#/data/products'

export interface CategoryMeta {
  title: string
  kicker: string
  description: string
  banner: string
}

export const CATEGORY_META: Record<ProductCategory, CategoryMeta> = {
  achados: {
    title: 'Achados',
    kicker: 'Departamento',
    description: 'Produtos úteis, diferentes e selecionados pela Oba.',
    banner: 'linear-gradient(135deg, var(--oba-orange), var(--oba-amber))',
  },
  ofertas: {
    title: 'Ofertas',
    kicker: 'Departamento',
    description: 'Promoções, descontos e oportunidades selecionadas.',
    banner: 'linear-gradient(135deg, var(--oba-coral), var(--oba-pink))',
  },
  digital: {
    title: 'Oba Digital',
    kicker: 'Departamento',
    description: 'E-books, cursos, ferramentas e produtos digitais.',
    banner: 'linear-gradient(135deg, var(--oba-pink), var(--oba-purple))',
  },
  negocios: {
    title: 'Negócios',
    kicker: 'Departamento',
    description: 'Soluções para empreendedores, vendas e produtividade.',
    banner: 'linear-gradient(135deg, var(--oba-amber), var(--oba-orange-deep))',
  },
}
