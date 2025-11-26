"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type Command =
  | "home"
  | "portfolio"
  | "wallet"
  | "nfts"
  | "experience"
  | "skills"
  | "socials"
  | "contact"
  | "about"
  | "clear"

interface TerminalContextType {
  currentCommand: Command
  setCurrentCommand: (cmd: Command) => void
  history: string[]
  addToHistory: (cmd: string) => void
  clearHistory: () => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [currentCommand, setCurrentCommand] = useState<Command>("home")
  const [history, setHistory] = useState<string[]>(["Welcome to 0xTitan terminal. Type 'help' for commands."])

  const addToHistory = (cmd: string) => {
    setHistory((prev) => [...prev, cmd])
  }

  const clearHistory = () => {
    setHistory(["Welcome to 0xTitan terminal. Type 'help' for commands."])
  }

  return (
    <TerminalContext.Provider value={{ currentCommand, setCurrentCommand, history, addToHistory, clearHistory }}>
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (!context) throw new Error("useTerminal must be used within TerminalProvider")
  return context
}
