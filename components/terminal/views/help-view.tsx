"use client"

import TerminalOutput from "../terminal-output"

export default function HelpView() {
  const commands = [
    {
      cmd: "portfolio",
      description: "View your crypto holdings and wallet balances across all chains",
    },
    {
      cmd: "nfts",
      description: "Browse your NFT collection from Solana and EVM chains",
    },
    {
      cmd: "about",
      description: "Your background, experience, and technical skills",
    },
    {
      cmd: "socials",
      description: "Connect via social media and messaging platforms",
    },
    {
      cmd: "contact",
      description: "Send a message or get in touch",
    },
    {
      cmd: "help",
      description: "Display this help menu",
    },
    {
      cmd: "clear",
      description: "Clear terminal history",
    },
  ]

  return (
    <div className="space-y-6">
      <TerminalOutput title="AVAILABLE COMMANDS">
        <div className="space-y-2">
          {commands.map((cmd, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 hover:bg-terminal-accent/10 rounded transition-colors">
              <span className="text-terminal-accent font-mono font-bold min-w-32 md:min-w-40">{cmd.cmd}</span>
              <span className="text-terminal-text text-sm">{cmd.description}</span>
            </div>
          ))}
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        {"Ready to explore? Start with 'portfolio' to see your crypto holdings."}
      </div>
    </div>
  )
}
