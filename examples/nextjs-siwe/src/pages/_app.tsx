import '@/styles/globals.css';
import { siweClient } from '@/utils/siweClient';
import { CanopyConnectProvider, getDefaultConfig } from 'canopy-connect';
import type { AppProps } from 'next/app';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: 'My CanopyConnect App',
  })
);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}>
        <siweClient.Provider>
          <CanopyConnectProvider>
            <Component {...pageProps} />
          </CanopyConnectProvider>
        </siweClient.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
