import React, {ComponentProps} from "react";
import {IS_MORALIS_AVAILABLE} from "../base";
import {WagmiConfig} from "wagmi";
import {MoralisProvider as MoralisProviderBase} from "react-moralis";
import {wagmiClient} from "../connection";
import env from "../../../config/env";

const {MORALIS_APP_ID, MORALIS_SERVER_URL} = env;

type MoralisProviderProps = {
    children: JSX.Element
} & ComponentProps<typeof MoralisProviderBase>

function MoralisProvider({children, ...props}: MoralisProviderProps): JSX.Element {
    return IS_MORALIS_AVAILABLE ?
        <MoralisProviderBase {...props}>
            {children}
        </MoralisProviderBase>
        : children
}

export default function Web3ServicesProvider({children}: { children: any }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <MoralisProvider appId={MORALIS_APP_ID as string} serverUrl={MORALIS_SERVER_URL as string}>
                {children}
            </MoralisProvider>
        </WagmiConfig>
    )
}
