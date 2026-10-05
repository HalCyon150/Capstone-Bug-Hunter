import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-bh-border bg-bh-primary mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
        
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-base tracking-tight mb-3">
            <span className="text-bh-yellow text-lg">🪲</span> BugHunter
          </Link>
          <p className="text-bh-muted max-w-sm leading-relaxed">
            Plataforma de desafíos prácticos y resolución de bugs reales para estudiantes de Informática de Duoc UC.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white tracking-wider uppercase mb-3">Plataforma</h4>
          <ul className="space-y-2 text-bh-muted">
            <li><Link href="/" className="hover:text-bh-yellow transition">Tareas Disponibles</Link></li>
            <li><Link href="/mis-tareas" className="hover:text-bh-yellow transition">Mis Tareas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white tracking-wider uppercase mb-3">Recursos</h4>
          <ul className="space-y-2 text-bh-muted">
            <li><Link href="/tutorial" className="hover:text-bh-yellow transition">Tutorial Git & GitHub</Link></li>
            <li><a href="https://duoc.cl" target="_blank" rel="noreferrer" className="hover:text-bh-yellow transition">Portal Duoc UC</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white tracking-wider uppercase mb-3">Proyecto</h4>
          <p className="text-bh-muted leading-relaxed">
            Proyecto de Título 2026.
          </p>
        </div>

      </div>

      <div className="border-t border-bh-border py-4 text-center text-bh-muted text-[11px]">
        © 2026 BugHunter. Todos los derechos reservados.
      </div>
    </footer>
  );
}