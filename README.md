# CanopyConnect

CanopyConnect is a powerful [React](https://reactjs.org/) component library for connecting a wallet to your dApp. It supports the most popular connectors and chains out of the box and provides a beautiful, seamless experience.

## Features

- 💡 TypeScript Ready — Get types straight out of the box.
- 🌱 Ecosystem Standards — Uses top libraries such as [wagmi](https://github.com/wagmi-dev/wagmi).
- 🖥️ Simple UX — Give users a simple, attractive experience.
- 🌞🌚 Light/Dark/Auto Modes — Predesigned color themes.

and much more...

## Quick Start

Get started with a CanopyConnect + [wagmi](https://wagmi.sh/) + [viem](https://viem.sh) project by running one of the following in your terminal:

#### npm

```sh
npx create-react-app my-app --template cra-template-canopy-connect
```

#### yarn

```sh
yarn create react-app my-app --template cra-template-canopy-connect
```

#### pnpm

```sh
pnpm dlx create-react-app ./my-app --template cra-template-canopy-connect
```

## Getting Started

CanopyConnect is the simplest way to integrate a connect wallet experience into your React.js web application. It comes with sensible defaults out of the box so you can focus on building.

## 1\. Install

Install CanopyConnect and its peer dependencies:

```bash
npm install canopy-connect wagmi viem@2.x @tanstack/react-query
```

- [Wagmi](https://wagmi.sh/) is a React Hooks library for Ethereum, this is the library you will use to interact with the connected wallet.

- [Viem](https://viem.sh/) is a TypeScript interface for Ethereum that performs blockchain operations.

- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.

- [TypeScript](https://wagmi.sh/react/typescript) is optional, but highly recommended.

## 2\. API Keys

CanopyConnect utilises WalletConnect's SDK to help with connecting wallets. WalletConnect 2.0 requires a `walletConnectProjectId` which you can create quickly and easily for free over at [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in).

## 3\. Implementation

It is recommended to wrap your app within a new component that will help you set up CanopyConnect and its dependencies.

Start by creating a new component called `Web3Provider`. Here you will import the required providers and create a config using wagmi's [createConfig](https://wagmi.sh/react/api/createConfig) method. CanopyConnect supplies a pre-configured `getDefaultConfig` function to simplify the process of creating a config.

Below is a simple example app using `getDefaultConfig()` to help you get started:

_When using a framework that supports [React Server Components](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks), you will need to include the `"use client"` directive at the beginning of this file._

```javascript
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CanopyConnectProvider, getDefaultConfig } from 'canopy-connect';

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: 'Your App Name',
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CanopyConnectProvider>{children}</CanopyConnectProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```

Now that you have your `Web3Provider` component, you can wrap your app with it:

```javascript
import { Web3Provider } from './Web3Provider';
import { CanopyConnectButton } from 'canopy-connect';

const App = () => {
  return (
    <Web3Provider>
      <CanopyConnectButton />
    </Web3Provider>
  );
};
```

## 4\. Connected Wallet Info

In a lot of use cases, you will want to access the connected wallet from CanopyConnect in order to be able to interact with it further. You can do so by using the different hooks, such as [useAccount](https://wagmi.sh/docs/hooks/useAccount), from wagmi (a CanopyConnect dependency).

In the previous example above we wrapped our app with a <CanopyConnectProvider> top-level. Before utilizing any wagmi hook, make sure the components you build are mounted under this provider.

Below is a simple example component that utilizes the useAccount hook to access connection state and the connected wallet address:

```javascript
import { useAccount } from 'wagmi';

// Make sure that this component is wrapped with CanopyConnectProvider
const MyComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>Connected Wallet: {address}</div>;
};
```

## Additional Build Tooling Setup

Some build tools require additional setup to work with ConnectKit.

[](https://docs.family.co/connectkit/getting-started#getting-started-nextjs)

### Next.js

CanopyConnect uses [WalletConnect](https://walletconnect.com/)'s SDK to help with connecting wallets. WalletConnect 2.0 pulls in Node.js dependencies that Next.js does not support by default.

You can mitigate this by adding the following to your `next.config.js` file:

```javascript
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};
```

### Next.js App Router

If using Next.js App Router, or any framework that supports React Server Components, you will need to include the `"use client"` directive at the beginning of your `Web3Provider` file.

```javascript
"use client"

...

export const Web3Provider = ({ children }) => {
  return (
    ...
  );
};
```

## Examples

There are various runnable examples included in this repository in the [examples folder](https://github.com/solidity-io/canopy-wallet-connect/tree/main/examples):

- [Create React App Example (TypeScript)](https://github.com/solidity-io/canopy-wallet-connect/main/examples/cra)
- [Next.js Example (TypeScript)](https://github.com/solidity-io/canopy-wallet-connect/main/examples/nextjs)
- [Vite Example (TypeScript)](https://github.com/solidity-io/canopy-wallet-connect/main/examples/vite)

### Try in CodeSandbox

You can try out some CanopyConnect examples directly in your browser through CodeSandbox:

- [Create React App Example (TypeScript)](https://codesandbox.io/s/5rhqm0?file=/README.md)
- [Next.js (TypeScript)](https://codesandbox.io/s/qnvyqe?file=/README.md)
- [Vite Example (TypeScript)](https://codesandbox.io/s/4jtssh?file=/README.md)

### Running Examples Locally

Clone the CanopyConnect project and install the necessary dependencies:

```sh
$ git clone git@github.com:solidity-io/canopy-wallet-connect.git
$ cd canopy-connect
$ yarn install
```

and start the code bundler:

```sh
$ yarn dev:canopy-connect
$ yarn dev:canopy-connect-next-siwe
```

and then simply select the example you'd like to run:

```sh
$ yarn dev:vite # Vite
$ yarn dev:nextjs # Next.js
$ yarn dev:nextjs-siwe # Next.js with SIWE
$ yarn dev:cra # Create React App
```
