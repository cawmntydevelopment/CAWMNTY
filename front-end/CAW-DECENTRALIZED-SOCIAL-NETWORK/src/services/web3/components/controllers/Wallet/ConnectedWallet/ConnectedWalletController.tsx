import React, {useState} from "react";
import ConnectedWalletButton from "./ConnectedWalletButton";
import ConnectedWalletMenu from "./ConnectedWalletMenu";

function ConnectedWalletController() {
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleClick = (event: React.MouseEventHandler<HTMLDivElement>) => {
        // @ts-ignore
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ConnectedWalletButton onClick={handleClick}/>
            <ConnectedWalletMenu anchorEl={anchorEl} onClose={handleClose}/>
        </>
    )
}

export default ConnectedWalletController;
