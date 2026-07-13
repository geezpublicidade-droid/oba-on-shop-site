import { CheckCircle2 } from 'lucide-react'

export function ProductHowItWorks({ steps }: { steps: string[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">Como funciona</h2>
      <ol className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="oba-card flex flex-col gap-2 px-4 py-5">
            <span className="gradient-oba-hero flex size-8 items-center justify-center rounded-full text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="flex items-start gap-1.5 text-sm font-medium text-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
