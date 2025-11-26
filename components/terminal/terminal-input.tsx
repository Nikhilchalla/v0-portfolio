"use client"

import type React from "react"

import { useState } from "react"
import { useTerminal } from "./terminal-context"

const COMMANDS = ["portfolio", "nfts", "about", "socials", "contact", "help", "clear"]

export default function TerminalInput() {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { setCurrentCommand, addToHistory, clearHistory } = useTerminal()

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    addToHistory(`> ${cleanCmd}`)

    if (cleanCmd === "clear") {
      clearHistory()
      return
    }

    if (cleanCmd === "help") {
      setCurrentCommand("home")
    } else if (COMMANDS.includes(cleanCmd)) {
      setCurrentCommand(cleanCmd as any)
    } else {
      addToHistory(`command not found: ${cleanCmd}. Type 'help' for available commands.`)
    }

    setInput("")
    setSuggestions([])
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    if (value.length > 0) {
      const filtered = COMMANDS.filter((cmd) => cmd.toLowerCase().startsWith(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault()
      const firstSuggestion = suggestions[0]
      setInput(firstSuggestion)
      setSuggestions([])
    }
  }

  return (
    <div className="border-t border-terminal-accent/30 p-3 sm:p-4 md:p-8 bg-gradient-to-t from-terminal-accent/5 to-transparent backdrop-blur-sm sticky bottom-0">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div className="flex items-center gap-2 bg-terminal-surface/50 border border-terminal-accent/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 hover:border-terminal-accent/60 focus-within:border-terminal-accent transition-colors">
            <span className="text-terminal-accent shrink-0">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (try: portfolio, nfts, help)"
              className="flex-1 bg-transparent outline-none text-terminal-text placeholder:text-terminal-muted/50 text-xs sm:text-sm md:text-base min-w-0"
              autoFocus
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-terminal-surface border border-terminal-accent/30 rounded-lg overflow-hidden z-10">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion)
                    setSuggestions([])
                  }}
                  className="w-full text-left px-4 py-2 text-terminal-text hover:bg-terminal-accent/20 text-xs sm:text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
