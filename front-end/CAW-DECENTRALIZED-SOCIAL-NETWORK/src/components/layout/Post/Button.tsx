import React, {useEffect, useState} from 'react';
import {Box, IconButton} from "@mui/material";
import {animate} from "../../../services/animation";

const ICON = {
    fontSize: "18px",
    color: "krmrPlate.iconButtonColor"
}

export const ButtonAnimation = ({icon} : {icon:string}) => {

    const [iconStyle, setIconStyle] = useState<any>(ICON)

    const click = () => {
        setIconStyle(animate(ICON, "CLICK_ANIMATION_1"))
        setTimeout(() => setIconStyle(ICON),2000)
    };

    useEffect(() => {
        // LIKE CLICK FUNCTION
    },[iconStyle])

    return (
        <IconButton onClick={click} color="inherit">
            <Box component={"i"} sx={iconStyle} className={icon}></Box>
        </IconButton>
    );
};


