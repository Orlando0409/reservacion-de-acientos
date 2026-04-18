"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

export function TheaterHeader() {
  const [currentDate, setCurrentDate] = useState("Cargando fecha...")
  const [currentTime, setCurrentTime] = useState("--:-- h")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      const dateString = now.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric"
      })
      
      const timeString = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit"
      })

      // Capitalizar la primera letra del día
      setCurrentDate(dateString.charAt(0).toUpperCase() + dateString.slice(1).replace(".", ""))
      setCurrentTime(`${timeString} h`)
    }

    updateTime()
    const timer = setInterval(updateTime, 60000) // Actualizar cada minuto
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, var(--accent) 0, transparent 40%), radial-gradient(circle at 80% 0%, var(--accent) 0, transparent 40%)",
        }}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent font-serif text-2xl font-bold text-accent"
          >
            T
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
              Sala Principal
            </p>
            <h1 className="font-serif text-2xl font-semibold leading-none tracking-wide md:text-3xl">
              TEATRO-UNA
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-primary-foreground/90">{currentDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-primary-foreground/90">{currentTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-primary-foreground/90">Sala Principal</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8 md:pb-10">
        <p className="max-w-2xl font-serif text-lg italic leading-relaxed text-primary-foreground/90 md:text-xl">
          “Hamlet” · Una reinterpretación contemporánea del clásico de Shakespeare, dirigida por
          Elena Marconi.
        </p>
      </div>
    </header>
  )
}
