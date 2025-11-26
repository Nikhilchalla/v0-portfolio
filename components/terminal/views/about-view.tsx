"use client"

import TerminalOutput from "../terminal-output"

interface Experience {
  title: string
  company: string
  duration: string
  description: string[]
}

interface Skill {
  category: string
  skills: string[]
}

export default function AboutView() {
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
      {/* About Section */}
      <TerminalOutput title="ABOUT 0xTitan">
        <div className="space-y-4">
          <p className="text-terminal-text leading-relaxed text-sm sm:text-base">
            I'm a degenerate crypto developer and investor diving deep into the blockchain rabbit hole since the good
            old days of 2021. Built multiple protocols, lost money on countless NFT projects, and managed to survive the
            winters.
          </p>

          <p className="text-terminal-text leading-relaxed text-sm sm:text-base">
            When I'm not staring at charts or debugging smart contracts, you'll find me shitposting on Twitter about the
            next narrative or helping other degens navigate the wild west of crypto.
          </p>

          <p className="text-terminal-text leading-relaxed text-sm sm:text-base">
            This terminal is my digital home on the internet. It's where I showcase my portfolio, achievements, and
            maybe convince you that I'm not completely insane for betting everything on decentralized systems.
          </p>

          <div className="mt-4 pt-4 border-t border-terminal-accent/20">
            <h3 className="text-terminal-accent font-bold mb-3 text-sm sm:text-base">The Narrative</h3>
            <ul className="space-y-2">
              <li className="text-terminal-text text-xs sm:text-sm flex items-start gap-2">
                <span className="text-terminal-accent mt-1 shrink-0">→</span>
                <span>Building in public for the Solana ecosystem</span>
              </li>
              <li className="text-terminal-text text-xs sm:text-sm flex items-start gap-2">
                <span className="text-terminal-accent mt-1 shrink-0">→</span>
                <span>Exploring Layer 2s and cross-chain solutions</span>
              </li>
              <li className="text-terminal-text text-xs sm:text-sm flex items-start gap-2">
                <span className="text-terminal-accent mt-1 shrink-0">→</span>
                <span>Betting on AI + Crypto convergence</span>
              </li>
              <li className="text-terminal-text text-xs sm:text-sm flex items-start gap-2">
                <span className="text-terminal-accent mt-1 shrink-0">→</span>
                <span>Always learning, always shipping</span>
              </li>
            </ul>
          </div>
        </div>
      </TerminalOutput>

      {/* Stats */}
      <TerminalOutput title="STATS">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">4+</div>
            <div className="text-terminal-muted text-xs sm:text-sm mt-1">Years in Crypto</div>
          </div>
          <div className="text-center p-2 sm:p-3">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">$2.5M+</div>
            <div className="text-terminal-muted text-xs sm:text-sm mt-1">Traded Volume</div>
          </div>
          <div className="text-center p-2 sm:p-3">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">50+</div>
            <div className="text-terminal-muted text-xs sm:text-sm mt-1">Projects Built</div>
          </div>
          <div className="text-center p-2 sm:p-3">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">0</div>
            <div className="text-terminal-muted text-xs sm:text-sm mt-1">Rugs Pulled</div>
          </div>
        </div>
      </TerminalOutput>

      {/* Professional Experience */}
      <TerminalOutput title="PROFESSIONAL EXPERIENCE">
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="pb-6 border-b border-terminal-accent/20 last:border-b-0">
              <div className="flex flex-col gap-2 mb-3">
                <div>
                  <h3 className="text-terminal-accent font-bold text-base sm:text-lg">{exp.title}</h3>
                  <p className="text-terminal-muted text-xs sm:text-sm">{exp.company}</p>
                </div>
                <span className="text-terminal-muted text-xs">{exp.duration}</span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="text-terminal-text text-xs sm:text-sm flex items-start gap-2">
                    <span className="text-terminal-accent mt-0.5 shrink-0">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalOutput>

      {/* Technical Expertise */}
      <TerminalOutput title="TECHNICAL EXPERTISE">
        <div className="space-y-6">
          {skills.map((skillGroup, idx) => (
            <div key={idx}>
              <h3 className="text-terminal-accent font-bold mb-3 text-sm sm:text-base">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-terminal-accent/20 border border-terminal-accent/40 rounded text-terminal-text hover:bg-terminal-accent/30 hover:border-terminal-accent/60 transition-colors"
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
        {">"} Customize your story, experience, and skills here. This is your digital identity.
      </div>
    </div>
  )
}
