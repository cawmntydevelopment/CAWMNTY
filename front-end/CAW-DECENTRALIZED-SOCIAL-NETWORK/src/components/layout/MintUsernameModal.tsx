import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Grid, Modal, Paper} from "@mui/material";
import {Setup1} from "./MintUsername/Setup1";
import {IMODALSETUP} from "../../services/types";
import {useAccount, useDisconnect} from "wagmi";
import {Setup2} from "./MintUsername/Setup2";
import {Setup3} from "./MintUsername/Setup3";
import Typography from "@mui/material/Typography";
import {Tokens} from "./MintUsername/Tokens/Tokens";
import {Setup4} from "./MintUsername/Setup4";
import {WalletBox} from "./MintUsername/Wallet/WalletBox";
import {Setup5} from "./MintUsername/Setup5";

const K_WIDTH = "360px";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: K_WIDTH,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: "15px",
    pb: 7,
};

const LOADER = {
    height: "12px",
    background: "#F9C336",
    position: "absolute",
    top: 0,
    left: 0
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

const BACK_BTN = {
    position: "absolute",
    left: "25px",
    background: "#BFBFBF",
    py: 1,
    px: 5,
    border: "none",
    borderRadius: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: 10
}


const DISCONNECT_BTN = {
    position: "absolute",
    left: "25px",
    background: "#DC5454",
    color: "white",
    py: 1,
    px: 5,
    border: "none",
    borderRadius: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: 10
}


const setupLevel: IMODALSETUP = {
    "90px": {
        level: 1,
        go: true,
        back: false,
        disconnect: true,
    },
    "180px": {
        level: 2,
        go: true,
        back: true,
    },
    "270px": {
        level: 3,
        go: false,
        back: true,
    },
    "360px": {
        level: 4,
        go: false,
        back: false,
        mint: false
    },
}


export const MintUsernameModal = ({handleModalClose} : {handleModalClose:any}) => {

    // WAGMI
    const {address: account} = useAccount();
    const {disconnect} = useDisconnect()

    const [load, setLoad] = useState<"90px" | "180px" | "270px" | "360px">("90px");
    const [transaction, setTransaction] = useState("")



    function loader(type?: "go" | "back" | "mint") {
        // Setup 1
        if (load === "90px" && type === "go") return setLoad("180px");
        if (load === "180px" && type === "back") return setLoad("90px");

        // Setup 2
        if (load === "180px" && type === "go") return setLoad("270px");
        if (load === "270px" && type === "back") return setLoad("180px");

        // Setup 3
        if (load === "270px" && type === "go") return setLoad("360px");
        if (load === "360px" && type === "back") return setLoad("270px");

        if (load === "360px" && type === "mint") return console.log("");

    }

    const setupOptions = setupLevel[load];

    const Scane = () => {
        const level = setupOptions.level;
        if (level === 1) {
            return <Setup1 account={account}/>
        }
        if (level === 2) {
            return <Setup2/>
        }
        if (level === 3) {
            return <Setup3 loader={loader} transaction={setTransaction}/>
        }

        if (level === 4) {
            return <Setup5 transaction={transaction}/>
        }
        return <></>
    }


    const RADIUS_LOADER = load === "360px" ? {
        ...LOADER,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px"
    } : {...LOADER, borderTopLeftRadius: "15px"};


    useEffect(() => {
        setLoad("90px")
    }, [open])

    useEffect(() => {
        if(!account) {
            handleModalClose()
        }
    },[account])


    return (

        <Paper sx={(theme:any) => ({
            ...style,
            backgroundColor:"krmrPlate.mainBg",
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        })}>
            <Box sx={(theme) => ({
                ...RADIUS_LOADER,
                width: load,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
            })}/>

            <Scane/>

            {account && setupOptions.disconnect &&
							<Box component={"button"} sx={DISCONNECT_BTN} onClick={() => disconnect()}>DISCONNECT</Box>}
            {account && setupOptions.back &&
							<Box component={"button"} sx={BACK_BTN} onClick={() => loader("back")}>BACK</Box>}
            {account && setupOptions.go &&
							<Box component={"button"} sx={GO_BTN} onClick={() => loader("go")}>NEXT</Box>}
            {account && setupOptions.mint &&
							<Box component={"button"} sx={GO_BTN} onClick={() => loader("mint")}>MINT</Box>}
        </Paper>

    );
};
