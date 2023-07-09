// example standard contract abis
export { erc20ABI as ERC20_ABI } from 'wagmi';
export const ERC165_ABI = (await import("./erc165.json")).default
export const USERNAME_ABI = (await import("./username.json")).default
export const UNISWAP_ABI = (await import("./Router.json")).default
export const TOKEN_ABI = (await import("./TokenAbi.json")).default
export const DATA_URI_ABI = (await import("./DataUriAbi.json")).default
export { erc721ABI as ERC721_ABI } from 'wagmi'

// custom contract abis
