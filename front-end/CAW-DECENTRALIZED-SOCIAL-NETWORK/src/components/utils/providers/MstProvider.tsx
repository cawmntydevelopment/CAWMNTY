import React, {useEffect, useState} from "react";
import {RootStore, RootStoreProvider, setupRootStore} from "../../../models";

export function MstProvider({children}: { children: any }) {
    const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
    // Kick off initial async loading actions, like loading fonts and RootStore
    useEffect(() => {
        (async () => {
            setupRootStore().then(async (initializedStore) => {
                setRootStore(initializedStore);
            })
        })()
    }, [])

    if (!rootStore) return null;

    return (
        <RootStoreProvider value={rootStore}>
            {children}
        </RootStoreProvider>
    )
}
