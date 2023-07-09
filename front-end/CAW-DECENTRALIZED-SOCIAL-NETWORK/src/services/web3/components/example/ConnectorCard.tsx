import React from 'react'
import {useAccount, useConnect, useNetwork} from "wagmi";
import {Status} from "./Status";
import {Chain} from "./Chain";
import {Account} from "./Account";
import {Card} from './Card';
import {ConnectWithSelect} from "./ConnectWithSelect";
import {getWETHAddress} from "../../helpers";

export default function ConnectorCard() {
    const {error} = useConnect();
    const {address: account, connector, isConnecting, isConnected} = useAccount();
    const {chain} = useNetwork();
    const chainId = chain?.id;
    const address = getWETHAddress(chainId);
    return (
        <Card>
            <div>
                <b>{connector?.name}</b>
                <Status isActivating={isConnecting} error={error} isActive={isConnected}/>
                <div style={{marginBottom: '1rem'}}/>
                <div style={{wordWrap: "break-word", marginTop: "15px", marginBottom: "15px"}}><span
                    style={{fontWeight: "bold"}}>WETH ADDRESS:</span><br/>{address}</div>
                <Chain chainId={chainId}/>
                <Account address={account}/>
            </div>
            <div style={{marginBottom: '1rem'}}/>
            <ConnectWithSelect/>
        </Card>
    )
}
