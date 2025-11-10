"use client"

import type React from "react"
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit"
import { evmWalletConnectors, injected } from "@particle-network/connectkit/evm"
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet"
import { mainnet, polygon, base } from "@particle-network/connectkit/chains"

const config = createConfig({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    appearance: {
        mode: "auto",
        theme: {
            "--pcm-accent-color": "#000000",
        },
        connectorsOrder: ["wallet"],
    },
    walletConnectors: [
        evmWalletConnectors({
            metadata: {
                name: "Your App",
                description: "Connect your wallet",
                url: "https://yourapp.com",
            },
            walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
            connectorFns: [
                injected({ target: "metaMask" }),
                injected({ target: "trustWallet" }),
                injected({ target: "okxWallet" }),
                injected({ target: "kuCoinWallet" }),
                injected({ target: "coinbaseWallet" }),
            ],
            multiInjectedProviderDiscovery: true,
        }),
    ],
    plugins: [
        wallet({
            visible: false,
            entryPosition: EntryPosition.BR, 
        }),
    ],
    chains: [mainnet, polygon, base],
})

export function ParticleConnectProvider({ children }: { children: React.ReactNode }) {
    return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>
}