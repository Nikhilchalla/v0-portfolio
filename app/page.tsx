"use client"

import { useState, useEffect } from "react"
import TerminalShell from "@/components/terminal/terminal-shell"
import { TerminalProvider } from "@/components/terminal/terminal-context"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <TerminalProvider>
      <TerminalShell />
    </TerminalProvider>
  )
}
