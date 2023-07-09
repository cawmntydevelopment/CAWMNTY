import {IS_MORALIS_AVAILABLE} from "./base";
import {useEffect, useState} from "react";
import {fetchNFTsForContract} from "./helpers";
import {ConnectorName, MoralisChainId, MoralisWeb3Api} from "./types";
import {useAccount, useConnect} from "wagmi";

export function useConnector(name?: ConnectorName, config?: (Parameters<typeof useConnect>)[0]) {
    const {connector} = useAccount();
    const {
        connectors
    } = useConnect(config);

    const requestedConnector = name ? connectors.find(connector => connector.name === name) : connector;

    return requestedConnector;
}

export function useInventory(morallisWeb3Api: MoralisWeb3Api, morallisChainId: MoralisChainId, walletAddress: string, contractAddress: string) {
    if (!IS_MORALIS_AVAILABLE) return null;

    const [inventory, setInventory] = useState<null | any[]>(null);

    useEffect(() => {
        if (!morallisChainId || !walletAddress || !contractAddress) return;
        fetchNFTsForContract(morallisWeb3Api as MoralisWeb3Api, morallisChainId as MoralisChainId, walletAddress, contractAddress).then((inventoryResult) => {
            if (inventoryResult?.result) {
                setInventory(inventoryResult.result);
            }
        });
    }, [morallisChainId, walletAddress, contractAddress])

    return inventory;
}
