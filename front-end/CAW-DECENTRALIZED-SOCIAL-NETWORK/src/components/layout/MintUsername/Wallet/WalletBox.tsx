import React from 'react';
import Typography from "@mui/material/Typography";
import {Avatar, Box} from "@mui/material";


const CONNECTED_BOX = {
    marginTop: "30px",
    marginBottom: "28px"
}

const CONECT_TEXT = {
    fontWeight: "700",
    fontFamily: "Karla",
    fontSize: "17px",
}

const AVATAR = {
    width: "30px",
    height: "30px",
    fontSize: "12px",
    background: "#e0e0e0",
    color: "black"
}

const WALLET_SBSTR = {
    marginLeft: "8px",
    fontFamily: "Karla",
    fontWeight: "700",
}

export const WalletBox = ({account, notTitle}: { account: string | undefined, notTitle?: boolean }) => {

    const addressSubstr = account?.substring(0, 5) + "..." + account?.substring((account?.length - 5), account?.length);
    // @ts-ignore
    const addressAvatar = account?.substring(((account?.length ?? 0) - 1), (account?.length ?? 0)) + account?.substring(0, 1) ?? "0x";


    return (
        <Box sx={notTitle ? {CONNECTED_BOX} : {mt:"10px"}}>
            {notTitle && <Typography sx={CONECT_TEXT}>
							Connected Wallet
						</Typography>}

            <Box sx={notTitle ? {mt:1,mb:3} :  {mt: 0}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Avatar sx={AVATAR}>{addressAvatar}</Avatar>
                <Typography sx={WALLET_SBSTR}>{addressSubstr}</Typography>
            </Box>
        </Box>
    );
};
