"use client"

import { cn } from "@/lib/utils"

export type SeatStatus = "available" | "occupied" | "selected"

export type Seat = {
  id: string
  row: string
  number: number
  status: SeatStatus
}

type SeatMapProps = {
  rows: string[]
  seatsPerRow: number
  occupied: Set<string>
  selected: Set<string>
  onToggle: (id: string) => void
}

export function SeatMap({ rows, seatsPerRow, occupied, selected, onToggle }: SeatMapProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto flex min-w-max flex-col items-center gap-2 py-2">
        {rows.map((row, rIdx) => (
          <div key={row} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="w-6 text-center font-serif text-sm font-semibold text-muted-foreground"
            >
              {row}
            </span>

            <div
              className="flex items-center gap-1.5"
              // Slight fan effect: middle rows a touch wider feel via padding
              style={{ paddingInline: `${Math.max(0, 4 - rIdx) * 2}px` }}
            >
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const num = i + 1
                const id = `${row}${num}`
                const isOccupied = occupied.has(id)
                const isSelected = selected.has(id)

                // Aisle gap in the middle
                const gap = num === Math.floor(seatsPerRow / 2) + 1

                return (
                  <div key={id} className={cn("flex items-center", gap && "ml-3")}>
                    <button
                      type="button"
                      onClick={() => !isOccupied && onToggle(id)}
                      disabled={isOccupied}
                      aria-pressed={isSelected}
                      aria-label={`Fila ${row}, asiento ${num}, ${
                        isOccupied ? "ocupado" : isSelected ? "seleccionado" : "disponible"
                      }`}
                      className={cn(
                        "relative flex h-7 w-7 items-center justify-center rounded-t-md rounded-b-sm border text-[10px] font-medium transition-all sm:h-8 sm:w-8 sm:text-xs",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isOccupied &&
                          "cursor-not-allowed border-border bg-muted text-muted-foreground/60 line-through",
                        !isOccupied &&
                          !isSelected &&
                          "cursor-pointer border-primary/30 bg-card text-foreground hover:border-primary hover:bg-primary/10",
                        isSelected &&
                          "cursor-pointer border-accent bg-accent text-accent-foreground shadow-md",
                      )}
                    >
                      {/* Seat back detail */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute inset-x-1 top-0.5 h-1 rounded-full",
                          isOccupied && "bg-muted-foreground/30",
                          !isOccupied && !isSelected && "bg-primary/30",
                          isSelected && "bg-accent-foreground/40",
                        )}
                      />
                      <span className="mt-0.5 leading-none">{num}</span>
                    </button>
                  </div>
                )
              })}
            </div>

            <span
              aria-hidden="true"
              className="w-6 text-center font-serif text-sm font-semibold text-muted-foreground"
            >
              {row}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
