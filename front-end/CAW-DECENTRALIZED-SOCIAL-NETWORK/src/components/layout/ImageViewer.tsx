import {Avatar, Box, Button, Grid, IconButton, Modal} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {ButtonAnimation} from "./Post/Button";
import {IPOSTDATA} from "../../services/types";
import {custom_3, POST_DATA} from "../../config/customData";
import {Post} from "./Post";
import {LoadPost} from "./Loader/LoadPost";

const MAIN = {
    position: 'absolute' as 'absolute',
    top: '0',
    left: '0',
    width: "100%",
    height: "100vh",
    bgcolor: 'krmrPlate.mainBg',
    boxShadow: 24
};

const IMAGE_GRID = {
    position: "relative",
    display: "grid",
    alignItems: "center",
    height: "100vh"
}

const TOP_BAR = {}

const BOTTOM_BAR = {
    display: "flex",
    justifyContent: "center",
}


const ITEM_COUNT = {
    fontSize: "13px",
    fontWeight: "bold",
    color: "krmrPlate.iconButtonColor"
}

const ICON_BOX = {
    marginRight: 2
}

const BOX = {
    width: "100%",
    borderRadius: "20px",
    marginTop: "18px",
    position: "relative",
    px: "20px",
    py: "16px",
    backgroundColor: "krmrPlate.postContainer"
}

const INPUT = {
    width: "100%",
    height: "70px",
    border: "none",
    fontFamily: "Karla",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "krmrPlate.newCommentBox",
    maxWidth: "100%",
    "&:focus-visible": {
        "outline": "-webkit-focus-ring-color auto 0px"
    }
}

const ICON = {
    fontSize: "18px",
    color: "krmrPlate.mainTextColor"
}

const BUTTON = {
    background: "#F9C336",
    px: 4,
    display: "flex",
    alignItems: "center",
    borderRadius: "100px",
    fontFamily: "Karla",
    border: "none",
    color: "#14213D"
}


export const ImageViewer = ({
                                imageViewerOpen,
                                handleViewerClose,
                                data
                            }: { handleViewerClose: any, imageViewerOpen: any, data: IPOSTDATA }) => {


    const [commentData, setCommentData] = useState<any[]>()

    useEffect(() => {
        setTimeout(() => setCommentData(POST_DATA), 2000)
    }, [])

    return (
        <>
            <Modal
                open={imageViewerOpen}
                onClose={handleViewerClose}
            >
                <Box sx={MAIN}>
                    <Grid container>
                        <Grid sx={(theme) => (
                            {
                                ...IMAGE_GRID,
                                [theme.breakpoints.down('md')]: {
                                    height: "40vh"
                                },
                            }
                        )} item lg={9.5} md={9.5} sm={12} xs={12}>
                            <Box sx={TOP_BAR}>
                                <IconButton onClick={handleViewerClose} sx={{mt: 1, ml: 2, px: 1.3}}>
                                    <i className="fa-solid fa-xmark"></i>
                                </IconButton>
                            </Box>
                            <Box sx={(theme) => (
                                {
                                    width: "100%", height: "80vh",
                                    [theme.breakpoints.down('md')]: {
                                        height: "260px"
                                    },
                                }
                            )} component={"img"}
                                 src={data?.data}></Box>
                            <Box sx={BOTTOM_BAR}>
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
                        </Grid>
                        <Grid sx={{p: 1}} item lg={2.5} md={2.5} sm={12} xs={12}>
                            <Box sx={(theme) => (
                                {
                                    height: "100vh", overflow: "scroll",
                                    px: 2,
                                    pb: 2,
                                    [theme.breakpoints.down('md')]: {
                                        height: "60vh",
                                        p: 0.5,
                                    },
                                }
                            )}>
                                <Box sx={BOX}>
                                    <Box sx={INPUT} placeholder={"Comment"} component={"textarea"} />
                                    <Box sx={{width: "100%"}} display={"flex"} alignItems={"center"}>
                                        <Box sx={{mx: "auto", mt:0.6}}>
                                            <IconButton color="inherit">
                                                <Box component={"i"} sx={ICON} className="fa-solid fa-image"></Box>
                                            </IconButton>
                                        </Box>
                                        <Box sx={{...BUTTON,mx:"auto",mt:1}}  component={"button"}>
                                            <i style={{...ICON, fontSize: "16px"}} className="fa-solid fa-paper-plane"></i>
                                            <Typography sx={{
                                                fontSize: "18px",
                                                marginLeft: "10px",
                                                fontFamily: "Karla",
                                                fontWeight: "bold"
                                            }}>COMMENT</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                {commentData ?
                                    commentData.map((data: IPOSTDATA, count: number) => {
                                        return <Post key={count} data={data}/>
                                    }) :
                                    custom_3.map(() => <LoadPost/>)
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};
