interface EVMBalance {
  wei: string
  eth: number
}

interface EVMNFT {
  address: string
  tokenId: string
  name: string
  image: string
  collection: string
}

export async function getEVMBalance(walletAddress: string, chainId = 1): Promise<EVMBalance> {
  try {
    const rpcUrl = getRPCUrl(chainId)
    if (!rpcUrl) {
      console.error("[v0] Error fetching EVM balance: RPC URL is empty")
      return { wei: "0", eth: 0 }
    }
    console.log("[v0] Fetching EVM balance from:", rpcUrl.substring(0, 50) + "...")

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      }),
    })

    if (!response.ok) {
      console.error("[v0] EVM RPC error:", response.statusText)
      return { wei: "0", eth: 0 }
    }

    const data = await response.json()
    console.log("[v0] EVM balance response:", data)

    if (data.error) {
      console.error("[v0] EVM RPC error:", data.error.message)
      return { wei: "0", eth: 0 }
    }

    const wei = data.result || "0"
    const eth = Number.parseInt(wei, 16) / 1e18

    console.log("[v0] EVM balance:", eth, "ETH")

    return { wei, eth }
  } catch (error) {
    console.error("[v0] Error fetching EVM balance:", error)
    return { wei: "0", eth: 0 }
  }
}

export async function getEVMNFTs(walletAddress: string, chainId = 1): Promise<EVMNFT[]> {
  try {
    console.log("[v0] Fetching EVM NFTs for:", walletAddress)

    const response = await fetch("/api/nfts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress, chainId }),
    })

    if (!response.ok) {
      console.error("[v0] NFT API error:", response.statusText)
      return []
    }

    const data = await response.json()
    console.log("[v0] EVM NFTs fetched:", data.nfts?.length || 0)

    return data.nfts || []
  } catch (error) {
    console.error("[v0] Error fetching EVM NFTs:", error)
    return []
  }
}

function getRPCUrl(chainId: number): string {
  const apiKey = process.env.ALCHEMY_API_KEY || ""

  if (!apiKey) {
    console.warn("[v0] ALCHEMY_API_KEY not set, balance fetching will fail")
    return ""
  }

  const rpcs: Record<number, string> = {
    1: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`, // Ethereum
    137: `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`, // Polygon
    42161: `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`, // Arbitrum
    8453: `https://base-mainnet.g.alchemy.com/v2/${apiKey}`, // Base
  }

  return rpcs[chainId] || rpcs[1]
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
