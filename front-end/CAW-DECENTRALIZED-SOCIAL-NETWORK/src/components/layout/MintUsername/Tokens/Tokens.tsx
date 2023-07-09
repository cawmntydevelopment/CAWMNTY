import React from 'react';
import {Avatar, Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAccount, useBalance} from "wagmi";
import {humanReadableAmount} from "../../../../services/web3";
import {BigNumber} from "ethers";


const AVATAR = {
    width: "35px",
    height: "35px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
    background: "#F1F1F1"
}

const BALANCE = {
    ml: 1,
    fontWeight: "500"
}

export const Tokens = ({
                           col,
                           img,
                           isEth,
                           tokenAddress,
                           imgSize,
                           setup,
                           price,
    customSymbol
                       }: { col: number, img: string, isEth?: boolean, tokenAddress?: `0x${string}`, imgSize: string, setup: number, price?: string | null,customSymbol?:string }) => {

    const {address: account} = useAccount();



    const {data} = useBalance({
        addressOrName: account,
        token: isEth ? undefined : (tokenAddress ?? undefined),
        enabled: (!!tokenAddress || isEth),
        watch: true
    })

    if (setup === 2) return (
        <Grid sx={col == 12 ? {marginTop: "18px"} : {marginTop: "0px"}} sm={col} md={col} xl={col} xs={col} lg={col}
              display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Avatar sx={AVATAR}>
                <Box sx={{width: imgSize}} component={"img"} src={img}/>
            </Avatar>
            <Typography
                sx={BALANCE}>{humanReadableAmount((data?.value ?? BigNumber.from(0)), 6)} {data?.symbol}</Typography>
        </Grid>
    );

    return (
        <Grid sx={col == 12 ? {marginTop: "15px"} : {marginTop: "0px"}} sm={col} md={col} xl={col} xs={col} lg={col}
              display={"flex"} alignItems={"center"} justifyContent={"center"}>

            <Avatar sx={AVATAR}>
                <Box sx={{width: imgSize}} component={"img"} src={img}/>
            </Avatar>

            <Box sx={{width: "100%"}} display={"flex"} justifyContent={"start"}>
                <Typography
                    sx={{
                        ...BALANCE,
                        ml: 2
                    }}>{price} {customSymbol ?? data?.symbol}</Typography>
            </Box>
        </Grid>
    )

};

