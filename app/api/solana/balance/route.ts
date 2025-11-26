import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 })
    }

    const apiKey = process.env.ALCHEMY_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Alchemy API key" }, { status: 500 })
    }

    const rpcUrl = `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [walletAddress],
      }),
    })

    const data = await response.json()

    if (data.error) {
      console.error("[v0] Solana RPC error:", data.error.message)
      return NextResponse.json({ lamports: 0, sol: 0 })
    }

    const lamports = data.result?.value || 0
    const sol = lamports / 1e9

    console.log("[v0] Solana balance fetched:", sol, "SOL")

    return NextResponse.json({ lamports, sol })
  } catch (error) {
    console.error("[v0] Error fetching Solana balance:", error)
    return NextResponse.json({ lamports: 0, sol: 0 })
  }
}
