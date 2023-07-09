import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const BUTTON = {
    width: "100%",
    height: "55px",
    borderRadius: "7px",
    border: "none",
    textAlign: "start",
    px: "19px",
    cursor: "pointer",
    marginBottom: "10px",
    marginTop: "10px",
}

const ICON = {
    marginRight: "25px",
    fontSize: "22px",
}

const TITLE = {
    fontFamily: "Karla",
    fontSize: "20px",
    fontWeight: "700",
}


export const SettingButton = ({
                                  icon,
                                  name,
                                  title,
                                  active,
                                  setActive
                              }: { icon: string, name: string, title: string, active: string, setActive: any }) => {

    const activeBackground = name === active ? {...BUTTON, background: "#F9C336"} : {
        ...BUTTON,
        backgroundColor: "krmrPlate.settingButtonBg"
    };
    const themeTextColor = name === active ? {...TITLE, color: "#14213D"} : {
        ...TITLE,
        color: "krmrPlate.mainTextColor"
    };
    const themeIconColor = name === active ? {...ICON, color: "#14213D"} : {...ICON, color: "krmrPlate.mainTextColor"};
    const iconSize = name === "settings-2" ? {
        ...themeIconColor,
        marginRight: "15px"
    } : name === "settings-6" || name === "settings-5" ? {
        ...themeIconColor,
        marginRight: "18px"
    } : name === "settings-3" || name === "settings-7" ? {
        ...themeIconColor,
        marginRight: "20px"
    } : name === "settings-1" ? {...themeIconColor, marginRight: "22px"} : themeIconColor

    return (
        <Box display={"flex"} onClick={() => setActive(name)} alignItems={"center"} component={"button"}
             sx={activeBackground}>
            <Box sx={iconSize} component={"i"} className={icon}></Box>
            <Typography sx={themeTextColor}>{title}</Typography>
        </Box>
    );
};
