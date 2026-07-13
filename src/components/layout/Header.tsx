import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LifeBuoy, Menu, Search, X } from 'lucide-react'
import { Logo } from '#/components/layout/Logo'
import { SearchBar } from '#/components/layout/SearchBar'
import { Button } from '#/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '#/components/ui/sheet'
import { mainNav } from '#/lib/nav'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="page-wrap flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {mainNav.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link text-sm" activeProps={{ className: 'is-active' }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </Button>

          <Button variant="outline" size="sm" className="hidden gap-2 rounded-full sm:inline-flex" asChild>
            <Link to="/suporte">
              <LifeBuoy className="size-4" aria-hidden="true" />
              Suporte
            </Link>
          </Button>

          <MobileMenu />
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[var(--line)] bg-background/95 px-4 py-3">
          <div className="page-wrap">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="Navegação mobile">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              activeProps={{ className: 'bg-muted' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 px-4">
          <SearchBar />
        </div>
      </SheetContent>
    </Sheet>
  )
}
