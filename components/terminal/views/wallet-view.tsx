"use client"

import { useState, useEffect } from "react"
import TerminalOutput from "../terminal-output"
import StatBlock from "@/components/ui/stat-block"
import { getSolanaBalance, getSolanaNFTs } from "@/lib/blockchain/solana-service"
import { getEVMBalance, getEVMNFTs } from "@/lib/blockchain/evm-service"

interface Wallet {
  chain: string
  address: string
  balance: number
  icon: string
  nftCount: number
  loading: boolean
}

export default function WalletView() {
  const solanaAddress = process.env.NEXT_PUBLIC_SOLANA_WALLET || "YOUR_SOL_WALLET_HERE"
  const evmAddress = process.env.NEXT_PUBLIC_EVM_WALLET || "YOUR_EVM_WALLET_HERE"

  const [wallets, setWallets] = useState<Wallet[]>([
    {
      chain: "Solana",
      address: solanaAddress,
      balance: 0,
      icon: "◎",
      nftCount: 0,
      loading: true,
    },
    {
      chain: "Ethereum",
      address: evmAddress,
      balance: 0,
      icon: "⟠",
      nftCount: 0,
      loading: true,
    },
  ])

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        if (solanaAddress !== "Fm8edYU3KWSw8nV9nMdhZcuK6P4vZpwoZGt1FokQZsF8") {
          const solBalance = await getSolanaBalance(solanaAddress)
          const solNFTs = await getSolanaNFTs(solanaAddress)
          setWallets((prev) =>
            prev.map((w) =>
              w.chain === "Solana" ? { ...w, balance: solBalance.sol, nftCount: solNFTs.length, loading: false } : w,
            ),
          )
        }

        if (evmAddress !== "0xcBF491e8D7f3DF348b0962Cf97BE9704d349952D") {
          const ethBalance = await getEVMBalance(evmAddress)
          const ethNFTs = await getEVMNFTs(evmAddress)
          setWallets((prev) =>
            prev.map((w) =>
              w.chain === "Ethereum" ? { ...w, balance: ethBalance.eth, nftCount: ethNFTs.length, loading: false } : w,
            ),
          )
        }
      } catch (error) {
        console.error("[v0] Error fetching wallet data:", error)
        setWallets((prev) => prev.map((w) => ({ ...w, loading: false })))
      }
    }

    fetchWalletData()
  }, [solanaAddress, evmAddress])

  return (
    <div className="space-y-6">
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
                  : `${wallet.balance.toFixed(4)} ${wallet.chain === "Solana" ? "SOL" : "ETH"}`}
              </div>
              <div className="text-xs text-terminal-muted mt-2">{wallet.nftCount} NFTs</div>
            </div>
          ))}
        </div>
      </TerminalOutput>

      <TerminalOutput title="QUICK STATS">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatBlock label="Total NFTs" value={wallets.reduce((sum, w) => sum + w.nftCount, 0)} />
          <StatBlock label="Chains Connected" value={wallets.length} />
          <StatBlock label="Staking APY" value="8.5%" />
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        {">"} Add NEXT_PUBLIC_SOLANA_WALLET and NEXT_PUBLIC_EVM_WALLET to your .env to fetch live data
      </div>
    </div>
  )
}
