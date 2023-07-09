import React, {useState} from 'react';
import {Avatar, Box, Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IPOSTDATA} from "../../services/types";
import {ButtonAnimation} from "./Post/Button";
import {ImageViewer} from "./ImageViewer";


const BOX = {
    width: "100%",
    borderRadius: "20px",
    marginTop: "18px",
    position: "relative",
    px: "20px",
    pt: "16px",
    backgroundColor: "krmrPlate.postContainer",
}

const MORE_CONTAINER = {
    position: "absolute",
    right: "21px",

    top: 15,
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
    fontSize: "18px",
    fontFamily: "Karla",
    fontWeight: "bold",
    color: "krmrPlate.mainTextColor",
    whiteSpace: "normal"
}

const ITEM_COUNT = {
    fontSize: "13px",
    fontWeight: "bold",
    color: "krmrPlate.iconButtonColor"
}

const ICON_BOX = {
    marginRight: 2
}

const AVATAR = {width: "45px", height: "45px"};

const IMAGE = {
    height: "auto",
    width: "100%",
    marginTop: "10px",
    borderRadius: "21px",
    cursor: "pointer"
}

const BUTTON_GROUPS = {marginLeft: "8.9%", overflow: "auto", whiteSpace: "nowrap"}

const HIDDEN_BUTTON = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
}

const MORE_BUTTON = {
    width: "40px"
}

const ACARDION = {
    position: "absolute",
    width: "145px",
    backgroundColor: "krmrPlate.acardionBg",
    right: "6px",
    top: 0,
    borderRadius: "7px",
}

const ACARDION_ITEM = {
    width: "100%",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #454f5b",
    borderColor: "rgba(169,169,169,0.47)",
    fontSize: "15px",
    cursor:"pointer",
    color:"krmrPlate.acardionnText"
}

export const Post = ({data, key}: { data: IPOSTDATA, key: number }) => {

    const [imageViewerOpen, setImageViewerOpen] = useState(false);

    const handleViewerOpen = () => setImageViewerOpen(true);
    const handleViewerClose = () => setImageViewerOpen(false);

    const [anchorEl, setAnchorEl] = useState<boolean>(false);

    const show = anchorEl === false ? {
        display: "none",
    } : {
        display: "block"
    }


    return (
        <Box sx={{position: "relative"}}>

            <Box onClick={() => setAnchorEl(false)} key={key ?? (Math.random() * 10000)} sx={{...BOX}}>


                <Box sx={CONTENT}>

                    <Box component={"img"} src={data.userImage} sx={{...AVATAR, borderRadius:"100px"}}/>
                    <Box sx={{display: "block"}}>
                        <Box sx={{marginLeft: "14px"}} display={"flex"}>
                            <Box sx={{...USERINFO, fontWeight: "bold", color: "krmrPlate.mainTextColor"}}
                                 component={"span"}>{data.username}</Box>
                            <Box sx={USERINFO} component={"span"}>&nbsp;·&nbsp;</Box>
                            <Box sx={USERINFO} component={"span"}>{data.date}</Box>
                        </Box>
                        <Box sx={{marginLeft: "14px", width: "100%", paddingRight: "30px"}}>
                            { data.description &&
                            <Typography sx={{
                                ...POST,
                            }}>{(data.description).replaceAll("caw", "CAW")}</Typography>
                            }
                            {
                                data.image ?
                                    <Box
                                        onClick={() => handleViewerOpen()}
                                        component="img"
                                        sx={IMAGE}
                                        draggable="false"
                                        alt="The house from the offer."
                                        src={data.data}
                                    />
                                    :
                                    data.video ?
                                        <video style={IMAGE} controls>
                                            <source src={data.data} type="video/mp4"/>
                                        </video>
                                        :
                                        <Typography sx={{
                                            ...POST,
                                        }}>{(data.data).replaceAll("caw", "CAW")}</Typography>
                            }
                        </Box>
                    </Box>
                </Box>
                <Box sx={BUTTON_GROUPS}>
                    <Box display={"flex"} sx={{marginBottom: "15px", marginTop: "10px"}}>
                        <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                            <ButtonAnimation icon={"fa-solid fa-comment"}/>
                            <Typography sx={ITEM_COUNT}>{data.comment}</Typography>
                        </Box>
                        <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                            <ButtonAnimation icon={"fa-solid fa-retweet"}/>
                            <Typography sx={ITEM_COUNT}>{data.cawet}</Typography>
                        </Box>
                        <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                            <ButtonAnimation icon={"fa-solid fa-heart"}/>
                            <Typography sx={ITEM_COUNT}>{data.like}</Typography>
                        </Box>
                        <Box sx={ICON_BOX} display={"flex"} alignItems={"center"}>
                            <ButtonAnimation icon={"fa-solid fa-arrow-up-from-bracket"}/>
                            <Typography sx={ITEM_COUNT}>{data.share}</Typography>
                        </Box>
                    </Box>
                </Box>
                <ImageViewer data={data} imageViewerOpen={imageViewerOpen} handleViewerClose={handleViewerClose}/>
            </Box>
            <Box sx={MORE_CONTAINER}>
                <Box component={"button"} onClick={() => setAnchorEl(true)} sx={HIDDEN_BUTTON}

                >
                    <Box sx={MORE_BUTTON} onClick={() => setAnchorEl(true)} component={"img"}
                         src={"/assets/img/more.svg"}/>
                </Box>
                <Box sx={show}>
                    <Box sx={
                        ACARDION
                    }>
                        <Box sx={ACARDION_ITEM}> Report Post</Box>
                        <Box sx={{...ACARDION_ITEM, borderRadius: "7px"}}> Transactions</Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
