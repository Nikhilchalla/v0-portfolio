import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "0xTitan - Crypto Portfolio & Web3 Terminal",
  description:
    "Terminal-based crypto portfolio showcasing wallet holdings, NFTs, skills, and web3 experience. Explore my crypto journey across Solana and EVM networks.",
  keywords: ["crypto", "web3", "portfolio", "solana", "ethereum", "nft", "defi", "blockchain"],
  authors: [{ name: "0xTitan" }],
  creator: "0xTitan",
  publisher: "0xTitan",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://0xtitan.network",
    title: "0xTitan - Crypto Portfolio",
    description: "Explore my crypto holdings, NFTs, and web3 expertise",
    siteName: "0xTitan",
    images: [
      {
        url: "https://0xtitan.network/og-image.png",
        width: 1200,
        height: 630,
        alt: "0xTitan Crypto Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@0xTitan",
    title: "0xTitan - Crypto Portfolio",
    description: "Terminal-based crypto portfolio",
    images: ["https://0xtitan.network/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00d9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#00d9ff" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono bg-terminal-bg text-terminal-text">{children}</body>
    </html>
  )
}
