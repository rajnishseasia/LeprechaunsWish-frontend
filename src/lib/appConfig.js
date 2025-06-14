const BASE_URL = import.meta.env.VITE_BASE_URL;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const CHAIN_NETWORK = import.meta.env.VITE_CHAIN_NETWORK;
const MAINNET_CHAIN_ID = import.meta.env.VITE_MAINNET_CHAIN_ID;
const TESTNET_CHAIN_ID = import.meta.env.VITE_TESTNET_CHAIN_ID;
const STABLE_CONTRACT_ADDRESS = import.meta.env.VITE_STABLE_CONTRACT_ADDRESS;
const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
const PRESALE_CONTRACT_ADDRESS = import.meta.env.VITE_PRESALE_CONTRACT_ADDRESS;
const PHASE_ID = import.meta.env.VITE_PHASE_ID;
const TOKEN_PRICE_LIMIT = import.meta.env.VITE_TOKEN_PRICE_LIMIT;
const MOONPAY_API_KEY = import.meta.env.VITE_MOONPAY_API_KEY;
const MOONPAY_PUBLIC_API_KEY = import.meta.env.VITE_MOONPAY_PUBLIC_API_KEY
const METADATA_URL = import.meta.env.VITE_METADATA_PUBLIC_URL;

const appConfig = {
  BASE_URL,
  PROJECT_ID,
  CHAIN_NETWORK,
  MAINNET_CHAIN_ID,
  TESTNET_CHAIN_ID,
  STABLE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  PRESALE_CONTRACT_ADDRESS,
  PHASE_ID,
  TOKEN_PRICE_LIMIT,
  MOONPAY_API_KEY,
  MOONPAY_PUBLIC_API_KEY,
  METADATA_URL
};

export default appConfig;
