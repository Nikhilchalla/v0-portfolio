"use client"

import type React from "react"

interface TerminalOutputProps {
  children: React.ReactNode
  title?: string
}

export default function TerminalOutput({ children, title }: TerminalOutputProps) {
  return (
    <div className="space-y-3">
      {title && (
        <div className="text-terminal-accent font-bold border-l-2 border-terminal-accent pl-3 py-1">{title}</div>
      )}
      <div className="bg-terminal-surface/50 border border-terminal-accent/20 rounded-lg p-4 md:p-6 backdrop-blur-sm hover:border-terminal-accent/40 transition-colors">
        {children}
      </div>
    </div>
  )
}
