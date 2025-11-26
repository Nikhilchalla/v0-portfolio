"use client"

const SOLANA_RPC = "https://solana-mainnet.g.alchemy.com/v2"

interface SolanaBalance {
  lamports: number
  sol: number
}

interface SolanaNFT {
  mint: string
  name: string
  image: string
  collection: string
}

export async function getSolanaBalance(walletAddress: string): Promise<SolanaBalance> {
  try {
    if (!walletAddress || walletAddress === "YOUR_SOL_WALLET_HERE") {
      console.log("[v0] Solana wallet not configured")
      return { lamports: 0, sol: 0 }
    }

    console.log("[v0] Fetching Solana balance for:", walletAddress)

    const response = await fetch("/api/solana/balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress }),
    })

    if (!response.ok) {
      console.error("[v0] Solana API error:", response.statusText)
      return { lamports: 0, sol: 0 }
    }

    const data = await response.json()
    console.log("[v0] Solana balance:", data)

    return data
  } catch (error) {
    console.error("[v0] Error fetching Solana balance:", error)
    return { lamports: 0, sol: 0 }
  }
}

export async function getSolanaNFTs(walletAddress: string): Promise<SolanaNFT[]> {
  try {
    if (!walletAddress) {
      console.log("[v0] Solana wallet not configured")
      return []
    }

    console.log("[v0] Fetching Solana NFTs for:", walletAddress)

    const response = await fetch("/api/solana/nfts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress }),
    })

    if (!response.ok) {
      console.error("[v0] Solana NFT API error:", response.statusText)
      return []
    }

    const data = await response.json()
    console.log("[v0] Solana NFTs fetched:", data.nfts.length)
    return data.nfts
  } catch (error) {
    console.error("[v0] Error fetching Solana NFTs:", error)
    return []
  }
}
