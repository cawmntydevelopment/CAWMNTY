import React, {useCallback, useState} from "react";
import {Button, MenuItem, Select} from "@mui/material";
import {CHAIN_IDS} from "../../base";
import {useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from "wagmi";
import {getChain} from "../../helpers";
import WalletConnectorController from "../controllers/Wallet/WalletConnector/WalletConnectorController";

function SelectChain({
                         chainId,
                         switchChain,
                         displayDefault,
                         chainIds,
                     }: {
    chainId?: number | string
    switchChain: (chainId: number) => void | undefined
    displayDefault: boolean
    chainIds: number[]
}) {
    return (
        <Select
            defaultValue=""
            value={chainId ?? ""}
            onChange={(event) => {
                switchChain?.(Number(event.target.value))
            }}
            disabled={switchChain === undefined}
        >
            {displayDefault ? <MenuItem value={""}>Default Chain</MenuItem> : null}
            {chainIds.map((chainId) => {
                const chain = getChain(chainId);

                return (
                    <MenuItem key={chainId} value={chainId}>
                        {chain?.name ?? chainId}
                    </MenuItem>
                )
            })}
        </Select>
    )
}

export function ConnectWithSelect() {
    const {error} = useConnect();
    const {connector} = useAccount();
    const {chain} = useNetwork();
    const {switchNetworkAsync} = useSwitchNetwork()
    const {disconnect} = useDisconnect();

    const chainId = chain?.id;
    const isActive = !!connector;
    const chainIds = CHAIN_IDS;

    const [desiredChainId, setDesiredChainId] = useState<number | string>("");

    async function connectChain(chainId: number) {
        return switchNetworkAsync?.(chainId);
    }

    async function disconnectChain() {
        return disconnect();
    }

    const switchChain: (desiredChainId: number) => void = useCallback(
        async (desiredChainId: number) => {
            setDesiredChainId(desiredChainId);

            await connectChain(desiredChainId as number);
        },
        [connector, chainId]
    )

    if (error) {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <SelectChain
                    chainId={desiredChainId}
                    switchChain={switchChain}
                    displayDefault={false}
                    chainIds={chainIds}
                />
                <div style={{marginBottom: '1rem'}}/>
                <Button
                    onClick={() =>
                        connectChain(desiredChainId as number)
                    }
                    variant="outlined"
                >
                    Try Again?
                </Button>
            </div>
        )
    } else if (isActive) {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <SelectChain
                    chainId={(desiredChainId === -1 ? -1 : chainId as number)}
                    switchChain={switchChain}
                    displayDefault={false}
                    chainIds={chainIds}
                />
                <div style={{marginBottom: '1rem'}}/>
                <Button onClick={() => disconnectChain()} variant="outlined">Disconnect</Button>
            </div>
        )
    } else {
        return (
            <WalletConnectorController
                CustomButton={(props: any) => <Button variant="outlined" {...props}>Connect</Button>}/>
        )
    }
}
