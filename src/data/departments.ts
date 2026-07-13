import type { ProductCategory } from '#/data/products'
import achadosImage from '#/assets/departments/achados.png'
import ofertasImage from '#/assets/departments/ofertas.png'
import digitalImage from '#/assets/departments/digital.png'
import negociosImage from '#/assets/departments/negocios.png'

export interface CategoryMeta {
  title: string
  kicker: string
  description: string
  banner: string
  image: string
}

export const CATEGORY_META: Record<ProductCategory, CategoryMeta> = {
  achados: {
    title: 'Achados',
    kicker: 'Departamento',
    description: 'Produtos úteis, diferentes e selecionados pela Oba.',
    banner: 'linear-gradient(135deg, var(--oba-orange), var(--oba-amber))',
    image: achadosImage,
  },
  ofertas: {
    title: 'Ofertas',
    kicker: 'Departamento',
    description: 'Promoções, descontos e oportunidades selecionadas.',
    banner: 'linear-gradient(135deg, var(--oba-coral), var(--oba-pink))',
    image: ofertasImage,
  },
  digital: {
    title: 'Oba Digital',
    kicker: 'Departamento',
    description: 'E-books, cursos, ferramentas e produtos digitais.',
    banner: 'linear-gradient(135deg, var(--oba-pink), var(--oba-purple))',
    image: digitalImage,
  },
  negocios: {
    title: 'Negócios',
    kicker: 'Departamento',
    description: 'Soluções para empreendedores, vendas e produtividade.',
    banner: 'linear-gradient(135deg, var(--oba-amber), var(--oba-orange-deep))',
    image: negociosImage,
  },
}
