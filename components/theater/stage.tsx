export function Stage() {
  return (
    <div className="relative w-full">
      {/* Curtain top */}
      <div
        aria-hidden="true"
        className="h-6 w-full rounded-t-md"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--primary) 0px, var(--primary) 14px, color-mix(in oklch, var(--primary) 75%, black) 14px, color-mix(in oklch, var(--primary) 75%, black) 28px)",
          boxShadow: "inset 0 -6px 12px rgba(0,0,0,0.35)",
        }}
      />

      {/* Stage arc */}
      <div className="relative mx-auto w-full overflow-hidden">
        <svg
          viewBox="0 0 800 140"
          preserveAspectRatio="none"
          className="block h-24 w-full sm:h-28 md:h-32"
          role="img"
          aria-label="Escenario del teatro"
        >
          <defs>
            <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklch, var(--accent) 35%, var(--card))" />
              <stop offset="100%" stopColor="var(--card)" />
            </linearGradient>
          </defs>

          {/* Stage floor arc */}
          <path d="M 0 140 L 0 40 Q 400 -40 800 40 L 800 140 Z" fill="url(#stageGrad)" />
          <path d="M 40 140 L 40 55 Q 400 -10 760 55 L 760 140 Z" fill="url(#floorGrad)" />

          {/* Spotlights */}
          <g opacity="0.55">
            <path d="M 180 0 L 240 120 L 120 120 Z" fill="var(--accent)" opacity="0.25" />
            <path d="M 400 0 L 460 120 L 340 120 Z" fill="var(--accent)" opacity="0.3" />
            <path d="M 620 0 L 680 120 L 560 120 Z" fill="var(--accent)" opacity="0.25" />
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-sm tracking-[0.4em] text-primary-foreground sm:text-base md:text-lg">
            ESCENARIO
          </span>
        </div>
      </div>
    </div>
  )
}
