import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";

export const CAW = () => {

    const [hidden, setHidden] = useState<"none"|"block">("block");

    const timeOutHidden = () => {
        setTimeout(() => setHidden("none"),1800)
    }

    useEffect(() => {
        timeOutHidden()
    },[])

    return (
        <Box
            sx={(theme) => (
                {
                    width: "67px",
                    position: "absolute",
                    left: 0,
                    zIndex:4,
                    right: 0,
                    ml: "auto",
                    mr: "auto",
                    display:hidden
                }
            )}
            component={"img"} src={"/assets/img/caw_one.png"}/>
    )
}
