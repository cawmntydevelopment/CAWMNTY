import {BigNumber, BigNumberish, BytesLike, providers} from "ethers";
import {useMoralisWeb3Api} from "react-moralis";
import {Chain} from "wagmi";

export type ConnectorName = "metaMask" | "coinbaseWallet" | "walletConnect";

export type IWeb3Provider = providers.Web3Provider;
export type IJsonRpcSigner = providers.JsonRpcSigner;

export type MoralisWeb3Api = ReturnType<typeof useMoralisWeb3Api>
export type MoralisChainId = Parameters<MoralisWeb3Api["account"]["getNFTsForContract"]>[0]["chain"];

export type HumanReadableAmountInput = BigNumberish | string | number | BigNumber | BytesLike | BigInt

export interface ExtendedChain extends Chain {
    keys: string[],
    moralisLookup?: MoralisChainId[],
    addresses: {
        WETH: string
    }
}

export interface ConnectorInformation {
    icon: string
}

export interface ConnectorInformations {
    [connectorId: string]: ConnectorInformation
}
