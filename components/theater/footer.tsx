import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function TheaterFooter() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="h-3 w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 10px, color-mix(in oklch, var(--accent) 70%, black) 10px, color-mix(in oklch, var(--accent) 70%, black) 20px)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent font-serif text-lg font-bold text-accent"
            >
              T
            </span>
            <span className="font-serif text-xl font-semibold tracking-wide">TEATRO-UNA</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
            Un espacio dedicado al arte escénico desde 1958. Dramaturgia, danza, ópera y conciertos
            en el corazón de la ciudad.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-accent">Contacto</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-primary-foreground/90">
                Av. del Teatro 1024,
                <br />
                Centro Histórico, Bogotá
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href="tel:+5716012345"
                className="text-primary-foreground/90 transition-colors hover:text-accent"
              >
                +57 (1) 601 2345
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href="mailto:reservas@teatro-una.com"
                className="text-primary-foreground/90 transition-colors hover:text-accent"
              >
                reservas@teatro-una.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-accent">Horarios</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/90">
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-medium">Taquilla</p>
                <p className="text-primary-foreground/70">Lun – Sáb · 10:00 a 20:00</p>
                <p className="text-primary-foreground/70">Dom · 12:00 a 18:00</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base font-semibold text-accent">Información</h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-primary-foreground/90">
            <li>
              <a href="#" className="transition-colors hover:text-accent">
                Cartelera
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-accent">
                Abonos y membresías
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-accent">
                Política de reembolsos
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-accent">
                Accesibilidad
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-primary-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} TEATRO-UNA · Todos los derechos reservados.</p>
          <p className="font-serif italic">“El arte es la mentira que nos permite conocer la verdad.”</p>
        </div>
      </div>
    </footer>
  )
}
