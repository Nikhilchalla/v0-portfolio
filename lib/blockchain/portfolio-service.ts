"use client"

import { getSolanaBalance, getSolanaNFTs } from "./solana-service"
import { getEVMBalance, getEVMNFTs } from "./evm-service"

export interface PortfolioData {
  solana: {
    balance: number
    nfts: any[]
  }
  evm: {
    balance: number
    nfts: any[]
  }
  totalValue: number
}

export async function fetchPortfolioData(solanaAddress: string, evmAddress: string): Promise<PortfolioData> {
  try {
    const [solanaBalance, solanaNFTs, evmBalance, evmNFTs] = await Promise.all([
      getSolanaBalance(solanaAddress),
      getSolanaNFTs(solanaAddress),
      getEVMBalance(evmAddress),
      getEVMNFTs(evmAddress),
    ])

    // Mock price data (in production, fetch from price oracle)
    const solPrice = 195 // Example: $195 per SOL
    const ethPrice = 3500 // Example: $3500 per ETH

    const totalValue = solanaBalance.sol * solPrice + evmBalance.eth * ethPrice

    return {
      solana: {
        balance: solanaBalance.sol,
        nfts: solanaNFTs,
      },
      evm: {
        balance: evmBalance.eth,
        nfts: evmNFTs,
      },
      totalValue,
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    return {
      solana: { balance: 0, nfts: [] },
      evm: { balance: 0, nfts: [] },
      totalValue: 0,
    }
  }
}
