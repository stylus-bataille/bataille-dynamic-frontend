import { http, createConfig } from "wagmi";
import { mainnet, arbitrumSepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [arbitrumSepolia, mainnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [arbitrumSepolia.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
