import { http, createConfig } from "wagmi";
import { mainnet, arbitrumSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [arbitrumSepolia],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [arbitrumSepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
