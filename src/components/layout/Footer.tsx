import { Link } from '@tanstack/react-router'
import { Instagram, Facebook, MessageCircle } from 'lucide-react'
import { Logo } from '#/components/layout/Logo'
import { footerDepartments, footerInstitutional, SITE } from '#/lib/nav'

export function Footer() {
  return (
    <footer className="site-footer mt-20">
      <div className="page-wrap grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A Oba On Shop reúne produtos, ofertas, soluções digitais e indicações selecionadas em um só
            lugar.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Oba On Shop"
              className="oba-card flex size-10 items-center justify-center text-foreground hover:text-primary"
            >
              <Instagram className="size-5" />
            </a>
            {SITE.facebookUrl && (
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Oba On Shop"
                className="oba-card flex size-10 items-center justify-center text-foreground hover:text-primary"
              >
                <Facebook className="size-5" />
              </a>
            )}
            {SITE.whatsappUrl && (
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Oba On Shop"
                className="oba-card flex size-10 items-center justify-center text-foreground hover:text-primary"
              >
                <MessageCircle className="size-5" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Departamentos</h3>
          <ul className="mt-4 space-y-2.5">
            {footerDepartments.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Institucional</h3>
          <ul className="mt-4 space-y-2.5">
            {footerInstitutional.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-5">
        <p className="page-wrap text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
