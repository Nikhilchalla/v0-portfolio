"use client"

import TerminalOutput from "../terminal-output"

interface Skill {
  category: string
  skills: string[]
}

export default function SkillsView() {
  const skills: Skill[] = [
    {
      category: "Smart Contracts",
      skills: ["Solidity", "Rust", "Anchor Framework", "Cairo", "Move"],
    },
    {
      category: "Blockchain Networks",
      skills: ["Solana", "Ethereum", "Polygon", "Arbitrum", "Base"],
    },
    {
      category: "Web3 Development",
      skills: ["Web3.js", "Ethers.js", "TypeScript", "React", "Next.js"],
    },
    {
      category: "Trading & Analysis",
      skills: ["Technical Analysis", "On-chain Metrics", "Risk Management", "Portfolio Strategy"],
    },
    {
      category: "Security",
      skills: ["Audit Findings", "Vulnerability Assessment", "Best Practices", "Testing"],
    },
  ]

  return (
    <div className="space-y-6">
      <TerminalOutput title="TECHNICAL EXPERTISE">
        <div className="space-y-6">
          {skills.map((skillGroup, idx) => (
            <div key={idx}>
              <h3 className="text-terminal-accent font-bold mb-3">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-terminal-accent/20 border border-terminal-accent/40 rounded text-terminal-text text-sm hover:bg-terminal-accent/30 hover:border-terminal-accent/60 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        &gt; Update skills based on your expertise. Hover over skills for more details.
      </div>
    </div>
  )
}
