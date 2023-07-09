import React from 'react';
import Typography from "@mui/material/Typography";
import {Avatar, Box} from "@mui/material";
import {WalletButton} from "../../../services/web3";
import {WalletBox} from "./Wallet/WalletBox";

const TITLE = {
    fontSize: "20px",
    fontWeight: "800",
    fontFamily: "Karla",
}

const DESCRIPTION = {
    fontFamily: "Karla",
    fontSize: "14px",
    fontWeight: "500px",
    height:"250px",
    marginTop: "11px",
    marginBottom:"20px",
    color:"krmrPlate.mainTextColor",
    overflowY: "auto"
}

const ICON = {
    fontSize: "35px",
    marginTop: "20px",
    marginBottom: "16px",
    color: "#F9C336"
}

const CONNECTED_BOX = {
    marginTop: "30px",
    marginBottom: "28px"
}


export const Setup1 = ({account}: { account: string | undefined }) => {


    return (
        <Box>
            <Box sx={ICON} component={"i"} className={"fa-solid fa-circle-info"}></Box>
            <Typography sx={TITLE}>
                The first step is to connect an "empty wallet". Please link a empty wallet address!
            </Typography>
            <Typography sx={DESCRIPTION}>
                What is an NFT? <br/>
                NFT refers to a Non-Fungible Token and is a digital asset that is unique and stored on a blockchain that allows for the secure transfer of ownership of digital assets. <span style={{fontWeight:"900"}}>Ownership of an NFT username will provide access to the associated account.</span>
                <dl style={{textAlign:"start"}}>
                    <li>All user activity, social and financial flows are handled through your NFT username.</li>
                    <li>A wallet can have several usernames.</li>
                    <li>You can mint as many NFTs as you can in line with your balance.</li>
                </dl>
            </Typography>
            {
                account ?
                    <WalletBox notTitle={true} account={account}/>
                    :
                    <Box sx={CONNECTED_BOX}>
                        <WalletButton/>
                    </Box>
            }
        </Box>
    );
};
