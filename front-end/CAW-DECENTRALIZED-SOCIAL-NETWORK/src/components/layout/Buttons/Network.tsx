import React from 'react';
import {Button} from "@mui/material";

export const AddNetwork = ({
                               text,
                               chainId,
                               name,
                               tokenName,
                               tokenSymbol,
                               tokenDecimals,
                               rpcs,
                               explorer
                           }: { text: string, chainId: string, name: string, tokenName: string, tokenSymbol: string, tokenDecimals: number, rpcs: any[], explorer: any[] }) => {

    function add() {

        // @ts-ignore
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: chainId,
                chainName: name,
                nativeCurrency: {
                    name: tokenName,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals
                },
                rpcUrls: rpcs,
                blockExplorerUrls: ["https://endpoints.omniatech.io/v1/eth/sepolia/public"]
            }]
        })
            .catch((error) => {
                console.log(error)
            })


    }

    return (
        <Button onClick={() => add()}>
            {text}
        </Button>
    );
};
