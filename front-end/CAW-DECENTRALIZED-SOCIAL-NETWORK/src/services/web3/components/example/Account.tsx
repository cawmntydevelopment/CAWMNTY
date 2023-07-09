import React from 'react'
import {useBalance, useEnsName, useNetwork} from 'wagmi';
import Identicon from "../Identicon";
import {DEFAULT_CHAIN_ID} from "../../base";

export function Account({address}: { address?: string }) {
    if (address === undefined) return null;

    const {chain} = useNetwork();
    const isInvalidNetwork = !chain || chain.unsupported || false;

    const {data: balanceData} = useBalance({
        addressOrName: address,
        formatUnits: "ether",
        chainId: isInvalidNetwork ? DEFAULT_CHAIN_ID : chain?.id,
        watch: true
    })



    return (
        <>
        </>
    )
}
