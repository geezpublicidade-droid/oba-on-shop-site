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
          className={`island-kicker text-xs font-bold uppercase tracking-widest ${isLight ? 'text-white/85' : 'text-primary'}`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`display-title mt-2 text-2xl font-bold sm:text-3xl ${isLight ? 'text-white' : 'text-foreground'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base ${isLight ? 'text-white/90' : 'text-muted-foreground'}`}>{description}</p>
      )}
    </div>
  )
}
