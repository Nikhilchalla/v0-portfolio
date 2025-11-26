"use client"

import TerminalOutput from "../terminal-output"

interface Experience {
  title: string
  company: string
  duration: string
  description: string[]
}

export default function ExperienceView() {
  const experiences: Experience[] = [
    {
      title: "Crypto Researcher & Developer",
      company: "Independent",
      duration: "2021 - Present",
      description: [
        "Built multiple DeFi protocols and smart contracts",
        "Actively trading and portfolio management",
        "Community builder and thought leader",
        "Contributed to 5+ major blockchain projects",
      ],
    },
    {
      title: "Blockchain Engineer",
      company: "Anonymous DAO",
      duration: "2023 - 2024",
      description: [
        "Developed NFT minting platform handling $2M+ volume",
        "Optimized gas usage reducing costs by 40%",
        "Led audit of smart contract vulnerabilities",
      ],
    },
    {
      title: "Solana Network Contributor",
      company: "Solana Foundation",
      duration: "2022 - 2023",
      description: [
        "Grant recipient for protocol development",
        "Built tools for the Solana ecosystem",
        "Speaker at major blockchain conferences",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <TerminalOutput title="PROFESSIONAL EXPERIENCE">
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="pb-6 border-b border-terminal-accent/20 last:border-b-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h3 className="text-terminal-accent font-bold text-lg">{exp.title}</h3>
                  <p className="text-terminal-muted text-sm">{exp.company}</p>
                </div>
                <span className="text-terminal-muted text-xs mt-2 md:mt-0">{exp.duration}</span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="text-terminal-text text-sm flex items-start gap-2">
                    <span className="text-terminal-accent mt-1">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        {">"} Edit this section with your real experience. Add or remove entries as needed.
      </div>
    </div>
  )
}
