export type AppRoute =
  | '/'
  | '/departamentos'
  | '/achados'
  | '/ofertas'
  | '/digital'
  | '/negocios'
  | '/sobre'
  | '/suporte'
  | '/politica-de-privacidade'
  | '/termos'
  | '/aviso-de-afiliados'

export interface NavItem {
  label: string
  href: AppRoute
}

export const mainNav: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Departamentos', href: '/departamentos' },
  { label: 'Achados', href: '/achados' },
  { label: 'Ofertas', href: '/ofertas' },
  { label: 'Oba Digital', href: '/digital' },
  { label: 'Negócios', href: '/negocios' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Suporte', href: '/suporte' },
]

export const footerInstitutional: NavItem[] = [
  { label: 'Sobre a Oba', href: '/sobre' },
  { label: 'Suporte', href: '/suporte' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { label: 'Termos de Uso', href: '/termos' },
  { label: 'Aviso de Afiliados', href: '/aviso-de-afiliados' },
]

export const footerDepartments: NavItem[] = [
  { label: 'Achados', href: '/achados' },
  { label: 'Ofertas', href: '/ofertas' },
  { label: 'Oba Digital', href: '/digital' },
  { label: 'Negócios', href: '/negocios' },
]

// Preencha facebookUrl e whatsappUrl com os canais reais da Oba On Shop.
// Enquanto vazios, os botões correspondentes ficam ocultos no rodapé e no suporte.
export const SITE = {
  name: 'Oba On Shop',
  instagramHandle: '@obaonshop',
  instagramUrl: 'https://www.instagram.com/obaonshop/',
  facebookUrl: '',
  whatsappUrl: '',
  description: 'Seu shopping online de soluções e bons achados.',
}
