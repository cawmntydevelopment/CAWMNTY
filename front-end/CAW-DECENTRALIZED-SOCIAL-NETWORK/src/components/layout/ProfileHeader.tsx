import React, {useEffect, useState} from 'react';
import {Box, IconButton, Menu, MenuItem, Skeleton} from "@mui/material";
import {load} from "../../utils/storage";

const WALLPAPER = {
    width: "100%",
    height: "25vh",
    objectFit: "cover",
    borderRadius: "20px",
}

const BOX = {
    marginTop: "17px"
}

const IMAGE_GROUP = {
    position: "relative",
    width: "100%"
}

const PICTURE = {
    width: "110px",
    height: "110px",
    borderRadius: "110px",
    border: "5px solid #F9C336",
    position: "absolute",
    bottom: "-30px",
    left: "0",
    right: "0",
    marginRight: "auto",
    marginLeft: "auto",
    background:"white"
}

const PP_BOX = {
    display: "grid",
    justifyContent: "center"
}


const MORE_BUTTON = {
    position: "absolute",
    right: 15,
    top: 15,
    px: 1.2,
    background: "rgba(255,255,255,0.6)",
    "&:hover" : {
        background: "rgb(255,255,255)"
    }
}

export const ProfileHeader = ({decodeProfile,data}: { data: any, decodeProfile:any }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={BOX}>
            <Box sx={IMAGE_GROUP}>
                <Box>
                    {
                        data ?
                            <Box sx={{position: "relative"}}>
                                <Box sx={WALLPAPER} component={"img"}
                                     src={data.wallpaper_picture}/>
                                <IconButton aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick} sx={MORE_BUTTON}>
                                    <Box component={"i"} sx={{color: "black"}} className={"fa-solid fa-ellipsis"}/>
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>Block</MenuItem>
                                    <MenuItem onClick={handleClose}>Edit cover photo</MenuItem>
                                </Menu>
                            </Box>
                            :
                            <Skeleton sx={{height: "35vh"}}/>
                    }
                </Box>

                <Box sx={PP_BOX}>
                    {
                        data
                            ?
                            <Box sx={PICTURE} component={"img"} src={decodeProfile() ? decodeProfile()?.image.replaceAll("ipfs://","https://ipfs.io/ipfs/") :data.profil_picture}/>
                            :
                            <Skeleton sx={PICTURE} variant="circular"/>
                    }
                </Box>
            </Box>
        </Box>
    );
};
