import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import type { StoryItem, ProductBadge as ProductBadgeType } from '#/data/products'
import { ProductImage } from '#/components/product/ProductImage'
import { ProductBadge } from '#/components/product/ProductBadge'

const IMAGE_DURATION_MS = 5000

// Visualizador de mídias em formato Stories/Status (imagens e vídeos verticais curtos).
// Sem stories cadastradas, cai automaticamente para a imagem padrão do produto.
export function StoryViewer({
  items,
  fallbackImage,
  alt,
  badge,
}: {
  items: StoryItem[]
  fallbackImage: string
  alt: string
  badge?: ProductBadgeType
}) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pausedRef = useRef(false)
  const rafRef = useRef<number | undefined>(undefined)

  const hasStories = items.length > 0
  const current = hasStories ? items[index % items.length] : undefined

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  function goNext() {
    setIndex((i) => (i + 1) % items.length)
  }

  function goPrev() {
    setIndex((i) => (i - 1 + items.length) % items.length)
  }

  // Avança imagens automaticamente após IMAGE_DURATION_MS; vídeos avançam pelo evento onEnded.
  useEffect(() => {
    if (!hasStories || current?.type === 'video') return

    setProgress(0)
    let start = performance.now()
    let elapsed = 0

    function tick(now: number) {
      if (pausedRef.current) {
        start = now - elapsed
      } else {
        elapsed = now - start
      }
      const ratio = Math.min(elapsed / IMAGE_DURATION_MS, 1)
      setProgress(ratio)
      if (ratio >= 1) {
        goNext()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [index, hasStories, current?.type])

  // Mantém o elemento <video> sincronizado com o estado de pausa.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused) video.pause()
    else video.play().catch(() => {})
  }, [paused, index])

  useEffect(() => {
    setProgress(0)
  }, [index])

  if (!hasStories || !current) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl">
        <ProductImage image={fallbackImage} alt={alt} className="h-full w-full" />
        {badge && <ProductBadge badge={badge} className="absolute left-4 top-4" />}
      </div>
    )
  }

  function handleVideoTimeUpdate() {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress(video.currentTime / video.duration)
  }

  return (
    <div className="relative aspect-[9/16] max-h-[560px] w-full overflow-hidden rounded-3xl bg-black sm:aspect-square">
      <div className="absolute inset-x-3 top-3 z-20 flex gap-1.5">
        {items.map((item, itemIndex) => (
          <div key={item.src + itemIndex} className="h-1 flex-1 overflow-hidden rounded-full bg-white/35">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
              style={{
                width: itemIndex < index ? '100%' : itemIndex === index ? `${progress * 100}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {badge && <ProductBadge badge={badge} className="absolute left-4 top-8 z-20" />}

      {current.type === 'video' ? (
        <video
          ref={videoRef}
          src={current.src}
          className="h-full w-full object-cover"
          autoPlay
          muted={muted}
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={goNext}
        />
      ) : (
        <img src={current.src} alt={current.caption ?? alt} className="h-full w-full object-cover" />
      )}

      {current.caption && (
        <p className="text-shadow-soft absolute inset-x-4 bottom-16 z-20 text-sm font-semibold text-white">
          {current.caption}
        </p>
      )}

      <button
        type="button"
        aria-label="Story anterior"
        className="absolute inset-y-0 left-0 z-10 w-1/3"
        onClick={goPrev}
      />
      <button
        type="button"
        aria-label="Próximo story"
        className="absolute inset-y-0 right-0 z-10 w-1/3"
        onClick={goNext}
      />

      <div className="absolute bottom-3 right-3 z-20 flex gap-2">
        {current.type === 'video' && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Ativar som' : 'Silenciar'}
            className="flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reproduzir' : 'Pausar'}
          className="flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
        >
          {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
      </div>
    </div>
  )
}
