import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Grid, Box, Modal} from "@mui/material";
import {NewPost} from "../../components/layout/NewPost";
import {RightBar} from "../../components/layout/RightBar";
import {Post} from "../../components/layout/Post";
import {IPOSTDATA} from "../../services/types";
import {custom_3, POST_DATA} from "../../config/customData";
import {LoadPost} from "../../components/layout/Loader/LoadPost";
import {CAW} from "../../components/layout/caw";
import {Calculator} from "../../components/layout/Calculator";

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s"
}
const NEW_POST_BUTTON = {
    position: "fixed",
    bottom: "0",
    right: "0",
    marginRight: "25px",
    marginBottom: "80px",
    width: "54px",
    height: "54px",
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "krmrPlate.newPostButton",
    border: "3px solid #000",
    borderColor:"krmrPlate.newPostBorder",
    color: "krmrPlate.newPostBorder",
    zIndex:4
}

const MODAL = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 395,
    p: 1,
    borderRadius: "14px",
    background: "krmrPlate.newPostContainer",
};



export const HomeScreen = observer(({trendData,accountData}:{trendData:any,accountData?:any}) => {


    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any[]>()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        setTimeout(() => setData(POST_DATA),2000)
    },[])

    return (
        <Box sx={MAIN}>

            <CAW/>
            <Grid container spacing={0}>
                <Grid sx={{p: 2.5, pt: "75px", marginBottom: "85px"}} item lg={8} md={8} sm={12} xs={12}>
                    <Box sx={(theme) => (
                        {
                            [theme.breakpoints.down('md')]: {
                                display: "none",
                            },
                        }
                    )}>
                        <Calculator/>
                        <NewPost/>

                    </Box>

                    { data ?
                        data.map((data: IPOSTDATA, count: number) => {
                        return <Post key={count} data={data}/>
                    }) :
                        custom_3.map(() =>  <LoadPost/>)
                    }

                    <Box
                        sx={(theme) => (
                            {
                                ...NEW_POST_BUTTON,
                                [theme.breakpoints.up('md')]: {
                                    display: "none",
                                },
                            }
                        )}
                        onClick={handleOpen}
                    >
                        +
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={(theme) => (
                    {
                        pt: "75px",
                        [theme.breakpoints.down('md')]: {
                            display: "none",
                        },
                    }
                )}>
                    <RightBar trendData={trendData} accountData={accountData}/>
                </Grid>

            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={MODAL}>
                    <NewPost notImage={true}/>
                </Box>
            </Modal>
        </Box>
    )
});
