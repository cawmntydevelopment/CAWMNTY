import {_} from "../../utils/primary-utils";
import {
    ALL_CHAINS,
    ALL_CHAINS_EXTENDED,
    CHAINS,
    CHAINS_EXTENDED,
    DEFAULT_CHAIN,
    DEFAULT_CHAIN_EXTENDED,
    IS_MORALIS_AVAILABLE
} from "./base";
import {Chain, Connector} from "wagmi";
import {BigNumber} from "ethers";
import {formatUnits} from "ethers/lib/utils";
import {create as apisauceCreate} from "apisauce";
import {ExtendedChain, HumanReadableAmountInput, MoralisChainId, MoralisWeb3Api} from "./types";
import {connectorInformations} from "./connection";
import env from "../../config/env";

const apisauce = apisauceCreate({
    baseURL: ""
});

export function getChain(identifier?: string | number, showExtended: boolean = false, includeAllChains: boolean = false, fallbackToDefaultChain: boolean = false) {
    const defaultChain = showExtended ? DEFAULT_CHAIN_EXTENDED : DEFAULT_CHAIN;
    const fallbackChain = fallbackToDefaultChain ? defaultChain : null;

    if (_.isNil(identifier) || !(_.isNumber(identifier) || _.isString(identifier))) return fallbackChain;

    const extendedChains = includeAllChains ? ALL_CHAINS_EXTENDED : CHAINS_EXTENDED;
    const baseChains = includeAllChains ? ALL_CHAINS : CHAINS;
    const chains = (showExtended ? extendedChains : baseChains) as Chain[] | ExtendedChain[];

    if (_.isString(identifier)) {
        return _.find(extendedChains, (chain) => {
            return chain.keys.map((chainKey) => chainKey.toLowerCase()).includes((identifier as string).toLowerCase());
        }) as ExtendedChain;
    }

    const foundChainUsingId = (chains.find((chain) => chain.id === identifier) ?? null) as Chain | ExtendedChain | null;
    if (foundChainUsingId) return foundChainUsingId;

    return fallbackChain;
}

export function getExtendedChain(identifier: string | number, includeAllChains: boolean = false): ExtendedChain | null {
    const extendedChain = getChain(identifier, true, includeAllChains) as ExtendedChain | null;

    return extendedChain;
}

export function getBaseChain(identifier: string, includeAllChains: boolean = false): Chain | null {
    const chain = getChain(identifier, false, includeAllChains) as Chain | null;

    return chain;
}


export function getChainId(identifier: string | number, includeAllChains: boolean = false): number | null {
    const extendedChain = getChain(identifier, false, includeAllChains);

    if (!extendedChain) return null;

    const chainId = extendedChain.id;

    return chainId;
}

export function getJsonRpcUrl(chainId?: number, fallbackToDefaultChain: boolean = false) {
    const chain = getChain(chainId, false, false, fallbackToDefaultChain);

    const jsonRpcUrl = (chain?.rpcUrls?.alchemy && !!env.ALCHEMY_KEY)
        ? `${chain.rpcUrls.alchemy}/${env.ALCHEMY_KEY}`
        : chain?.rpcUrls?.default;

    return jsonRpcUrl;
}

export function humanReadableAmount(amount: HumanReadableAmountInput, requestedDecimals: number = 18, tokenDecimals: number = 18, formatSmallNumbers = true) {
    // TODO: string olarak keserken round yapılacak
    if (
        _.isNil(amount) ||
        (typeof amount === 'string' && !/^((\+|-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(amount))
    ) return null;

    const amountBn = BigNumber.isBigNumber(amount) ? amount : BigNumber.from(amount);
    let formattedAmount = formatUnits(amountBn, tokenDecimals);

    if (+formattedAmount === 0) return "0";

    let shortenedAmount = (+formattedAmount).toFixed(requestedDecimals);

    if (formatSmallNumbers && +shortenedAmount === 0) {
        let tempAmount = formattedAmount.slice(2);

        tempAmount = _.trimStart(tempAmount, "0").slice(0, requestedDecimals);
        tempAmount = "0..." + tempAmount;
        shortenedAmount = tempAmount;
    }

    const shortenedSplit = shortenedAmount.split('.');

    const shortenedBase = shortenedSplit[0];
    const shortenedDecimals = _.trimEnd(shortenedSplit[1], "0");

    if (+shortenedDecimals === 0) {
        shortenedAmount = shortenedBase;
    } else {
        shortenedAmount = shortenedBase + "." + shortenedDecimals;
    }

    return shortenedAmount;
}

export async function fetchNFTsForContract(moralisWeb3Api: MoralisWeb3Api, chain: MoralisChainId, walletAddress: string, tokenAddress: string) {
    if (!IS_MORALIS_AVAILABLE) return null;

    const options = {
        chain: chain,
        address: walletAddress,
        token_address: tokenAddress
    };
    const nfts = await moralisWeb3Api.account.getNFTsForContract(options);

    return nfts;
}

export function getConnectorInformationByConnector(connector: Connector) {
    const connectorId = connector.id;

    const connectorInformation = connectorInformations[connectorId];

    return connectorInformation;
}

export function isChainSupported(chainId?: number) {
    return CHAINS.some((x) => x.id === chainId)
}

export function getAddresses(identifier?: string | number | Chain | ExtendedChain, includeAllChains: boolean = true) {
    let chain = ["string", "number"].includes(typeof identifier) ? getChain(identifier as string | number, true, includeAllChains) : identifier as Chain | ExtendedChain;
    if (!chain) return null;

    if (!(chain as ExtendedChain)?.addresses) {
        chain = getExtendedChain(chain.id, includeAllChains) as ExtendedChain;
    }
    const addresses = (chain as ExtendedChain).addresses;
    return addresses;
}

export function getWETHAddress(identifier?: string | number | Chain | ExtendedChain, includeAllChains: boolean = true) {
    return getAddresses(identifier, includeAllChains)?.WETH ?? null;
}

export async function getBNBPrice() {
    const query = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";

    const response = await apisauce.get(query);
    const responseBody = response.data as any;
    const price = responseBody.price;

    return price;
}
