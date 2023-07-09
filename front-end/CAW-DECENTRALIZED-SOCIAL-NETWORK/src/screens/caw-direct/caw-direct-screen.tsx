import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {isActiveChat} from "../../services/functions";
import {CawDirect} from "../../components/layout/CawDirect";
import {BestChatUser} from "../../components/layout/CawDirect/BestChatUser";
import {MessageHeader} from "../../components/layout/CawDirect/MessageHeader";
import {ChatRoom} from "../../components/layout/CawDirect/ChatRoom";
import {CAW} from "../../components/layout/caw";

const NOACTIVE_BOX = {
    height: "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems:"center"
}

const NOACTIVE_IMG = {
    maxWidth:"400px",
    width: "100%"
}

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s"
}

export const CawDirectScreen = () => {

    const [active, setActive] = useState("");
    const [hiddenChats, setHiddenChats] = useState("block");
    const [hiddenMessages, setHiddenMessages] = useState("none");

    const isActive = isActiveChat(active);

    const ActivePage = () => {

        if (isActive === "active") {
            return <ChatRoom setActive={setActive} id={active}/>
        }
        return (
            <Box sx={NOACTIVE_BOX}>
                <Box sx={NOACTIVE_IMG} component={"img"} src={"/assets/img/caw-direct-full-size.png"} />
            </Box>
        )
    }


    useEffect(() => {
        if (isActive === "active") {
            setHiddenChats("none");
        } else {
            setHiddenChats("block")
        }
    }, [isActive])

    useEffect(() => {
        if (isActive === "active") {
            setHiddenMessages("block");
        } else {
            setHiddenMessages("none")
        }
    }, [hiddenChats])


    return (
        <Box sx={MAIN}>
            <CAW/>
            <Grid container spacing={0}>
                <Grid sx={(theme) => (
                    {
                        pb: "75px",
                        pl: "25px",
                        pr: "25px",
                        pt: "75px",
                        height: "100vh",
                        overflow: "auto",
                        position: "relative",
                        [theme.breakpoints.down('md')]: {
                            display: hiddenChats,
                        },
                    }
                )} item lg={6} md={6} sm={12} xs={12}>
                    <MessageHeader/>
                    <BestChatUser setActive={setActive}/>
                    <CawDirect  setActive={setActive}/>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={(theme) => (
                    {
                        borderLeft: "1px solid #00000014",
                        pt: "75px",
                        pb: "75px",
                        height: "100vh",
                        backgroundColor: "krmrPlate.cawDirectBg",
                        position:"relative",
                        [theme.breakpoints.down('md')]: {
                            display: hiddenMessages,
                        },
                    }
                )}>
                    <ActivePage/>
                </Grid>

            </Grid>

        </Box>)
};
