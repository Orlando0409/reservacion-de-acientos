export function Legend() {
  const items = [
    { label: "Disponible", className: "border-primary/30 bg-card" },
    { label: "Seleccionado", className: "border-accent bg-accent" },
    { label: "Ocupado", className: "border-border bg-muted" },
  ]

  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`inline-block h-5 w-5 rounded-t-md rounded-b-sm border ${item.className}`}
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
