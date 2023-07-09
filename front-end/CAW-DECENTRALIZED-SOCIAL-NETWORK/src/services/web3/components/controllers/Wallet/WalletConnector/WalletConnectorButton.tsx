import * as React from "react";
import {AccountBalanceWallet} from "@mui/icons-material";
import {Box, Button, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {grey} from "@mui/material/colors";

const WALLET_CHIP = {
    border: `1px solid ${grey[800]};`,
    height: "40px",
    ml: 1,
    backgroundColor: grey[800],
    color: "white",
    "& > .MuiChip-label": {
        pr: 0,
        pl: 1.5,
        display: "flex",
        alignItems: "center"
    },
    "&:hover": {
        cursor: "pointer",
        border: `1px solid ${grey[700]};`,
    }
}

const WALLET_BUTTON = {
    width : "180px",
    height: "60px",
    background: "#F9C336",
    border: "none",
    borderRadius: "20px",
    fontSize: "20px",
    fontFamily: "Karla",
    fontWeight: "bold",
    color: "#14213D",
    "&:hover": {
        cursor: "pointer",
        transition: "0.4s",
        background: "#e3b34c",
    }
}


function WalletConnectorButton({handleOpen, CustomComponent, ...props}: { handleOpen: () => void, CustomComponent?: any }) {
    if(CustomComponent) {
        // example CustomComponent prop input:
        // (props: any) => <Button variant="outlined" {...props}>Connect</Button>
        return <CustomComponent onClick={handleOpen} {...props} />;
    }
    return (
        <Box sx={WALLET_BUTTON} onClick={handleOpen} component={"button"}>
            <i style={{marginRight: "10px"}} className="fa-solid fa-wallet"></i>
            Connect
        </Box>
        // <Chip
        //     clickable={false}
        //     variant="filled"
        //     onClick={handleOpen}
        //     label={
        //         <>
        //             <Typography component="span" sx={{color: "white"}}>Connect Your Wallet</Typography>
        //             <AccountBalanceWallet  sx={{mx: 1}}/>
        //         </>
        //     }
        //     sx={WALLET_CHIP}
        // />
    )
}

export default WalletConnectorButton;
