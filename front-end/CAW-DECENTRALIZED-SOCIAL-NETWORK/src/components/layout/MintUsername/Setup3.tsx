import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Alert, Box, Grid, Tooltip} from "@mui/material";
import {
    CAW_ADDRESS,
    humanReadableAmount, MAIN_CAW_ADDRESS, UNISWAP_ABI,
    UNISWAP_ADDRESS, USDT_ADDRESS, USERNAME_ABI, USERNAME_ADDRESS, WETH_ADDRESS,
} from "../../../services/web3";
import {Tokens} from "./Tokens/Tokens";
import {BigNumber} from "ethers";
import {createAlchemyWeb3} from "@alch/alchemy-web3";
import {useAccount, useBalance, useContractRead} from 'wagmi';
import {Setup4} from "./Setup4";
import env from "../../../config/env";

const {MAINNET_ALCHEMY} = env;

const TITLE = {
    fontSize: "20px",
    fontWeight: "800",
    fontFamily: "Karla",
}

const INPUT = {
    width: "100%",
    marginTop: "21px",
    background: "#EFEFEF",
    border: "none",
    height: "36px",
    borderRadius: "8px",
    fontSize: "18px",
    px: "15px",
    color: "black"
}

const GO_BTN = {
    position: "absolute",
    right: "25px",
    background: "#F9C336",
    py: 1,
    px: 4,
    border: "none",
    borderRadius: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: 10
}

const web3 = createAlchemyWeb3(MAINNET_ALCHEMY);

export const Setup3 = ({
                           loader,
                           transaction
                       }: { loader: (type?: "go" | "back" | "mint") => void, transaction: any }) => {

    const [username, setUsername] = useState("");
    const [weth, setWeth] = useState("");
    const [calculateEth, setCalculateEth] = useState("0");
    const [calcuteUsdt, setCalculateUsdt] = useState("0");
    const [scane, setScane] = useState<1 | 2>(1);

    const changeUsername = (event: any) => {
        if (event.target.value.length <= 12) {
            setUsername((event.target.value)?.replaceAll(" ", "_"))
        }
    }

    const decimals = ["000000000000000000", "000000"];


    function getCost(type: "eth" | "usdt") {
        const selectedDecimals = (type === "eth" ? decimals[0] : decimals[1]) ?? "000000000000000000";

        if (username.length === 1) return ("" + 1000000000000 + selectedDecimals)
        if (username.length === 2) return ("" + 240000000000 + selectedDecimals)
        if (username.length === 3) return ("" + 60000000000 + selectedDecimals)
        if (username.length === 4) return ("" + 6000000000 + selectedDecimals)
        if (username.length === 5) return ("" + 200000000 + selectedDecimals)
        if (username.length === 6) return ("" + 20000000 + selectedDecimals)
        if (username.length === 7) return ("" + 10000000 + selectedDecimals)
        if (username.length >= 8) return ("" + 1000000 + selectedDecimals)
    }

    const calculateUsername = humanReadableAmount(BigNumber.from(getCost("eth") ?? 0), 8, 18)
    const hummanCalculateEth = humanReadableAmount(BigNumber.from(calculateEth ?? 0), 8, 18)
    const hummanCalculateUsdt = humanReadableAmount(BigNumber.from(calcuteUsdt ?? 0), 2, 6)


    const wethAddress = async () => {
        const contract = new web3.eth.Contract((UNISWAP_ABI as unknown as any), UNISWAP_ADDRESS);
        const weths = await contract.methods.WETH().call()
        return setWeth(weths)
    }

    const calculateEther = async () => {
        const eth = weth ?? WETH_ADDRESS;
        const usernamePrice = getCost("eth") ? BigNumber.from(getCost("eth")) : 0;
        const contract = new web3.eth.Contract((UNISWAP_ABI as unknown as any), UNISWAP_ADDRESS);
        const price = await contract.methods.getAmountsOut(usernamePrice, [MAIN_CAW_ADDRESS, eth]).call()
        setCalculateEth(price[1])
        return price
    }

    const {address: account} = useAccount();

    const {data: isUsernameData} = useContractRead({
        address: USERNAME_ADDRESS,
        abi: USERNAME_ABI,
        functionName: 'checkUsernameAvailability',
        enabled: (username.length > 0),
        args: [username]
    })

    const {data: balance} = useBalance({
        addressOrName: account,
        token: CAW_ADDRESS
    })

    const isCawToken = (balance?.value as BigNumber).gte(getCost("eth") ?? 0);


    const calculateUsdt = async () => {
        const eth = USDT_ADDRESS;
        const contract = new web3.eth.Contract((UNISWAP_ABI as unknown as any), UNISWAP_ADDRESS);
        const price = await contract.methods.getAmountsOut(calculateEth, [WETH_ADDRESS, eth]).call()
        setCalculateUsdt(price[1])
        return price
    }


    useEffect(() => {
        if (username.length < 1) {
            setCalculateEth("0")
        } else {
            calculateEther()
        }
    }, [username])

    useEffect(() => {
        if (username.length < 1) {
            setCalculateUsdt("0")

        } else {
            calculateUsdt()
        }
    }, [calculateEth])

    useEffect(() => {
        wethAddress()
    }, [])



    if (scane === 1) {
        return (
            <Box>
                <Typography sx={TITLE}>
                    Enter your new NFT Username:
                </Typography>
                <Box>
                    <Box component={"input"} onChange={changeUsername} value={username} placeholder={"Enter username"}
                         sx={INPUT}/>
                </Box>
                {
                    username.length > 0 &&
                    (isUsernameData ?
                        <Alert sx={{mt: 2}} severity="success">@{username} available!</Alert>
                        :
                        <Alert sx={{mt: 2}} severity="error">@{username} taken!</Alert>)

                }

                <Grid sx={{my: "31px"}} container>
                    <Box sx={{width: "100%", fontFamily: "Karla", fontSize: "18px", fontWeight: "700",}}>
                        Cost;
                    </Box>
                    <Tokens col={12} price={hummanCalculateEth ?? ""} customSymbol={"ETH"}
                            img={"/assets/eth_token.png"} imgSize={"20px"}
                            setup={3}/>
                    <Tokens col={12} price={calculateUsername ?? "0"} customSymbol={"CAW (tCAW)"} imgSize={"20px"}
                            img={"/assets/img/logo.png"} setup={3}/>
                    <Tokens col={12} price={hummanCalculateUsdt ?? "0"} customSymbol={"USDT"} imgSize={"20px"}
                            img={"/assets/img/ust.png"} setup={3}/>
                </Grid>
                {
                    isCawToken ?
                        <Box component={"button"} disabled={!isUsernameData && true} onClick={() => setScane(2)}
                             sx={GO_BTN}>MINT</Box>
                        :
                        <Box component={"button"} disabled onClick={() => setScane(2)}
                             sx={GO_BTN}>MINT</Box>
                }
            </Box>
        );
    }

    return (
        <Setup4 transaction={transaction} loader={loader} username={username} usdt={hummanCalculateUsdt}
                caw={calculateUsername}
                eth={hummanCalculateEth} rawToken={getCost("eth")}/>
    )

};
