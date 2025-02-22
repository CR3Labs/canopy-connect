import React, {
  createContext,
  createElement,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Buffer } from 'buffer';
import {
  CustomTheme,
  Languages,
  Mode,
  Theme,
  CustomAvatarProps,
} from '../types';

import defaultTheme from '../styles/defaultTheme';

import CanopyConnectModal from './ConnectModal';
import { ThemeProvider } from 'styled-components';
import { useThemeFont } from '../hooks/useGoogleFont';
import { SIWEContext } from '../siwe';
import { useChains } from '../hooks/useChains';
import {
  useConnectCallback,
  useConnectCallbackProps,
} from '../hooks/useConnectCallback';
import { isFamily } from '../utils/wallets';
import { useConnector } from '../hooks/useConnectors';
import { WagmiContext, useAccount } from 'wagmi';
import { Web3ContextProvider } from './contexts/web3';
import { useChainIsSupported } from '../hooks/useChainIsSupported';

export const routes = {
  ONBOARDING: 'onboarding',
  ABOUT: 'about',
  CONNECTORS: 'connectors',
  MOBILECONNECTORS: 'mobileConnectors',
  CONNECT: 'connect',
  DOWNLOAD: 'download',
  PROFILE: 'profile',
  SWITCHNETWORKS: 'switchNetworks',
  SIGNINWITHETHEREUM: 'signInWithEthereum',
  OAUTHWALLET: 'oauthWallet',
};

type Connector = {
  id: string;
};
type Error = string | React.ReactNode | null;

type ContextValue = {
  primaryColor: string;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  customTheme: CustomTheme | undefined;
  setCustomTheme: React.Dispatch<React.SetStateAction<CustomTheme | undefined>>;
  lang: Languages;
  setLang: React.Dispatch<React.SetStateAction<Languages>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  connector: Connector;
  setConnector: React.Dispatch<React.SetStateAction<Connector>>;
  selectedConnector: Connector;
  setSelectedConnector: React.Dispatch<React.SetStateAction<Connector>>;
  errorMessage: Error;
  options?: CanopyConnectOptions;
  signInWithEthereum: boolean;
  debugMode?: boolean;
  log: (...props: any) => void;
  displayError: (message: string | React.ReactNode | null, code?: any) => void;
  resize: number;
  triggerResize: () => void;
} & useConnectCallbackProps;

export const Context = createContext<ContextValue | null>(null);

export type CanopyConnectOptions = {
  language?: Languages;
  hideBalance?: boolean;
  hideTooltips?: boolean;
  hideQuestionMarkCTA?: boolean;
  hideNoWalletCTA?: boolean;
  hideRecentBadge?: boolean;
  walletConnectCTA?: 'link' | 'modal' | 'both';
  avoidLayoutShift?: boolean; // Avoids layout shift when the CanopyConnect modal is open by adding padding to the body
  embedGoogleFonts?: true; // Automatically embeds Google Font of the current theme. Does not work with custom themes
  truncateLongENSAddress?: boolean;
  walletConnectName?: string;
  reducedMotion?: boolean;
  disclaimer?: ReactNode | string;
  bufferPolyfill?: boolean;
  customAvatar?: React.FC<CustomAvatarProps>;
  initialChainId?: number;
  enforceSupportedChains?: boolean;
  ethereumOnboardingUrl?: string;
  walletOnboardingUrl?: string;
  disableSiweRedirect?: boolean; // Disable redirect to SIWE page after a wallet is connected
  overlayBlur?: number; // Blur the background when the modal is open
  showOAuthConnectors?: boolean; // Show OAuth connectors
};

type CanopyConnectProviderProps = {
  children?: React.ReactNode;
  // theme?: Theme;
  mode?: Mode;
  customTheme?: CustomTheme;
  primaryColor?: `#${string}`;
  options?: CanopyConnectOptions;
  debugMode?: boolean;
} & useConnectCallbackProps;

const theme = 'auto';

export const CanopyConnectProvider = ({
  children,
  // theme = 'auto',
  mode = 'auto',
  primaryColor = '#DBFF00',
  customTheme,
  options,
  onConnect,
  onDisconnect,
  debugMode = false,
}: CanopyConnectProviderProps) => {
  // CanopyConnectProvider must be within a WagmiProvider
  if (!React.useContext(WagmiContext)) {
    throw Error('CanopyConnectProvider must be within a WagmiProvider');
  }

  // Only allow for mounting CanopyConnectProvider once, so we avoid weird global
  // state collisions.
  if (React.useContext(Context)) {
    throw new Error(
      'Multiple, nested usages of CanopyConnectProvider detected. Please use only one.'
    );
  }

  useConnectCallback({
    onConnect,
    onDisconnect,
  });

  const chains = useChains();

  const injectedConnector = useConnector('injected');

  // Default config options
  const defaultOptions: CanopyConnectOptions = {
    language: 'en-US',
    hideBalance: false,
    hideTooltips: false,
    hideQuestionMarkCTA: true,
    hideNoWalletCTA: false,
    walletConnectCTA: 'link',
    hideRecentBadge: false,
    avoidLayoutShift: true,
    embedGoogleFonts: true,
    truncateLongENSAddress: true,
    walletConnectName: undefined,
    reducedMotion: false,
    disclaimer: null,
    bufferPolyfill: true,
    customAvatar: undefined,
    initialChainId: chains?.[0]?.id,
    enforceSupportedChains: true,
    ethereumOnboardingUrl: undefined,
    walletOnboardingUrl: undefined,
    disableSiweRedirect: false,
    showOAuthConnectors: true,
  };

  const opts: CanopyConnectOptions = Object.assign({}, defaultOptions, options);

  if (typeof window !== 'undefined') {
    // Buffer Polyfill, needed for bundlers that don't provide Node polyfills (e.g CRA, Vite, etc.)
    if (opts.bufferPolyfill) window.Buffer = window.Buffer ?? Buffer;

    // Some bundlers may need `global` and `process.env` polyfills as well
    // Not implemented here to avoid unexpected behaviors, but leaving example here for future reference
    /*
     * window.global = window.global ?? window;
     * window.process = window.process ?? { env: {} };
     */
  }

  const [ckTheme, setTheme] = useState<Theme>(theme);
  const [ckMode, setMode] = useState<Mode>(mode);
  const [ckCustomTheme, setCustomTheme] = useState<CustomTheme | undefined>(
    customTheme ?? {}
  );
  const [ckLang, setLang] = useState<Languages>('en-US');
  const [open, setOpen] = useState<boolean>(false);
  const [connector, setConnector] = useState<ContextValue['connector']>({
    id: '',
  });
  const [selectedConnector, setSelectedConnector] = useState<
    ContextValue['connector']
  >({
    id: '',
  });
  const [route, setRoute] = useState<string>(routes.CONNECTORS);
  const [errorMessage, setErrorMessage] = useState<Error>('');

  const [resize, onResize] = useState<number>(0);

  //always use the theme font so Manrope is always loaded
  useThemeFont(theme);

  // Other Configuration
  useEffect(() => setTheme(theme), [theme]);
  useEffect(() => setLang(opts.language || 'en-US'), [opts.language]);
  useEffect(() => setErrorMessage(null), [route, open]);

  // Check if chain is supported, elsewise redirect to switches page
  const { chain, isConnected } = useAccount();
  const isChainSupported = useChainIsSupported(chain?.id);

  useEffect(() => {
    if (isConnected && opts.enforceSupportedChains && !isChainSupported) {
      setOpen(true);
      setRoute(routes.SWITCHNETWORKS);
    }
  }, [isConnected, isChainSupported, chain, route, open]);

  // Autoconnect to Family wallet if available
  useEffect(() => {
    if (isFamily()) {
      injectedConnector?.connect();
    }
  }, [injectedConnector]);

  const log = debugMode ? console.log : () => {};

  const value = {
    theme: ckTheme,
    setTheme,
    primaryColor,
    mode: ckMode,
    setMode,
    customTheme,
    setCustomTheme,
    lang: ckLang,
    setLang,
    open,
    setOpen,
    route,
    setRoute,
    connector,
    setConnector,
    selectedConnector,
    setSelectedConnector,
    signInWithEthereum: React.useContext(SIWEContext)?.enabled ?? false,
    onConnect,
    // Other configuration
    options: opts,
    errorMessage,
    debugMode,
    log,
    displayError: (message: string | React.ReactNode | null, code?: any) => {
      setErrorMessage(message);
      console.log('---------CONNECTKIT DEBUG---------');
      console.log(message);
      if (code) console.table(code);
      console.log('---------/CONNECTKIT DEBUG---------');
    },
    resize,
    triggerResize: () => onResize((prev) => prev + 1),
  };

  return createElement(
    Context.Provider,
    { value },
    <>
      <Web3ContextProvider enabled={open}>
        <ThemeProvider theme={defaultTheme}>
          {children}
          <CanopyConnectModal
            lang={ckLang}
            theme={ckTheme}
            mode={mode}
            customTheme={ckCustomTheme}
            primaryColor={primaryColor}
          />
        </ThemeProvider>
      </Web3ContextProvider>
    </>
  );
};

export const useContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('CanopyConnect Hook must be inside a Provider.');
  return context;
};
