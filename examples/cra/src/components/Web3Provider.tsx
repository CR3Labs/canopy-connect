import React from 'react';

import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CanopyConnectProvider, getDefaultConfig } from 'canopy-connect';

const config = createConfig(
  getDefaultConfig({
    appName: 'CanopyConnect CRA demo',
    walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID!,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CanopyConnectProvider debugMode>{children}</CanopyConnectProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
