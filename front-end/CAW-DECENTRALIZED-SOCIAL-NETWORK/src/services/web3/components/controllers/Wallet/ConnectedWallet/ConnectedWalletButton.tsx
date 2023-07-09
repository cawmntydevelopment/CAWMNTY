import React from "react";
import {Box, Chip} from "@mui/material";
import {humanReadableAmount} from "../../../../helpers";
import {_} from "../../../../../../utils/primary-utils";
import {grey} from "@mui/material/colors";
import {useAccount, useBalance, useNetwork} from "wagmi";
import Identicon from "../../../Identicon";

const ROOT_CHIP = {
    userSelect: "none",
    height: "40px",
    backgroundColor: grey[900],
    color: "white",
    "& > .MuiChip-label": {
        pr: 0,
        display: "flex",
        alignItems: "center"
    }
};

const WALLET_CHIP = {
    border: `1px solid ${grey[800]};`,
    height: "40px",
    ml: 1,
    backgroundColor: grey[800],
    color: "white",
    "& > .MuiChip-label": {
        pr: 0,
        pl: 0,
        display: "flex",
        alignItems: "center"
    },
    "&:hover": {
        cursor: "pointer",
        border: `1px solid ${grey[700]};`
    }
};

function ConnectedWalletButton({onClick}: { onClick: (event: any) => void }) {
    const {address: account} = useAccount();
    const shortenedAccount = account ? account.slice(0, 6) + "..." + account.slice(38) : "";
    const {chain} = useNetwork();
    const isInvalidNetwork = !chain || chain.unsupported || false;
    const {data: balanceData} = useBalance({
        addressOrName: account,
        watch: true
    });
    const balance = balanceData?.value;

    const currencySymbol = chain?.nativeCurrency?.symbol;
    const humanReadableBalance = !_.isNil(balance) ? humanReadableAmount(balance, 4, balanceData?.decimals) : "0";
    const balanceText = isInvalidNetwork ? "Invalid Network" : humanReadableBalance + " " + currencySymbol;

    return (
        <Chip label={
            <>
                {balanceText}
                <Chip
                    clickable={false}
                    variant="filled"
                    label={
                        <>
                            {shortenedAccount && <Box component="span" sx={{pl: 1}}>{shortenedAccount}</Box>
                            }
                            <Identicon sx={{mx: 1}} address={account}/>
                        </>
                    }
                    sx={WALLET_CHIP}
                    onClick={onClick}
                />
            </>
        } variant="filled" sx={ROOT_CHIP}/>
    );
}

export default ConnectedWalletButton;
