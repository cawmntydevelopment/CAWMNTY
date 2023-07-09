import React from "react";
import WalletConnectorController from "./WalletConnector/WalletConnectorController";
import ConnectedWalletController from "./ConnectedWallet/ConnectedWalletController";
import {useAccount} from "wagmi";

function WalletButton({CustomButton}: {CustomButton?: any}) {
    const {isConnected} = useAccount();

    return isConnected ? <ConnectedWalletController/> : <WalletConnectorController CustomButton={CustomButton}/>;
}

export default WalletButton;
