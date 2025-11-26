import { type NextRequest, NextResponse } from "next/server"

interface EVMNFTRequest {
  walletAddress: string
  chainId: number
}

interface EVMNFT {
  address: string
  tokenId: string
  name: string
  image: string
  collection: string
}

function getAlchemyNetwork(chainId: number): string {
  const networks: Record<number, string> = {
    1: "eth-mainnet",
    137: "polygon-mainnet",
    42161: "arb-mainnet",
    8453: "base-mainnet",
  }

  return networks[chainId] || "eth-mainnet"
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EVMNFTRequest
    const { walletAddress, chainId } = body

    // Validate input
    if (!walletAddress || !chainId) {
      return NextResponse.json({ error: "Invalid wallet address or chain ID" }, { status: 400 })
    }

    const alchemyKey = process.env.ALCHEMY_API_KEY
    if (!alchemyKey) {
      console.warn("Alchemy API key not configured in server environment")
      return NextResponse.json({ nfts: [], error: "API not configured" }, { status: 200 })
    }

    const network = getAlchemyNetwork(chainId)
    const response = await fetch(
      `https://${network}.g.alchemy.com/nft/v3/${alchemyKey}/getNFTsForOwner?owner=${walletAddress}&pageSize=50`,
    )

    if (!response.ok) {
      console.error("Alchemy API error:", response.statusText)
      return NextResponse.json({ nfts: [], error: "Failed to fetch NFTs" }, { status: 200 })
    }

    const data = await response.json()
    const nfts: EVMNFT[] = (data.ownedNfts || []).slice(0, 6).map((nft: any) => ({
      address: nft.contract.address,
      tokenId: nft.tokenId,
      name: nft.title || "Unknown NFT",
      image: nft.media?.[0]?.gateway || "/placeholder.svg",
      collection: nft.contract.name || "Unknown Collection",
    }))

    return NextResponse.json({ nfts })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ nfts: [], error: "Internal server error" }, { status: 500 })
  }
}
