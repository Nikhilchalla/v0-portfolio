"use client"

import { useTerminal } from "./terminal-context"

export default function TerminalHeader() {
  const { currentCommand } = useTerminal()

  const getTitle = () => {
    const titles: Record<string, string> = {
      home: "Welcome",
      portfolio: "Portfolio Holdings",
      wallet: "Wallet Status",
      nfts: "NFT Collection",
      experience: "Experience & Achievements",
      skills: "Technical Skills",
      socials: "Social Links",
      contact: "Get in Touch",
      about: "About 0xTitan",
      clear: "Terminal Cleared",
    }
    return titles[currentCommand] || "Terminal"
  }

  return (
    <div className="border-b border-terminal-accent/30 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-terminal-accent/10 to-transparent backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-terminal-accent glitch-text truncate">
              0xTitan.network
            </h1>
            <p className="text-terminal-secondary text-sm sm:text-base md:text-lg font-semibold mt-2">
              Web3 [C]ommunity [M]anager • [B]usiness [D]eveloper
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-terminal-accent text-xs md:text-sm">
              <div className="flex items-center gap-2 justify-end">
                <div className="w-2 h-2 rounded-full bg-terminal-accent pulse-glow"></div>
                <span className="hidden sm:inline">ONLINE</span>
                <span className="sm:hidden">●</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
