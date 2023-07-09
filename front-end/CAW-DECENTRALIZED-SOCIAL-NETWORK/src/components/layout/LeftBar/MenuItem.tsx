import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {activeWidth, current} from "../../../services/functions";

const ACTIVE = {
    position: "absolute",
    background: "#F9C336 !important",
    height: "45px",
    zIndex: "-1",
    marginLeft: "-10px",
    marginTop: '-9px',
    borderRadius: "100px"
}

const MENU_ICON = {
    fontSize: "24px",
    marginRight: "6px",
    width: "28px",
    height: "28px",
}

const ITEMS = {
    width: "auto",
    display: "block",
    background: "transparent",
    border: "none",
    cursor:"pointer",
    my:1
}

const MENU_ITEM = {
    fontSize: "19px",
    fontFamily: 'Karla !important',
    fontWeight: "500",
    color: "#F9C336",
    marginLeft: '10px',
    marginBottom: "18px"
}

export const MenuItem = ({
                             currentRoute,
                             plate,
                             image,
                             icon,
                             imageName,
                             name
                         }: { currentRoute: any,imageName?:string, plate: any, image: boolean, icon: string, name: string }) => {

    const route = current(currentRoute);
    const WIDTH = activeWidth(route);

    if (image) {
        return (
            <Box key={(Math.random() * 10000)} sx={ITEMS} component={'button'}>
                {route === imageName && <Box sx={{...ACTIVE,...WIDTH}}/>}
                <Box sx={{display: "flex"}}>
                    <img style={{marginLeft: "1px", width: "25px", height: "25px", marginRight: "10px"}}
                         src={icon}/>
                    <Typography sx={MENU_ITEM}>
                        <img style={{width: "90px"}} src={(route === imageName) ? "assets/img/caw_direct_text_selected.png" : name}/>
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box key={(Math.random() * 10000)} sx={ITEMS} component={'button'}>
            {route === name && <Box sx={{...ACTIVE,...WIDTH}}/>}
            <Box sx={{display: "flex", height: "auto"}}>
                <i style={route === name ? {...MENU_ICON, color: plate.menuItemColor} : {
                    ...MENU_ICON,
                    color: "#F9C336"
                }} className={icon}></i>
                <Typography sx={route === name ? {...MENU_ITEM, color: plate.menuItemColor} : {
                    ...MENU_ITEM,
                    color: "#F9C336",
                }}>{name?.charAt(0).toUpperCase() + name?.slice(1)}</Typography>
            </Box>
        </Box>
    );

};
