import React, {useState} from "react";
import WalletConnectorModal from "./WalletConnectorModal"
import WalletConnectorButton from "./WalletConnectorButton";

function WalletConnectorController({CustomButton}: {CustomButton?: any}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <WalletConnectorButton handleOpen={handleOpen} CustomComponent={CustomButton}/>
            <WalletConnectorModal
                open={open}
                onClose={handleClose}
            />
        </>
    );
}

export default WalletConnectorController;
