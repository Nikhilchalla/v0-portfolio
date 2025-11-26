interface StatBlockProps {
  label: string
  value: string | number
  accent?: boolean
}

export default function StatBlock({ label, value, accent }: StatBlockProps) {
  return (
    <div className="p-2 sm:p-3 md:p-4 bg-terminal-surface/50 rounded-lg border border-terminal-accent/20 hover:border-terminal-accent/40 transition-colors">
      <div className="text-terminal-muted text-xs md:text-sm">{label}</div>
      <div
        className={`text-base sm:text-lg md:text-2xl font-bold mt-1 ${accent ? "text-terminal-accent" : "text-terminal-text"} break-words`}
      >
        {value}
      </div>
    </div>
  )
}
