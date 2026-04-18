"use client"

import { useMemo, useState, useEffect } from "react"
import { TheaterHeader } from "@/components/theater/header"
import { Stage } from "@/components/theater/stage"
import { SeatMap } from "@/components/theater/seat-map"
import { Legend } from "@/components/theater/legend"
import { ReservationForm } from "@/components/theater/reservation-form"
import { TheaterFooter } from "@/components/theater/footer"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const SEATS_PER_ROW = 14
const PRICE_PER_SEAT = 45000

// Asientos ocupados iniciales por defecto.
const INITIAL_OCCUPIED_SEATS = [
  "A3", "A4", "A9",
  "B6", "B7",
  "C2", "C11", "C12",
  "D5", "D8",
  "E1", "E13",
  "F4", "F5", "F10",
  "G7", "G8", "G9",
  "H2", "H3", "H12",
  "I6", "I11",
  "J1", "J2", "J13", "J14",
]

export default function Page() {
  const [quantity, setQuantity] = useState(2)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [occupied, setOccupied] = useState<Set<string>>(new Set(INITIAL_OCCUPIED_SEATS))
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
    const stored = localStorage.getItem("occupiedSeats")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setOccupied(new Set(parsed))
        }
      } catch (e) {
        console.error("Error parsing occupiedSeats from localStorage", e)
      }
    } else {
      localStorage.setItem("occupiedSeats", JSON.stringify(INITIAL_OCCUPIED_SEATS))
    }
  }, [])


  const selectedArray = useMemo(() => Array.from(selected).sort(), [selected])

  function toggleSeat(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        return next
      }
      // Si alcanzamos la cantidad, remover el más antiguo y agregar el nuevo
      if (next.size >= quantity) {
        const first = next.values().next().value
        if (first) next.delete(first)
      }
      next.add(id)
      return next
    })
  }

  function removeSeat(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function handleQuantityChange(n: number) {
    setQuantity(n)
    // Recortar la selección si excede la nueva cantidad
    setSelected((prev) => {
      if (prev.size <= n) return prev
      const arr = Array.from(prev).slice(0, n)
      return new Set(arr)
    })
  }

  function handleConfirm() {
    if (selected.size === 0) return

    setOccupied((prev) => {
      const next = new Set(prev)
      selected.forEach((seat) => next.add(seat))
      localStorage.setItem("occupiedSeats", JSON.stringify(Array.from(next)))
      return next
    })
    
    setSelected(new Set())
    
    toast({
      title: "Reserva exitosa",
      description: "Tus asientos han sido guardados.",
    })
  }

  // --- Requisito: algoritmo suggest ---
  function suggest(numberOfSeats: number): Set<number> {
    const defaultRes = new Set<number>()
    // 1. Construir la matriz
    const matrix: { id: number; estado: boolean }[][] = []
    for (let r = 0; r < ROWS.length; r++) {
      const rowArr = []
      for (let c = 1; c <= SEATS_PER_ROW; c++) {
        const intId = r * SEATS_PER_ROW + c
        const stringId = `${ROWS[r]}${c}` // ej. "A1"
        const isOccupied = occupied.has(stringId)
        rowArr.push({ id: intId, estado: isOccupied })
      }
      matrix.push(rowArr)
    }

    if (matrix.length === 0) return defaultRes
    const rowSize = matrix[0].length

    // Regla 1: cantidad excede el tamaño de la fila
    if (numberOfSeats > rowSize) return defaultRes

    // Centro del teatro en las filas
    const center = (matrix.length - 1) / 2
    
    // Regla 3: fila más cercana al centro del teatro
    const sortedRowIndices = Array.from({ length: matrix.length }, (_, i) => i)
      .sort((a, b) => Math.abs(a - center) - Math.abs(b - center))

    // Regla 2 y búsqueda
    for (let rIdx of sortedRowIndices) {
      const row = matrix[rIdx]
      let count = 0
      let startIndex = -1

      for (let cIdx = 0; cIdx < row.length; cIdx++) {
        if (!row[cIdx].estado) { // Libre
          if (count === 0) startIndex = cIdx
          count++
          if (count === numberOfSeats) {
            const seatsSet = new Set<number>()
            for (let i = 0; i < numberOfSeats; i++) {
              seatsSet.add(row[startIndex + i].id)
            }
            return seatsSet
          }
        } else {
          count = 0 // Reiniciar conteo
          startIndex = -1
        }
      }
    }
    // Si ninguna fila tiene suficientes asientos
    return defaultRes
  }

  function handleSuggest() {
    const suggestedIds = suggest(quantity)

    if (suggestedIds.size === 0) {
      toast({
        variant: "destructive",
        title: "No hay asientos disponibles",
        description: "No se encontraron suficientes asientos contiguos libres para la cantidad solicitada.",
      })
      setSelected(new Set())
      return
    }

    const newSelected = new Set<string>()
    for (const intId of suggestedIds) {
      const r = Math.floor((intId - 1) / SEATS_PER_ROW)
      const c = ((intId - 1) % SEATS_PER_ROW) + 1
      newSelected.add(`${ROWS[r]}${c}`)
    }
    
    setSelected(newSelected)
    toast({
      title: "Asientos sugeridos",
      description: `Se han preseleccionado ${quantity} asientos contiguos cerca del centro.`,
    })
  }
  // -------------------------------------

  if (!isClient) {
    return null // Evitar hidratación mismatch inicialmente si es necesario o mostrar un loader.
  }

  return (
    <main className="min-h-screen bg-background">
      <TheaterHeader />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Izquierda: escenario + mapa de asientos */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-3 text-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Vista desde la platea
                </p>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  Elige tus asientos
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSuggest} 
                  className="rounded-full shadow-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Sugerir {Math.max(1, quantity)} {quantity === 1 ? "asiento" : "asientos"}
                </Button>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <Stage />

                <div className="mt-8">
                  <SeatMap
                    rows={ROWS}
                    seatsPerRow={SEATS_PER_ROW}
                    occupied={occupied}
                    selected={selected}
                    onToggle={toggleSeat}
                  />
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <Legend />
                </div>
              </div>
            </div>

            <aside className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
              <p className="font-serif text-base font-semibold text-foreground">
                Información útil
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Las puertas se abren 30 minutos antes de la función.</li>
                <li>No se permite el ingreso una vez iniciado el espectáculo.</li>
                <li>Reserva válida al presentar documento de identidad en taquilla.</li>
              </ul>
            </aside>
          </div>

          {/* Derecha: formulario de reserva */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ReservationForm
              quantity={quantity}
              setQuantity={handleQuantityChange}
              selectedSeats={selectedArray}
              onRemoveSeat={removeSeat}
              onConfirm={handleConfirm}
              pricePerSeat={PRICE_PER_SEAT}
            />
          </div>
        </div>
      </section>

      <TheaterFooter />
    </main>
  )
}
