"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, Plus, Ticket, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import emailjs from '@emailjs/browser'

type ReservationFormProps = {
  quantity: number
  setQuantity: (n: number) => void
  selectedSeats: string[]
  onRemoveSeat: (id: string) => void
  onConfirm: (info: { name: string; email: string; zone: string }) => void
  pricePerSeat: number
  maxQuantity?: number
}

export function ReservationForm({
  quantity,
  setQuantity,
  selectedSeats,
  onRemoveSeat,
  onConfirm,
  pricePerSeat,
  maxQuantity = 10,
}: ReservationFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [zone, setZone] = useState("platea")
  const [confirmed, setConfirmed] = useState(false)

  const total = selectedSeats.length * pricePerSeat
  const needsMore = selectedSeats.length < quantity
  const canConfirm =
    name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    selectedSeats.length === quantity &&
    quantity > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canConfirm) return
    onConfirm({ name, email, zone })

    const reservationId = Math.random().toString(36).substr(2, 8).toUpperCase()

    try {
      await emailjs.send(
        'service_owprglt', // Reemplazar con tu Service ID
        'template_59jrn5y', // Reemplazar con tu Template ID
        {
          customer_name: name,
          email: email,
          reservation_id: reservationId,
          zone: zone.charAt(0).toUpperCase() + zone.slice(1),
          seats: selectedSeats.join(", "),
          quantity: quantity,
          total_price: total.toLocaleString("es-CO"),
        },
        'OiD3g3jsiZS27dFyF' // Reemplazar con tu Public Key
      )
    } catch (err) {
      console.error("Error enviando correo de reserva mediante emailjs: ", err)
    }

    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 4000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Ticket className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="font-serif text-xl font-semibold text-foreground">Tu reserva</h3>
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity" className="text-sm font-medium">
          Cantidad de asientos
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Disminuir cantidad"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => {
              const v = Number.parseInt(e.target.value || "1", 10)
              if (Number.isNaN(v)) return
              setQuantity(Math.min(maxQuantity, Math.max(1, v)))
            }}
            className="text-center font-serif text-lg"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Aumentar cantidad"
            onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
            disabled={quantity >= maxQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Máximo {maxQuantity} asientos por reserva. Selecciona los asientos en el plano.
        </p>
      </div>

      {/* Zone */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="zone" className="text-sm font-medium">
          Zona preferida
        </Label>
        <Select value={zone} onValueChange={setZone}>
          <SelectTrigger id="zone">
            <SelectValue placeholder="Selecciona una zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="platea">Platea · $45.000</SelectItem>
            <SelectItem value="palco">Palco · $60.000</SelectItem>
            <SelectItem value="galeria">Galería · $25.000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nombre completo
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
          />
        </div>
      </div>

      {/* Selected seats */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">
            Asientos elegidos ({selectedSeats.length}/{quantity})
          </Label>
        </div>
        {selectedSeats.length === 0 ? (
          <p className="rounded-md border border-dashed border-border bg-muted/40 p-3 text-center text-xs text-muted-foreground">
            Aún no has seleccionado asientos. Toca un asiento disponible en el plano.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {selectedSeats.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onRemoveSeat(id)}
                  aria-label={`Quitar asiento ${id}`}
                  className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent/80 px-3 py-1 font-serif text-sm text-accent-foreground transition-colors hover:bg-accent"
                >
                  {id}
                  <span aria-hidden="true" className="text-xs opacity-70">
                    ×
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {needsMore && quantity > 0 && (
          <p className="text-xs text-primary">
            Te faltan {quantity - selectedSeats.length} asiento(s) por elegir.
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">Total estimado</span>
        <span className="font-serif text-2xl font-semibold text-foreground">
          ${total.toLocaleString("es-CO")}
        </span>
      </div>

      {/* Confirm */}
      <Button
        type="submit"
        size="lg"
        disabled={!canConfirm}
        className={cn("w-full gap-2", confirmed && "bg-accent text-accent-foreground hover:bg-accent")}
      >
        {confirmed ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            ¡Reserva confirmada!
          </>
        ) : (
          <>
            <Ticket className="h-5 w-5" />
            Confirmar reserva
          </>
        )}
      </Button>

      {confirmed && (
        <p role="status" className="text-center text-xs text-muted-foreground">
          Hemos enviado los detalles a <span className="font-semibold text-foreground">{email}</span>.
        </p>
      )}
    </form>
  )
}
