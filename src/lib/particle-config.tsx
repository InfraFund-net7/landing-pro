'use client';

import React from 'react';
import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { mainnet, polygon, base } from '@particle-network/connectkit/chains';
import { authWalletConnectors } from '@particle-network/connectkit/auth';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
const appId = process.env.NEXT_PUBLIC_APP_ID;

export const isParticleConfigured = Boolean(projectId && clientKey && appId);

const config = isParticleConfigured
  ? createConfig({
      projectId: projectId as string,
      clientKey: clientKey as string,
      appId: appId as string,
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
    })
  : null;

export function ParticleConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isParticleConfigured || !config) {
    return <>{children}</>;
  }

  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
}
