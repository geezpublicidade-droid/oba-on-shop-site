import { SectionHeader } from '#/components/shared/SectionHeader'
import { DepartmentsGrid } from '#/components/shared/DepartmentsGrid'

export function DepartmentsSection() {
  return (
    <section className="page-wrap py-14">
      <SectionHeader kicker="Departamentos" title="Explore nossos departamentos" />
      <div className="mt-8">
        <DepartmentsGrid />
      </div>
    </section>
  )
}
