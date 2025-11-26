import { type NextRequest, NextResponse } from "next/server"

interface SolanaNFT {
  mint: string
  name: string
  image: string
  collection: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress } = body

    if (!walletAddress) {
      return NextResponse.json({ nfts: [], error: "Invalid wallet address" }, { status: 400 })
    }

    console.log("[v0] Fetching Solana NFTs server-side for:", walletAddress)

    const response = await fetch(
      `https://api-mainnet.magiceden.io/v2/wallets/${walletAddress}/tokens?offset=0&limit=100`,
    )

    if (!response.ok) {
      console.warn("[v0] Magic Eden API error:", response.statusText)
      return NextResponse.json({ nfts: [], error: "Failed to fetch NFTs" }, { status: 200 })
    }

    const data = await response.json()
    console.log("[v0] Magic Eden tokens response:", data)

    const nfts: SolanaNFT[] = data
      .filter((token: any) => token.supply === 1 && token.decimals === 0)
      .slice(0, 6)
      .map((token: any) => ({
        mint: token.mint,
        name: token.name || "Unknown NFT",
        image: token.image || "/placeholder.svg",
        collection: token.collectionName || "Unknown Collection",
      }))

    console.log("[v0] Solana NFTs found:", nfts.length)
    return NextResponse.json({ nfts })
  } catch (error) {
    console.error("[v0] API route error:", error)
    return NextResponse.json({ nfts: [], error: "Internal server error" }, { status: 500 })
  }
}
