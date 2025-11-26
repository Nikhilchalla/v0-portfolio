"use client"

import { useState, useEffect } from "react"
import TerminalOutput from "../terminal-output"
import { getSolanaBalance, getSolanaNFTs } from "@/lib/blockchain/solana-service"
import { getEVMBalance, getEVMNFTs } from "@/lib/blockchain/evm-service"

interface TokenHolding {
  symbol: string
  name: string
  balance: number
  value: number
  change24h: number
}

interface Wallet {
  chain: string
  address: string
  balance: number
  icon: string
  nftCount: number
  loading: boolean
}

export default function PortfolioView() {
  const [loading, setLoading] = useState(true)
  const [solanaWallet] = useState(process.env.NEXT_PUBLIC_SOLANA_WALLET || "")
  const [evmWallet] = useState(process.env.NEXT_PUBLIC_EVM_WALLET || "")
  const [error, setError] = useState("")

  const [wallets, setWallets] = useState<Wallet[]>([
    {
      chain: "Solana",
      address: "",
      balance: 0,
      icon: "◎",
      nftCount: 0,
      loading: true,
    },
    {
      chain: "Ethereum",
      address: "",
      icon: "⟠",
      balance: 0,
      nftCount: 0,
      loading: true,
    },
  ])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError("")

      if (!solanaWallet || !evmWallet) {
        setError("Wallet addresses not configured in environment variables")
        setLoading(false)
        return
      }

      try {
        console.log("[v0] Loading portfolio data...")

        // Fetch Solana data
        const [solBalance, solNFTs] = await Promise.all([getSolanaBalance(solanaWallet), getSolanaNFTs(solanaWallet)])

        console.log("[v0] Solana data loaded:", solBalance, solNFTs.length)

        setWallets((prev) =>
          prev.map((w) =>
            w.chain === "Solana"
              ? {
                  ...w,
                  address: solanaWallet,
                  balance: solBalance.sol,
                  nftCount: solNFTs.length,
                  loading: false,
                }
              : w,
          ),
        )

        // Fetch EVM data
        const [evmBalance, evmNFTs] = await Promise.all([getEVMBalance(evmWallet), getEVMNFTs(evmWallet)])

        console.log("[v0] EVM data loaded:", evmBalance, evmNFTs.length)

        setWallets((prev) =>
          prev.map((w) =>
            w.chain === "Ethereum"
              ? {
                  ...w,
                  address: evmWallet,
                  balance: evmBalance.eth,
                  nftCount: evmNFTs.length,
                  loading: false,
                }
              : w,
          ),
        )
      } catch (err) {
        console.error("[v0] Error loading portfolio data:", err)
        setError("Failed to load portfolio data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [solanaWallet, evmWallet])

  return (
    <div className="space-y-4 sm:space-y-6">
      {loading && <div className="text-terminal-muted text-xs animate-pulse">&gt; Fetching live portfolio data...</div>}

      {error && (
        <div className="text-terminal-danger text-xs border-l-2 border-terminal-danger/30 pl-3 py-2">⚠ {error}</div>
      )}

      {/* Connected Wallets Section */}
      <TerminalOutput title="CONNECTED WALLETS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wallets.map((wallet) => (
            <div
              key={wallet.chain}
              className={`p-4 bg-terminal-accent/10 rounded-lg border border-terminal-accent/20 hover:border-terminal-accent/40 transition-colors ${
                wallet.loading ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-terminal-accent text-xl">{wallet.icon}</span>
                <span className="font-bold text-terminal-text">{wallet.chain}</span>
              </div>
              <div className="text-xs text-terminal-muted mb-2 break-all font-mono">{wallet.address}</div>
              <div className="text-terminal-accent font-mono">
                {wallet.loading
                  ? "Loading..."
                  : wallet.address
                    ? `${wallet.balance.toFixed(4)} ${wallet.chain === "Solana" ? "SOL" : "ETH"}`
                    : "Not configured"}
              </div>
              <div className="text-xs text-terminal-muted mt-2">{wallet.nftCount} NFTs</div>
            </div>
          ))}
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2 overflow-x-auto">
        <span>
          {" > Portfolio data updates in real-time. Last sync: "}
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}
