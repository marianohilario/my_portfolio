'use client'

const links = [
  { href: 'https://github.com/marianohilario', icon: 'ri-github-fill', label: 'GitHub', socialClass: 'social-github' },
  { href: 'https://www.linkedin.com/in/marianohilario/', icon: 'ri-linkedin-box-fill', label: 'LinkedIn', socialClass: 'social-linkedin' },
  { href: 'https://wa.me/5491151339874', icon: 'ri-whatsapp-fill', label: 'WhatsApp', socialClass: 'social-whatsapp' },
  { href: 'mailto:marianohilario@gmail.com', icon: 'ri-mail-fill', label: 'Email', socialClass: 'social-email' },
]

export default function SocialSidebar() {
  return (
    <aside className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
      {links.map(({ href, icon, label, socialClass }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          aria-label={label}
          className={`glass-card social-link ${socialClass} w-9 h-9 flex items-center justify-center no-underline`}
        >
          <i className={`${icon} text-lg`} />
        </a>
      ))}
      <div className="w-px h-12" style={{ background: 'var(--glass-border)' }} />
    </aside>
  )
}
