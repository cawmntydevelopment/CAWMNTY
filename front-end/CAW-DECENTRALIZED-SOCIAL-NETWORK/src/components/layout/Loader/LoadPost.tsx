import React, {useState} from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IPOSTDATA} from "../../../services/types";
import Viewer from 'react-viewer';

const BOX = {
    width: "100%",
    background: "#F8F8F8",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.11)",
    borderRadius: "20px",
    marginTop: "18px",
    position: "relative",
    px: "20px",
    pt: "16px",
    backgroundColor: "krmrPlate.postContainer"
}

const MORE_CONTAINER = {
    position: "absolute",
    right: "21px",
}

const CONTENT = {
    display: "flex"
}

const USERINFO = {
    fontFamily: "Karla",
    fontSize: "15px",
    color: "#727272"
}

const POST = {
    fontSize: "27px",
    fontFamily: "Karla",
    fontWeight: "bold",
    color: "krmrPlate.mainTextColor",
    whiteSpace: "normal"
}

const ITEM_COUNT = {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#727272"
}

const ICON = {
    fontSize: "20px",
    color: "#727272"
}

const ICON_BOX = {
    marginRight: 2
}

const AVATAR = {width: "45px", height: "45px"};


const BUTTON_GROUPS = {marginLeft: "6%", overflow: "auto", whiteSpace: "nowrap"}

const HIDDEN_BUTTON = {
    border: "none",
    background: "transparent",
    cursor: "pointer"
}

export const LoadPost = () => {

    return (
        <Box key={(Math.random() * 10000)} sx={{...BOX}}>
            <Box sx={MORE_CONTAINER}>
                <Skeleton>
                    <button style={HIDDEN_BUTTON}>
                        <Box component={"img"} src={"/assets/img/more.svg"}/>
                    </button>
                </Skeleton>
            </Box>

            <Box sx={CONTENT}>
                <Skeleton sx={AVATAR} variant="circular"/>
                <Box sx={{display: "block"}}>
                    <Box sx={{marginLeft: "14px"}} display={"flex"}>
                        <Skeleton>
                            <Box sx={{...USERINFO, fontWeight: "bold", color: "krmrPlate.mainTextColor"}}
                                 component={"span"}>sdfsdfdsfds</Box>
                        </Skeleton>

                        <Box sx={USERINFO} component={"span"}>&nbsp;&nbsp;</Box>

                        <Skeleton>
                            <Box sx={USERINFO} component={"span"}>444.444.444</Box>
                        </Skeleton>
                    </Box>
                    <Box sx={{marginLeft: "14px", width: "100%", paddingRight: "30px"}}>
                        <Skeleton>
                            <Typography sx={{
                                ...POST,
                            }}>Hello World</Typography>
                        </Skeleton>
                    </Box>
                </Box>
            </Box>
            <Box sx={BUTTON_GROUPS}>
                <Box display={"flex"} sx={{marginBottom: "15px", marginTop: "10px"}}>

                    <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                        <Skeleton>
                            <IconButton color="inherit">
                                <i style={ICON} className="fa-solid fa-comment"></i>
                            </IconButton>
                            <Typography sx={ITEM_COUNT}>345</Typography>
                        </Skeleton>
                    </Box>


                    <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                        <Skeleton>
                            <IconButton color="inherit">
                                <i style={ICON} className="fa-solid fa-retweet"></i>
                            </IconButton>
                            <Typography sx={ITEM_COUNT}>534534</Typography>

                        </Skeleton>
                    </Box>

                    <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                        <Skeleton>
                            <IconButton color="inherit">
                                <i style={ICON} className="fa-solid fa-heart"></i>
                            </IconButton>
                            <Typography sx={ITEM_COUNT}>34534534</Typography>
                        </Skeleton>
                    </Box>


                    <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                        <Skeleton>
                            <IconButton color="inherit">
                                <i style={ICON} className="fa-solid fa-arrow-up-from-bracket"></i>
                            </IconButton>
                            <Typography sx={ITEM_COUNT}>34534534</Typography>
                        </Skeleton>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};
