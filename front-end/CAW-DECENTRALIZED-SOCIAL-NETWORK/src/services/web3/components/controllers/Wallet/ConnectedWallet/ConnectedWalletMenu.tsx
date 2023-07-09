import React from "react";
import {Menu, MenuItem} from "@mui/material";
import {useDisconnect} from "wagmi";

function ConnectedWalletMenu({anchorEl, onClose}: { anchorEl: any, onClose: () => void }) {
    const open = !!anchorEl;
    const { disconnect } = useDisconnect()

    async function handleDisconnectWallet() {
        await disconnect();
        onClose();
    }

    return (
        <Menu
            id="connectedWallet-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <MenuItem onClick={handleDisconnectWallet}>Disconnect Wallet</MenuItem>
        </Menu>
    )
}

export default ConnectedWalletMenu;
