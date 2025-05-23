import { cookieStorage, createStorage, http, WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { holesky, mainnet } from "wagmi/chains";
import appConfig from "../lib/appConfig";
import { ParallaxProvider } from "react-scroll-parallax";
import { MoonPayProvider } from "@moonpay/moonpay-react";
import AuthProvider from "./AuthProvider";

const config = getDefaultConfig({
  chains: [appConfig.CHAIN_NETWORK === "testnet" ? holesky : mainnet],
  projectId: appConfig.PROJECT_ID,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [appConfig.CHAIN_NETWORK === "testnet" ? holesky.id : mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            overlayBlur: "small",
            borderRadius: "medium",
          })}
          modalSize="compact"
        >
          <AuthProvider>
            <ParallaxProvider>
              <MoonPayProvider debug apiKey={appConfig?.MOONPAY_API_KEY}>
                {children}
              </MoonPayProvider>
            </ParallaxProvider>
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
