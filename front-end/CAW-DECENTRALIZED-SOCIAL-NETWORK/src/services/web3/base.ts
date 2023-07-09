import {
    alchemyRpcUrls as wagmiAlchemyRpcUrls,
    Chain,
    chainId as wagmiChainIds,
    etherscanBlockExplorers as wagmiEtherscanBlockExplorers,
    infuraRpcUrls as wagmiInfuraRpcUrls
} from "wagmi";
import env from "../../config/env";
import {_} from "../../utils/primary-utils";
import {ExtendedChain} from "./types";

const {ALCHEMY_KEY: alchemyKey_env, MORALIS_APP_ID, MORALIS_SERVER_URL} = env;

const defaultAlchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';
const ALCHEMY_KEY = alchemyKey_env ?? defaultAlchemyId;

const nativeCurrencies = {
    ETH: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    ropETH: {
        name: 'Ropsten Ether',
        symbol: 'ropETH',
        decimals: 18
    },
    sETH: {
        name: 'Sepolia Testnet',
        symbol: 'sETH',
        decimals: 18
    },
    rETH: {
        name: 'Rinkeby Ether',
        symbol: 'rETH',
        decimals: 18
    },
    gETH: {
        name: 'Goerli Ether',
        symbol: 'gETH',
        decimals: 18
    },
    kETH: {
        name: 'Kovan Ether',
        symbol: 'kETH',
        decimals: 18
    },
    KOR: {
        name: 'Kovan Ether',
        symbol: 'KOR',
        decimals: 18
    },
    AETH: {
        name: 'Ether',
        symbol: 'AETH',
        decimals: 18
    },
    ARETH: {
        name: 'Arbitrum Rinkeby Ether',
        symbol: 'ARETH',
        decimals: 18
    },
    BNB: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    tBNB: {
        name: 'BNB',
        symbol: 'tBNB',
        decimals: 18
    },
    MATIC: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
    },
    AVAX: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
    },
    FTM: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
    },
    CRO: {
        name: "Cronos",
        symbol: "CRO",
        decimals: 18,
    },
    tCRO: {
        name: "Test CRO",
        symbol: "TCRO",
        decimals: 18,
    }
}

const alchemyRpcUrls = {
    ...wagmiAlchemyRpcUrls,
};

const infuraRpcUrls = {
    ...wagmiInfuraRpcUrls
};

const allChainIds = {
    ...wagmiChainIds,
    bsc: 56,
    bscTesnet: 97,
    fantom: 250,
    fantomTestnet: 4002,
    avalanche: 43114,
    avalancheFuji: 43113,
    cronos: 25,
    cronosTestnet: 338,
    sepoliaTestnet: 11155111
};

const etherscanBlockExplorers = {
    ...wagmiEtherscanBlockExplorers,
    bsc: {
        name: 'BNB Smart Chain Explorer',
        url: 'https://bscscan.com'
    },
    bscTestnet: {
        name: 'BNB Smart Chain Testnet Explorer',
        url: 'https://testnet.bscscan.com'
    },
    sepoliaTestnet:{
        name: "Sepolia Testnet Blockchain Explorer",
        url: "https://sepolia.etherscan.io/"
    },
    fantom: {
        name: "Fantom Blockchain Explorer",
        url: "https://ftmscan.com/"
    },
    fantomTestnet: {
        name: "Fantom Testnet Blockchain Explorer",
        url: "https://testnet.ftmscan.com"
    },
    avalanche: {
        name: "Avalanche C-Chain Explorer",
        url: "https://snowtrace.io"
    },
    avalancheFuji: {
        name: "Avalanche C-Chain Testnet Explorer",
        url: "https://testnet.snowtrace.io/"
    },
    cronos: {
        name: "Cronos Chain Explorer",
        url: "https://cronoscan.com/"
    },
    cronosTestnet: {
        name: "Cronos Chain Testnet Explorer",
        url: "https://testnet.cronoscan.com/"
    }
};

export function convertExtendedChainToBaseChain(chain: ExtendedChain): Chain {
    let preparedChain = {...chain};

    preparedChain.rpcUrls = _.pickBy(preparedChain.rpcUrls, (rpcUrl: string | undefined) => {
        return !_.isNil(rpcUrl)
    }) as typeof preparedChain.rpcUrls
    delete (preparedChain as any).keys;
    delete (preparedChain as any).moralisLookup;
    delete (preparedChain as any).addresses;

    return preparedChain as Chain;
}

function filterSelectedChains(chains: ExtendedChain[]): ExtendedChain[] {
    let selectedChains: ExtendedChain[];
    let selectedChainKeysRaw: string | (string | number)[] = env.CHAINS;

    if (typeof selectedChainKeysRaw === 'string') {
        selectedChainKeysRaw = selectedChainKeysRaw.trim()
        selectedChainKeysRaw = [selectedChainKeysRaw];
    }

    if (selectedChainKeysRaw === undefined) {
        selectedChains = chains;
    } else {
        let selectedChainKeys: (string | number)[] = selectedChainKeysRaw.map((key) => typeof key === "string" ? key.toLowerCase() : key);
        selectedChainKeys = selectedChainKeys.map((chainKey) => {
            let newChainKey: string | number = typeof chainKey === "string" ? (chainKey as string).trim() : chainKey;
            return newChainKey;
        });

        selectedChains = chains.map((chain) => {
            const chainId = chain.id;
            const chainKeys = chain.keys.map(chainKey => chainKey.toLowerCase());
            let selected = false;

            if (
                selectedChainKeys.includes(chainId) ||
                selectedChainKeys.some(r => chainKeys.includes((r as string)))
            ) {
                selected = true;
            }

            if (selected) {
                return chain;
            }
        }) as ExtendedChain[];
        selectedChains = _.values(_.omitBy((selectedChains), _.isNil)) as ExtendedChain[];
    }

    return selectedChains;
}

function convertExtendedChainsToBaseChains(extendedChains: ExtendedChain[]): Chain[] {
    const chains = (extendedChains as ExtendedChain[]).map(convertExtendedChainToBaseChain) as Chain[];

    return chains;
}

export const ALL_CHAINS_EXTENDED: ExtendedChain[] = [
    {
        id: allChainIds.mainnet,
        network: "homestead",
        keys: ["ethereum", "mainnet"],
        name: 'Ethereum',
        nativeCurrency: nativeCurrencies.ETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.mainnet,
            infura: infuraRpcUrls.mainnet,
            default: "https://eth.llamarpc.com"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.mainnet,
            default: etherscanBlockExplorers.mainnet
        },
        moralisLookup: ["eth", "0x1"],
        addresses: {
            WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        }
    },
    {
        id: allChainIds.ropsten,
        network: "ropsten",
        keys: ["ropsten", "ethereum-test-ropsten"],
        name: 'Ropsten',
        nativeCurrency: nativeCurrencies.ropETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.ropsten,
            infura: infuraRpcUrls.ropsten,
            default: "".concat(alchemyRpcUrls.ropsten, "/").concat(ALCHEMY_KEY)
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.ropsten,
            default: etherscanBlockExplorers.ropsten
        },
        addresses: {
            WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        },
        testnet: true
    },
    {
        id: allChainIds.rinkeby,
        network: "rinkeby",
        keys: ["rinkeby", "ethereum-test-rinkeby"],
        name: 'Rinkeby',
        nativeCurrency: nativeCurrencies.rETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.rinkeby,
            infura: infuraRpcUrls.rinkeby,
            default: "".concat(alchemyRpcUrls.rinkeby, "/").concat(ALCHEMY_KEY)
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.rinkeby,
            default: etherscanBlockExplorers.rinkeby
        },
        addresses: {
            WETH: ""
        },
        testnet: true,
        moralisLookup: ["rinkeby", "0x4"]
    },
    {
        id: allChainIds.sepoliaTestnet,
        network: "sepolia-testnet",
        keys: ["sepolia-testnet", "sepolia testnet", "sepolia testnet", "sepolia-testnet"],
        name: 'Sepolia',
        nativeCurrency: nativeCurrencies.sETH,
        rpcUrls: {
            alchemy: "https://endpoints.omniatech.io/v1/eth/sepolia/public",
            infura: "https://endpoints.omniatech.io/v1/eth/sepolia/public",
            default: "https://endpoints.omniatech.io/v1/eth/sepolia/public"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.sepoliaTestnet,
            default: etherscanBlockExplorers.sepoliaTestnet
        },
        addresses: {
            WETH: ""
        },
        testnet: true,
    },
    {
        id: allChainIds.goerli,
        network: "goerli",
        keys: ["goerli", "ethereum-test-goerli"],
        name: 'Goerli',
        nativeCurrency: nativeCurrencies.gETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.goerli,
            infura: infuraRpcUrls.goerli,
            default: "".concat(alchemyRpcUrls.goerli, "/").concat(ALCHEMY_KEY)
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.goerli,
            default: etherscanBlockExplorers.goerli
        },
        addresses: {
            WETH: "0xb7e94Cce902E34e618A23Cb82432B95d03096146"
        },
        testnet: true
    },
    {
        id: allChainIds.kovan,
        network: "kovan",
        keys: ["kovan", "ethereum-test-kovan"],
        name: 'Kovan',
        nativeCurrency: nativeCurrencies.kETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.kovan,
            infura: infuraRpcUrls.kovan,
            default: "".concat(alchemyRpcUrls.kovan, "/").concat(ALCHEMY_KEY)
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.kovan,
            default: etherscanBlockExplorers.kovan
        },
        addresses: {
            WETH: "0x59D9ab90528a773935A687Ca5Ee8722EF1af8044"
        },
        testnet: true
    },
    {
        id: allChainIds.optimism,
        network: "optimism",
        keys: ["optimism"],
        name: 'Optimism',
        nativeCurrency: nativeCurrencies.ETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.optimism,
            infura: infuraRpcUrls.optimism,
            default: 'https://mainnet.optimism.io'
        },
        addresses: {
            WETH: "0x4200000000000000000000000000000000000006"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.optimism,
            default: etherscanBlockExplorers.optimism
        }
    },
    {
        id: allChainIds.optimismKovan,
        network: "optimism-kovan",
        keys: ["optimism-kovan", "ethereum-test-optimism-kovan"],
        name: 'Optimism Kovan',
        nativeCurrency: nativeCurrencies.KOR,
        rpcUrls: {
            alchemy: alchemyRpcUrls.optimismKovan,
            infura: infuraRpcUrls.optimismKovan,
            default: 'https://kovan.optimism.io'
        },
        addresses: {
            WETH: "0x4200000000000000000000000000000000000006"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.optimismKovan,
            default: etherscanBlockExplorers.optimismKovan
        },
        testnet: true
    },
    {
        id: allChainIds.polygon,
        network: "polygon",
        keys: ["polygon", "matic"],
        name: 'Polygon',
        nativeCurrency: nativeCurrencies.MATIC,
        rpcUrls: {
            alchemy: alchemyRpcUrls.polygon,
            infura: infuraRpcUrls.polygon,
            default: 'https://polygon-rpc.com'
        },
        addresses: {
            WETH: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.polygon,
            default: etherscanBlockExplorers.polygon
        },
        moralisLookup: ["polygon", "0x89"]
    },
    {
        id: allChainIds.polygonMumbai,
        network: "polygon-mumbai",
        keys: ["polygon-testnet", "polygon-testnet-mumbai", "mumbai", "mumbai-testnet", "matic-testnet", "matic-testnet-mumbai", "matic-mumbai"],
        name: 'Polygon Mumbai',
        nativeCurrency: nativeCurrencies.MATIC,
        rpcUrls: {
            alchemy: alchemyRpcUrls.polygonMumbai,
            infura: infuraRpcUrls.polygonMumbai,
            default: 'https://matic-mumbai.chainstacklabs.com'
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.polygonMumbai,
            default: etherscanBlockExplorers.polygonMumbai
        },
        addresses: {
            WETH: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
        },
        testnet: true,
        moralisLookup: ["mumbai", "0x13881"]
    },
    {
        id: allChainIds.arbitrum,
        network: "arbitrum",
        keys: ["arbitrum"],
        name: 'Arbitrum',
        nativeCurrency: nativeCurrencies.AETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.arbitrum,
            infura: infuraRpcUrls.arbitrum,
            default: 'https://arb1.arbitrum.io/rpc'
        },
        addresses: {
            WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
        },
        blockExplorers: {
            arbitrum: {
                name: 'Arbitrum Explorer',
                url: 'https://explorer.arbitrum.io'
            },
            etherscan: etherscanBlockExplorers.arbitrum,
            default: etherscanBlockExplorers.arbitrum
        }
    },
    {
        id: allChainIds.arbitrumRinkeby,
        network: "arbitrum-rinkeby",
        keys: ["arbitrum-rinkeby", "arbitrum-test-rinkeby"],
        name: 'Arbitrum Rinkeby',
        nativeCurrency: nativeCurrencies.ARETH,
        rpcUrls: {
            alchemy: alchemyRpcUrls.arbitrumRinkeby,
            infura: infuraRpcUrls.arbitrumRinkeby,
            default: 'https://rinkeby.arbitrum.io/rpc'
        },
        addresses: {
            WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
        },
        blockExplorers: {
            arbitrum: {
                name: 'Arbitrum Explorer',
                url: 'https://rinkeby-explorer.arbitrum.io'
            },
            etherscan: etherscanBlockExplorers.arbitrumRinkeby,
            default: etherscanBlockExplorers.arbitrumRinkeby
        },
        testnet: true
    },
    {
        id: allChainIds.bsc,
        network: "binance",
        keys: ["bsc", "binance smart chain", "bnb"],
        name: 'Binance Smart Chain',
        nativeCurrency: nativeCurrencies.BNB,
        rpcUrls: {
            default: 'https://bsc-dataseed.binance.org',
            default2: "https://bsc-dataseed1.defibit.io/",
            default3: "https://bsc-dataseed1.ninicoin.io/"
        },
        addresses: {
            WETH: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.bsc,
            default: etherscanBlockExplorers.bsc
        },
        moralisLookup: ["bsc", "0x38"],
    },
    {
        id: allChainIds.bscTesnet,
        network: "binance-testnet",
        keys: ["bsc-test", "binance smart chain testnet", "bnb-test", "tbnb"],
        name: 'BSC Testnet',
        nativeCurrency: nativeCurrencies.tBNB,
        addresses: {
            WETH: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
        },
        rpcUrls: {
            default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            default2: "https://data-seed-prebsc-2-s1.binance.org:8545/",
            default3: "https://data-seed-prebsc-1-s2.binance.org:8545/",
            default4: "https://data-seed-prebsc-2-s2.binance.org:8545/",
            default5: "https://data-seed-prebsc-1-s3.binance.org:8545/",
            default6: "https://data-seed-prebsc-2-s3.binance.org:8545/"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.bscTestnet,
            default: etherscanBlockExplorers.bscTestnet
        },
        moralisLookup: ["bsc testnet", "0x61"]
    },
    {
        id: allChainIds.fantom,
        network: "fantom",
        keys: ["fantom", "fantom opera", "opera"],
        name: 'Fantom Opera',
        nativeCurrency: nativeCurrencies.FTM,
        rpcUrls: {
            default: 'https://rpc.ftm.tools',
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.fantom,
            default: etherscanBlockExplorers.fantom
        },
        addresses: {
            WETH: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        },
        moralisLookup: ["fantom", "0xfa"]
    },
    {
        id: allChainIds.fantomTestnet,
        network: "fantom-opera",
        keys: ["fantom-testnet", "fantom opera testnet", "opera testnet", "opera-testnet"],
        name: 'Fantom Opera',
        nativeCurrency: nativeCurrencies.FTM,
        rpcUrls: {
            default: 'https://rpc.testnet.fantom.network/',
        },
        addresses: {
            WETH: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.fantomTestnet,
            default: etherscanBlockExplorers.fantomTestnet
        }
    },
    {
        id: allChainIds.avalanche,
        network: "avalanche",
        keys: ["avax", "avalanche"],
        name: 'Avalanche',
        nativeCurrency: nativeCurrencies.AVAX,
        rpcUrls: {
            default: 'https://api.avax.network/ext/bc/C/rpc',
        },
        addresses: {
            WETH: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.avalanche,
            default: etherscanBlockExplorers.avalanche
        },
        moralisLookup: ["avalanche", "0xa86a"]
    },
    {
        id: allChainIds.avalancheFuji,
        network: "avalanche-fuji",
        keys: ["avax-testnet", "avalanche-testnet", "fuji", "avax-fuji", "avalanche-fuji", "avalanche fuji", "avalanche fuji testnet", "avalanche testnet"],
        name: 'Avalanche FUJI Testnet',
        nativeCurrency: nativeCurrencies.AVAX,
        rpcUrls: {
            default: "https://api.avax-test.network/ext/bc/C/rpc",
        },
        addresses: {
            WETH: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.avalancheFuji,
            default: etherscanBlockExplorers.avalancheFuji
        },
        moralisLookup: ["avalanche testnet", "0xa869"]
    },
    {
        id: allChainIds.cronos,
        network: "cronos",
        keys: ["cronos", "cro"],
        name: 'Cronos',
        nativeCurrency: nativeCurrencies.CRO,
        rpcUrls: {
            default: "https://evm.cronos.org"
        },
        addresses: {
            WETH: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.cronos,
            default: etherscanBlockExplorers.cronos
        }
    },
    {
        id: allChainIds.cronosTestnet,
        network: "cronos-testnet",
        keys: ["cronos testnet", "cronos test", "cro test", "cro testnet", "cronos-testnet", "cro-testnet", "cronos-test", "cro-test"],
        name: 'Cronos',
        nativeCurrency: nativeCurrencies.tCRO,
        rpcUrls: {
            default: "https://cronos-testnet-3.crypto.org:8545/"
        },
        addresses: {
            WETH: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"
        },
        blockExplorers: {
            etherscan: etherscanBlockExplorers.avalanche,
            default: etherscanBlockExplorers.avalanche
        },
    },
    {
        id: allChainIds.localhost,
        network: "localhost",
        keys: ["localhost", "127.0.0.1"],
        name: 'Localhost',
        addresses: {
            WETH: ""
        },
        rpcUrls: {
            default: 'http://127.0.0.1:8545'
        }
    },
    {
        id: allChainIds.hardhat,
        network: "hardhat",
        keys: ["hardhat"],
        name: 'Hardhat',
        addresses: {
            WETH: ""
        },
        rpcUrls: {
            default: 'http://127.0.0.1:8545'
        }
    }
];

export const ALL_CHAINS: Chain[] = ALL_CHAINS_EXTENDED.map(convertExtendedChainToBaseChain);
export const ALL_CHAIN_IDS = ALL_CHAINS.map((chain) => chain.id);

export const CHAINS_EXTENDED = filterSelectedChains(ALL_CHAINS_EXTENDED);
export const CHAINS = convertExtendedChainsToBaseChains(CHAINS_EXTENDED);
export const CHAIN_IDS = CHAINS.map((chain) => chain.id);

export const DEFAULT_CHAIN_ID = CHAINS.find(chain => chain.id === env.DEFAULT_CHAIN_ID)?.id ?? CHAINS[0]?.id;
export const DEFAULT_CHAIN_EXTENDED = CHAINS_EXTENDED.find((chain) => chain.id === DEFAULT_CHAIN_ID) as ExtendedChain;
export const DEFAULT_CHAIN = convertExtendedChainToBaseChain(DEFAULT_CHAIN_EXTENDED);

export const IS_MORALIS_AVAILABLE = !!MORALIS_APP_ID && !!MORALIS_SERVER_URL;
