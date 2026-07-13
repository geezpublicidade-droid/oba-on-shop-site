import { createFileRoute } from '@tanstack/react-router'
import { SectionHeader } from '#/components/shared/SectionHeader'
import { DepartmentsGrid } from '#/components/shared/DepartmentsGrid'

export const Route = createFileRoute('/departamentos')({
  head: () => ({
    meta: [
      { title: 'Departamentos | Oba On Shop' },
      { name: 'description', content: 'Explore os departamentos da Oba On Shop: achados, ofertas, digital e negócios.' },
    ],
  }),
  component: DepartamentosPage,
})

function DepartamentosPage() {
  return (
    <div className="page-wrap py-10">
      <SectionHeader
        kicker="Oba On Shop"
        title="Seu shopping online de soluções e bons achados"
        description="Escolha um departamento e encontre produtos, ofertas e soluções selecionadas para sua rotina e seu negócio."
      />
      <div className="mt-8">
        <DepartmentsGrid />
      </div>
    </div>
  )
}
