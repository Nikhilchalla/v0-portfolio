"use client"

import { useState, useEffect } from "react"
import TerminalOutput from "../terminal-output"
import NFTCard from "@/components/ui/nft-card"
import StatBlock from "@/components/ui/stat-block"
import { getSolanaNFTs } from "@/lib/blockchain/solana-service"
import { getEVMNFTs } from "@/lib/blockchain/evm-service"

interface NFT {
  id: string
  name: string
  collection: string
  image: string
  rarity: "common" | "rare" | "epic" | "legendary"
  chain: "solana" | "ethereum"
}

export default function NFTView() {
  const [expandedChain, setExpandedChain] = useState<string | null>(null)
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true)
      try {
        const solanaAddress = process.env.NEXT_PUBLIC_SOLANA_WALLET
        const evmAddress = process.env.NEXT_PUBLIC_EVM_WALLET

        const [solaNFTs, evmNFTsData] = await Promise.all([
          solanaAddress ? getSolanaNFTs(solanaAddress) : [],
          evmAddress ? getEVMNFTs(evmAddress) : [],
        ])

        const formattedNFTs: NFT[] = [
          ...solaNFTs.slice(0, 6).map((nft: any, idx: number) => ({
            id: `sol-${idx}`,
            name: nft.name,
            collection: nft.collection,
            image: nft.image || "/placeholder.svg",
            rarity: ["common", "rare", "epic", "legendary"][idx % 4] as any,
            chain: "solana" as const,
          })),
          ...evmNFTsData.slice(0, 6).map((nft: any, idx: number) => ({
            id: `evm-${idx}`,
            name: nft.name,
            collection: nft.collection,
            image: nft.image || "/placeholder.svg",
            rarity: ["legendary", "epic", "rare", "common"][idx % 4] as any,
            chain: "ethereum" as const,
          })),
        ]

        setNfts(formattedNFTs)
      } catch (error) {
        console.error("[v0] Error fetching NFTs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNFTs()
  }, [])

  const solanaCount = nfts.filter((n) => n.chain === "solana").length
  const ethereumCount = nfts.filter((n) => n.chain === "ethereum").length

  const renderChainNFTs = (chain: "solana" | "ethereum") => {
    const chainNFTs = nfts.filter((n) => n.chain === chain)
    return (
      <div key={chain} className="space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer hover:text-terminal-accent transition-colors"
          onClick={() => setExpandedChain(expandedChain === chain ? null : chain)}
        >
          <h3 className="text-terminal-accent font-bold text-lg uppercase">
            {chain === "solana" ? "◎ Solana" : "⟠ Ethereum"} ({chainNFTs.length})
          </h3>
          <span className="text-terminal-muted">{expandedChain === chain ? "▼" : "▶"}</span>
        </div>

        {expandedChain === chain && chainNFTs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {chainNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}

        {expandedChain === chain && chainNFTs.length === 0 && (
          <div className="text-terminal-muted text-sm p-4 bg-terminal-surface/30 rounded border border-terminal-accent/10">
            No NFTs found on {chain === "solana" ? "Solana" : "Ethereum"}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TerminalOutput title="NFT COLLECTION">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="Total NFTs" value={nfts.length} />
          <StatBlock label="Solana" value={solanaCount} />
          <StatBlock label="Ethereum" value={ethereumCount} />
          <StatBlock label="Floor Value" value="~$45K" />
        </div>
      </TerminalOutput>

      {loading ? (
        <TerminalOutput>
          <div className="text-terminal-muted text-sm animate-pulse">Fetching NFT collection...</div>
        </TerminalOutput>
      ) : (
        <TerminalOutput>
          <div className="space-y-6">
            {renderChainNFTs("solana")}
            {renderChainNFTs("ethereum")}
          </div>
        </TerminalOutput>
      )}

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        {">"} Click on chain name to expand/collapse collection. Live floor data can be integrated via APIs.
      </div>
    </div>
  )
}
