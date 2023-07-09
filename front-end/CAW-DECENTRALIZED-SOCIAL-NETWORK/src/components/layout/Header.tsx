import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    Grid,
    IconButton,
    Toolbar, Tooltip,
    Typography,
} from "@mui/material";
import {DrawerBar} from "./Drawer";
import {SearchInput} from "../SearchInput";
import {Link} from "react-router-dom";
import WalletButton from "../../services/web3/components/controllers/Wallet/WalletButton";
import {useAccount} from "wagmi";
import {WalletBalances} from "./Header/WalletBalances";
import {DialogProps} from "@mui/material/Dialog";
import {Calculator} from "./Calculator";
import {humanNotZeroUsd, toFixed} from "../../services/functions";
import axios from 'axios';
import {load} from "../../utils/storage";


const COIN_PRICE = {
    marginLeft: "7px",
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: 'Karla !important',
}

const TOKEN = {
    display: "flex",
    alignItems: "center",
    p: 1,
    background: "rgba(217, 217, 217, 0.34)",
    pr: 2,
    borderRadius: "5px"
}

const TOKEN_ICON = {
    width: "35px",
}

const TOKEN_BOX = {
    display: "flex",
    alignItems: "center",
}

const BUTTON_GROUP = {
    display: "flex",
    justifyContent: "end"
}

const APP_BAR = {
    backgroundColor: "krmrPlate.mainBg",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.12)",
    animation: "fadeInRightBig",
    animationDuration: "0.5s",
}

const TOOLBAR = {
    position: "fixed",
    left: "0px",
    right: "0px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    backgroundColor: "krmrPlate.mainBg",
    zIndex: 5,
}

export function Header({colorMode, theme, handleModalOpen}: { colorMode: any, theme: any, handleModalOpen: any }) {

    const {address: account} = useAccount();

    const plate = theme.palette.krmrPlate;
    const mainTextColor = plate.mainTextColor;
    const [state, setState] = useState({
        left: false
    });
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [prices, setPrices] = useState<any[]>();


    // @ts-ignore
    const cawUsdt = (prices?.["a-hunters-dream"].usd as unknown as number);

    const cawUsd = humanNotZeroUsd((cawUsdt ?? "0"))


    const toggleDrawer = (anchor: any, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({...state, [anchor]: open});
        };

    const cawUsdtData = async () => {
        return await axios
            .get("https://api.coingecko.com/api/v3/simple/price?ids=a-hunters-dream,ethereum&vs_currencies=usd")
            .then(function (response) {
                setPrices(response?.data)
            });
    }


    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);


    useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    useEffect(() => {
        cawUsdtData()
    },[])


    return (
        <Box
            position="relative"
            sx={(theme) => ({
                ...APP_BAR,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
            })}
        >
            <Toolbar sx={(theme) => ({
                ...TOOLBAR,
                [theme.breakpoints.down('md')]: {
                    width: "100%"
                }
            })}>
                <Grid container spacing={0}>
                    <Grid item xs={4}>

                        <Box sx={(theme) => ({...TOKEN_BOX, [theme.breakpoints.down('md')]: {display: "none"}})}>
                            <Tooltip title={toFixed(cawUsdt) + "$"}>
                                <Box sx={{...TOKEN, marginRight: "30px"}}>
                                    {/*<img style={{width: "30px"}} src={"/assets/logo.png"}/>*/}
                                    <Typography variant="h6" sx={{...COIN_PRICE, color: mainTextColor}} noWrap>
                                        CAW :
                                        {" " + (cawUsd?.[0] + ".0")}
                                        <span style={{fontSize: "10px"}}>{cawUsd?.[1]}</span>
                                        {(cawUsd?.[2])?.toString()?.substring(0, 5)}$
                                    </Typography>
                                </Box>
                            </Tooltip>
                            <Box sx={TOKEN}>
                                {/*<img style={{width: "30px"}} src={"/assets/eth_token.png"}/>*/}
                                <Typography variant="h6" sx={{...COIN_PRICE, color: mainTextColor}} noWrap>
                                    ETH :
                                    {
                                        " " + (prices as unknown as any)?.["ethereum"]?.usd
                                    }$
                                </Typography>
                            </Box>
                        </Box>


                        <Box sx={(theme) => ({
                            display: "none",
                            [theme.breakpoints.down('md')]: {display: "flex", justifyContent: "start"}
                        })}>
                            <IconButton onClick={toggleDrawer("left", true)} sx={{ml: 1}} color="inherit">
                                <i style={{color: mainTextColor}} className="fa-solid fa-bars"></i>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item justifyContent={"center"} xs={4}>

                        <SearchInput plate={plate} location={"header"}/>

                        <Box sx={(theme) => ({
                            display: "none",
                            [theme.breakpoints.down('md')]: {display: "flex", justifyContent: "center"}
                        })}>
                            <Box component={"img"} sx={{width: "40px"}} src={"/assets/img/logo.png"}/>
                        </Box>

                    </Grid>
                    <Grid item sx={BUTTON_GROUP} xs={4}>
                        <Box sx={(theme) => ({[theme.breakpoints.down('md')]: {display: "none"}})}>
                            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ?
                                    <i style={{color: mainTextColor}} className="fa-solid fa-sun"></i> :
                                    <i style={{color: mainTextColor}} className="fa-solid fa-moon"></i>
                                }
                            </IconButton>
                            <IconButton onClick={handleClickOpen('paper')} sx={{ml: 1}} color="inherit">
                                <i style={{color: mainTextColor}} className="fa-solid fa-calculator"></i>
                            </IconButton>
                            {
                                account ?
                                    <IconButton onClick={() => handleOpen()} sx={{ml: 1}} color="inherit">
                                        <i style={{color: mainTextColor}} className="fa-solid fa-wallet"></i>
                                    </IconButton>
                                    :
                                    <WalletButton CustomButton={(props: any) =>
                                        <IconButton {...props} sx={{ml: 1}} color="inherit">
                                            <i style={{color: mainTextColor}} className="fa-solid fa-wallet"></i>
                                        </IconButton>
                                    }/>
                            }
                        </Box>

                        <Box sx={(theme) => ({
                            display: "none",
                            [theme.breakpoints.down('md')]: {display: "flex", justifyContent: "center"}
                        })}>
                            <Link to="/caw-direct">
                                <img style={{marginTop: "7px", width: "30px", height: "30px"}}
                                     src={"/assets/img/caw-direct-light.png"}/>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
            <DrawerBar handleClickOpen={handleClickOpen} handleModalOpen={handleModalOpen} handleOpen={handleOpen}
                       state={state}
                       colorChange={colorMode.toggleColorMode} theme={theme}
                       toggleDrawer={toggleDrawer}/>
            <WalletBalances open={modalOpen} handleClose={handleClose}/>
            <Calculator handleClose={handleClickClose} open={open} scroll={scroll}
                        descriptionElementRef={descriptionElementRef}/>
        </Box>
    )
}
