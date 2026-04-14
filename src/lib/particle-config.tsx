'use client';

import React from 'react';
import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { mainnet, polygon, base } from '@particle-network/connectkit/chains';
import { authWalletConnectors } from '@particle-network/connectkit/auth';

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  appearance: {
    mode: 'auto',
    connectorsOrder: ['social', 'email'],
  },
  walletConnectors: [
    authWalletConnectors({
      authTypes: ['email', 'google', 'apple', 'twitter', 'github'],
    }),
  ],
  chains: [mainnet, polygon, base],
});

export function ParticleConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
}
