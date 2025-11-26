"use client"

import Image from "next/image"

interface NFT {
  id: string
  name: string
  collection: string
  image: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

const rarityColors = {
  common: "border-terminal-muted",
  rare: "border-terminal-success",
  epic: "border-terminal-accent",
  legendary: "border-terminal-accent",
}

const rarityBgMap = {
  common: "bg-terminal-muted/5",
  rare: "bg-terminal-success/10",
  epic: "bg-terminal-accent/15",
  legendary: "bg-terminal-accent/25",
}

export default function NFTCard({ nft }: { nft: NFT }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 ${rarityColors[nft.rarity]} hover:border-terminal-accent transition-all cursor-pointer hover:scale-105 transform duration-300`}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-terminal-surface">
        <Image
          src={nft.image || "/placeholder.svg?height=300&width=300"}
          alt={nft.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className={`p-3 ${rarityBgMap[nft.rarity]} border-t border-terminal-accent/20`}>
        <h3 className="font-bold text-terminal-text text-xs sm:text-sm truncate">{nft.name}</h3>
        <p className="text-terminal-muted text-xs truncate">{nft.collection}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-mono text-terminal-accent capitalize">{nft.rarity}</span>
          <span className="text-xs text-terminal-muted">→</span>
        </div>
      </div>
    </div>
  )
}
