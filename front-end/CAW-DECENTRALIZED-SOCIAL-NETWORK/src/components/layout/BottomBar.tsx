import React, {useEffect, useState} from 'react';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {load} from "../../utils/storage";

const ICON = {
    marginBottom: "12px",
    marginTop: "12px",
}

const NAVIGATION = {
    width: "100%",
    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
    position: "fixed !important",
    zIndex: "5 !important",
    bottom: 0
}

export const BottomBar = ({
                              bottomMenuValue,
                              bottomChange,
                              theme
                          }: { bottomMenuValue: any, bottomChange: any, theme: any }) => {


    const plate = theme.palette.krmrPlate;
    const [profileHash, setProfileHash] = useState("");

    const colors = (color: string) => {
        if (bottomMenuValue === color) {
            return {color: {color: plate.bottomMenuItem}}
        } else {
            return {color: plate.bottomItemColor}
        }
    }

    const decodeProfile = () => {
        if (profileHash?.length > 0) {
            return JSON.parse(atob(profileHash))
        }
    }

    useEffect(() => {
        setInterval(() => {
            if (profileHash !== load("access_token")) {
                setProfileHash(load("access_token"))
            }
        }, 900)
    }, [])


    return (
        <BottomNavigation sx={{
            ...NAVIGATION, background: plate.mainBg, ".Mui-selected": {
                color: "black !important",
            }
        }} value={bottomMenuValue} onChange={bottomChange}>


            <BottomNavigationAction
                value="nearby"
                icon={
                    <Link to="/">
                        <Box component={"i"} sx={{...ICON, fontSize: "25px", ...colors("nearby")}}
                             className={"fa-solid fa-house"}/>
                    </Link>}
            />

            <BottomNavigationAction
                value="favorites"
                icon={
                    <Link to="/explore">
                        <Box component={"i"} sx={{...ICON, fontSize: "25px", ...colors("favorites")}}
                             className={"fa-solid fa-magnifying-glass"}/>
                    </Link>
                }
            />


            <BottomNavigationAction
                value="/notifications"
                icon={
                    <Link to="/notifications">
                        <Box component={"i"}
                             sx={{...ICON, fontSize: "28px", ...colors("/notifications")}}
                             className={"fa-solid fa-bell"}/>
                    </Link>
                }
            />

            <BottomNavigationAction value="example"
                                    icon={
                                        <Link to="/profile">
                                            <Box sx={{width: "30px", borderRadius: "100px"}} component={"img"}
                                                 src={decodeProfile() ? decodeProfile()?.image?.replaceAll("ipfs://","https://ipfs.io/ipfs/") : "/assets/img/pp.jpg"}/>
                                        </Link>
                                    }/>
        </BottomNavigation>
    );
};
