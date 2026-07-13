export function SectionHeader({
  kicker,
  title,
  description,
  align = 'left',
  tone = 'default',
}: {
  kicker?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'default' | 'light'
}) {
  const isLight = tone === 'light'

  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {kicker && (
        <p
          className={`island-kicker text-sm font-bold uppercase tracking-widest ${isLight ? 'text-shadow-soft text-white/90' : 'text-primary'}`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`display-title mt-2 text-3xl font-bold sm:text-4xl ${isLight ? 'text-shadow-soft text-white' : 'text-foreground'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-lg ${isLight ? 'text-shadow-soft text-white/95' : 'text-muted-foreground'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
