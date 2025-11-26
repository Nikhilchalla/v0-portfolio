"use client"

import { useRef, useEffect } from "react"
import { useTerminal } from "./terminal-context"
import TerminalHeader from "./terminal-header"
import TerminalInput from "./terminal-input"
import PortfolioView from "./views/portfolio-view"
import NFTView from "./views/nft-view"
import AboutView from "./views/about-view"
import SocialsView from "./views/socials-view"
import ContactView from "./views/contact-view"
import HelpView from "./views/help-view"

export default function TerminalShell() {
  const { currentCommand, history } = useTerminal()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, currentCommand])

  const renderView = () => {
    switch (currentCommand) {
      case "portfolio":
        return <PortfolioView />
      case "nfts":
        return <NFTView />
      case "about":
        return <AboutView />
      case "socials":
        return <SocialsView />
      case "contact":
        return <ContactView />
      default:
        return <HelpView />
    }
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono overflow-hidden flex flex-col">
      <TerminalHeader />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 space-y-4 scrollbar-thin scrollbar-thumb-terminal-accent scrollbar-track-terminal-bg"
      >
        <div className="max-w-6xl mx-auto w-full">
          {history.map((line, idx) => (
            <div key={idx} className="text-terminal-muted text-xs sm:text-xs md:text-sm opacity-70 break-words">
              {line}
            </div>
          ))}

          <div className="mt-6 animate-fade-in">{renderView()}</div>
        </div>
      </div>

      <TerminalInput />
    </div>
  )
}
