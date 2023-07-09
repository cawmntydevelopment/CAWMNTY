import React from 'react'
import {getChain} from "../../helpers";

export function Chain({chainId}: { chainId?: number }) {
    if (chainId === undefined) return null;

    const name = chainId ? getChain(chainId)?.name : undefined;

    if (name) {
        return (
            <div>
                Chain:{' '}
                <b>
                    {name} ({chainId})
                </b>
            </div>
        )
    }

    return (
        <div>
            Chain Id: <b>{chainId}</b>
        </div>
    )
}
