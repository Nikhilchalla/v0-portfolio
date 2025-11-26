"use client"

import TerminalOutput from "../terminal-output"

interface Social {
  platform: string
  handle: string
  url: string
  icon: string
}

export default function SocialsView() {
  const socials: Social[] = [
    {
      platform: "Twitter",
      handle: "@0xTitan",
      url: "https://twitter.com/0xTitan",
      icon: "𝕏",
    },
    {
      platform: "Discord",
      handle: "0xTitan#0001",
      url: "#",
      icon: "⚡",
    },
    {
      platform: "GitHub",
      handle: "0xTitan",
      url: "https://github.com/0xTitan",
      icon: "◆",
    },
    {
      platform: "Lens",
      handle: "0xTitan.lens",
      url: "https://lens.xyz",
      icon: "◐",
    },
  ]

  return (
    <div className="space-y-6">
      <TerminalOutput title="CONNECT WITH ME">
        <div className="space-y-3">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-terminal-accent/10 rounded-lg border border-terminal-accent/20 hover:border-terminal-accent/60 hover:bg-terminal-accent/20 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-terminal-accent text-xl group-hover:scale-110 transition-transform">
                  {social.icon}
                </span>
                <div>
                  <div className="font-bold text-terminal-text">{social.platform}</div>
                  <div className="text-terminal-muted text-sm">{social.handle}</div>
                </div>
              </div>
              <span className="text-terminal-muted group-hover:text-terminal-accent transition-colors">{"→"}</span>
            </a>
          ))}
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        {">"} All links are clickable. Edit URLs and handles in the component.
      </div>
    </div>
  )
}
