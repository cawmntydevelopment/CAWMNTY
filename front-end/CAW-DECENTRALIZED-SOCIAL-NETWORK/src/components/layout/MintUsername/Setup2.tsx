import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import {Alert, Avatar, Box, Button, CircularProgress, Grid} from "@mui/material";
import {CAW_ADDRESS, WalletButton} from "../../../services/web3";
import {Tokens} from "./Tokens/Tokens";
import {AddNetwork} from "../Buttons/Network";
import {useAccount, useNetwork, useToken} from "wagmi";
import {AddToken} from "../Buttons/AddToken";
import axios from "axios";

const TITLE = {
    fontSize: "20px",
    fontWeight: "800",
    fontFamily: "Karla",
}

const DESC = {
    fontSize: "15px",
    mb: "31px"
}

const FAUCET = {
    fontWeight: "500",
    fontSize: "18px",
    mb: "8px"
}

const A = {
    background: "#EDEDED",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "30px",
    fontWeight: "bold",
    borderRadius: "8px",
    color: "black",
    fontSize: "18px",
    marginLeft: "5px",
    marginRight: "5px",
    px:2
}

const LOAD_STYLE = {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.48)",
    position: "absolute",
    left: 0,
    zIndex: 10,
    borderRadius: "13px",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

export const Setup2 = () => {

    const {chain} = useNetwork()
    const {address: account} = useAccount();

    const [faucetData, setFaucetData] = useState<any>();
    const [manuelDisaled, setManuelDisabled] = useState(false)

    const {data: token} = useToken({
        address: CAW_ADDRESS,
        chainId: chain?.id
    })


    const faucetLink = [
        {
            title: "Sepolia ETH",
            link: "https://sepoliafaucet.com/"
        },
    ]

    async function tCawFaucet() {
        setManuelDisabled(true)
        return await axios
            .get("https://caw-faucet.qoala.dev/api/send?wallet=" + account)
            .then(function (response) {
                setFaucetData(response.data)
                setManuelDisabled(false)
            });
    }

    console.log(faucetData)

    return (
        <Box>
            {
                manuelDisaled &&
							<Box sx={LOAD_STYLE}>
								<CircularProgress color={"warning"}></CircularProgress>
							</Box>
            }
            <Typography sx={TITLE}>
                MY BALANCES
            </Typography>
            {faucetData &&
							<Box sx={{mt: 3}}>
                  {
                      faucetData.status === 400 && <Alert severity="error">{faucetData.data}</Alert>
                  }
                  {
                      faucetData.status === 200 && <Alert severity="success">1000000 tCAW sent.</Alert>
                  }
							</Box>
            }

            <Grid sx={{my: "31px"}} container>
                <Tokens col={12} isEth={true} img={"/assets/img/eth.png"} imgSize={"15px"} setup={2}/>
                <Tokens col={12} tokenAddress={CAW_ADDRESS} imgSize={"25px"}
                        img={"/assets/img/logo.png"} setup={2}/>
                <Tokens col={12} tokenAddress={"0xf3b9569F82B18aEf890De263B84189bd33EBe452"} imgSize={"25px"}
                        img={"/assets/img/logo.png"} setup={2}/>
            </Grid>
            <Box sx={DESC}>
                <AddNetwork
                    text={"ADD WALLET " + "Sepolia" + " NETWORK"}
                    chainId={'0xaa36a7'}
                    name={"Sepolia Testnet"}
                    tokenName={"ETH"}
                    tokenDecimals={18}
                    tokenSymbol={"ETH"}
                    rpcs={["https://eth-sepolia.public.blastapi.io"]}
                    explorer={[chain?.blockExplorers?.default ?? "https://sepolia.etherscan.io/"]}
                />

                <AddToken
                    tokenAddress={token?.address ?? CAW_ADDRESS}
                    tokenSymbol={token?.symbol ?? "tCAW"}
                    tokenDecimals={token?.decimals ?? 18}
                    text={"ADD WALLET " + token?.symbol + " TOKEN"}
                    tokenImage={"https://omerkrmr.com/dq%C3%B6/caw.png"}
                />
            </Box>
            <Typography sx={FAUCET}>Faucet</Typography>
            <Box sx={{mb: "58px"}} display={"flex"} justifyContent={"center"}>
                {
                    faucetLink?.map((data, index: number) => <Box key={index} target={"_blank"} sx={A} component={"a"}
                                                                  href={data.link}>{data.title}</Box>)
                }
                <Box sx={{...A,border: "none", cursor:"pointer"}} disabled={manuelDisaled} onClick={() => tCawFaucet()}
                     component={"button"}>tCAW Token</Box>
            </Box>
        </Box>
    );
};
