import { Briefcase, Sparkles, Tag, Search } from 'lucide-react'
import { DepartmentCard } from '#/components/shared/DepartmentCard'
import achadosImage from '#/assets/departments/achados.png'
import ofertasImage from '#/assets/departments/ofertas.png'
import digitalImage from '#/assets/departments/digital.png'

export const DEPARTMENTS = [
  {
    icon: Search,
    title: 'Achados',
    description: 'Produtos úteis, diferentes e selecionados pela Oba.',
    buttonLabel: 'Ver achados',
    href: '/achados' as const,
    accent: 'linear-gradient(135deg, var(--oba-orange), var(--oba-amber))',
    image: achadosImage,
  },
  {
    icon: Tag,
    title: 'Ofertas',
    description: 'Promoções, descontos e oportunidades selecionadas.',
    buttonLabel: 'Ver ofertas',
    href: '/ofertas' as const,
    accent: 'linear-gradient(135deg, var(--oba-coral), var(--oba-pink))',
    image: ofertasImage,
  },
  {
    icon: Sparkles,
    title: 'Oba Digital',
    description: 'E-books, cursos, ferramentas e produtos digitais.',
    buttonLabel: 'Explorar o digital',
    href: '/digital' as const,
    accent: 'linear-gradient(135deg, var(--oba-pink), var(--oba-purple))',
    image: digitalImage,
  },
  {
    icon: Briefcase,
    title: 'Negócios',
    description: 'Soluções para empreendedores, vendas e produtividade.',
    buttonLabel: 'Ver soluções',
    href: '/negocios' as const,
    accent: 'linear-gradient(135deg, var(--oba-amber), var(--oba-orange-deep))',
  },
]

export function DepartmentsGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {DEPARTMENTS.map((department) => (
        <DepartmentCard key={department.href} {...department} />
      ))}
    </div>
  )
}
