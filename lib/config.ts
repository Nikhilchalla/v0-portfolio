export const config = {
  wallets: {
    solana: process.env.NEXT_PUBLIC_SOLANA_WALLET || "",
    evm: process.env.NEXT_PUBLIC_EVM_WALLET || "",
  },
  alchemyKey: process.env.ALCHEMY_API_KEY || "",
  chains: {
    solana: {
      name: "Solana",
      icon: "◎",
      rpc: "https://api.mainnet-beta.solana.com",
    },
    ethereum: {
      name: "Ethereum",
      icon: "⟠",
      rpc: process.env.ALCHEMY_API_KEY
        ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        : "https://eth-rpc.publicnode.com",
      chainId: 1,
    },
    polygon: {
      name: "Polygon",
      icon: "◈",
      rpc: process.env.ALCHEMY_API_KEY
        ? `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        : "https://polygon-rpc.publicnode.com",
      chainId: 137,
    },
    arbitrum: {
      name: "Arbitrum",
      icon: "◆",
      rpc: process.env.ALCHEMY_API_KEY
        ? `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        : "https://arbitrum-rpc.publicnode.com",
      chainId: 42161,
    },
    base: {
      name: "Base",
      icon: "◇",
      rpc: process.env.ALCHEMY_API_KEY
        ? `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        : "https://base-rpc.publicnode.com",
      chainId: 8453,
    },
  },
}

export const isConfigured = () => {
  return config.wallets.solana && config.wallets.evm
}
